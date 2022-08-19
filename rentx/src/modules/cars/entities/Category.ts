import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  public id?: string;

  @Column("timestamp")
  public created_at: Date;

  @Column("varchar")
  public description: string;

  @Column("varchar")
  public name: string;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { Category };
