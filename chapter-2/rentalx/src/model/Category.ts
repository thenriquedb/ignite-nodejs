import { v4 as uuidV4 } from "uuid";

class Category {
  public created_at: Date;
  public description: string;
  public id?: string;
  public name: string;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { Category };
