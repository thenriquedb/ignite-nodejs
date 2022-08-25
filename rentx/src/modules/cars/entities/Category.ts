import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("categories")
class Category {
  @PrimaryColumn()
  public id?: string;

  @CreateDateColumn()
  public created_at: Date;

  @Column()
  public description: string;

  @Column()
  public name: string;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { Category };
