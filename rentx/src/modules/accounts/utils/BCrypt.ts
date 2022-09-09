import { compare, hash } from "bcryptjs";

class BCrypt {
  static async compare(plain: string, hashed: string) {
    return compare(plain, hashed);
  }

  static async hash(s: string, salt: string | number) {
    return hash(s, salt);
  }
}

export { BCrypt };
