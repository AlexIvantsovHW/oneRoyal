import * as i from "../imports";

export const createUserController = async (
  pool: i.Pool,
  req: i.Request,
  res: i.Response
) => {
  const { email, password, username } = req.body;

  if (!i.emailValidator(email)) {
    return res
      .status(404)
      .json({ message: "email is empty or it includes wrong format" });
  } else if (!i.passwordValidator(password)) {
    return res.status(404).json({
      message:
        "password is empty or it includes wrong format (min. lenght 6 simbols, special symbols,a-zA-Z0-9 letters)",
    });
  } else if (!i.usernameValidator(username)) {
    return res.status(404).json({
      message:
        " Username is empty or it includes wrong format (min. lenght 3 symbols) ",
    });
  }
  console.log("---------create a new user start request---------");

  try {
    // check existing username
    const userQuery = await pool.query(`
    SELECT username FROM users WHERE username='${username}'
    `);
    if (userQuery.rowCount! > 0) {
      return res.status(200).send({
        message: `${username} is already exist! please choose another one name!`,
      });
    }
    // check existing email
    const emailQuery = await pool.query(`
      SELECT email FROM users WHERE email='${email}'
      `);
    if (emailQuery.rowCount! > 0) {
      return res.status(200).send({
        message: `${email} is already exist! please choose another one name!`,
      });
    }

    // password bcrypts
    const passwordQuery = await pool.query(`SELECT password FROM users`);
    const passwords = passwordQuery.rows.map((row) => row.password);

    for (const existingPassword of passwords) {
      const isMatch = await i.bcrypt.compare(password, existingPassword);
      if (isMatch) {
        return res.status(409).send({
          message: " Please choose a different password.",
        });
      }
    }
    const saltRounds = 10;
    const hashedPassword = await i.bcrypt.hash(password, saltRounds);
    await pool.query("BEGIN");
    const createUserQuery = await pool.query(
      `INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING id`,
      [email, hashedPassword, username]
    );
    const result = createUserQuery.rows[0];

    if (!result) {
      console.log("User creation failed.");
      return res.status(500).json({
        message: "User was not created correctly. Please try again.",
      });
    }
    await pool.query("COMMIT");
    console.log("---------create a new user  end request---------");
    return res.status(201).json({
      status: 201,
      message: `User with name ${username} is created successfully!`,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    if (error instanceof Error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
