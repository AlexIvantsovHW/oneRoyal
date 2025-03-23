import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  balance: number;
  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  currency: string;

  @Column({ nullable: false })
  date: string;
}
