import * as i from "../imports";

export const loginUserController = async (
  pool: i.Pool,
  req: i.Request,
  res: i.Response
) => {
  const { email, password } = req.body;
  if (!i.emailValidator(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  } else if (!i.passwordValidator(password)) {
    return res.status(400).json({
      message:
        "Invalid password format (min. length 6, special symbols, a-zA-Z0-9)",
    });
  }

  console.log("---------login user start request---------");

  try {
    // User checking in DB
    const userQuery = await pool.query(
      `SELECT id, email, password FROM users WHERE email=$1`,
      [email]
    );

    if (userQuery.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userQuery.rows[0];

    // Password checking
    const isPasswordValid = await i.bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //  JWT generation

    const token = i.jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "default_secret", // Используйте переменную окружения для секретного ключа
      { expiresIn: "1h" }
    );

    console.log("---------login user end request---------");
    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }
};
