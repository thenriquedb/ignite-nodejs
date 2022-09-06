import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity()
class User {
  @PrimaryColumn()
  public id?: string;

  @CreateDateColumn()
  public created_at: Date;

  @Column()
  public driver_license: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public is_admin: boolean;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column({ unique: true })
  public username: string;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { User };