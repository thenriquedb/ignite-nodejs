import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { ISpecification } from "@modules/cars/entities/ISpecification";

@Entity("specifications")
class Specification implements ISpecification {
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

export { Specification };
