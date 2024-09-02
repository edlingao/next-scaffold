import db from "@/db";
import { Model } from "./model";
import { login } from "./auth";
import bcrypt from "bcrypt";

export interface UserFields {
  id: number;
  username: string;
  password: string;
}

class User implements UserFields {
  id: number = 0;
  username: string = "";
  password: string = "";

  logOut() {
    throw new Error("Method not implemented.");
  }
}

class UserModel implements Model<User> {
  getAll(): User[] {
    const result = db.prepare("SELECT * FROM users").all(null) as User[];

    if (!result) {
      throw new Error("No users found");
    }

    return result;
  }

  getById(id: number): User {
    const query = db.prepare("SELECT * FROM users WHERE id = ?");
    const result = query.get(id) as User;

    if (!result) {
      throw new Error(`User with id ${id} not found`);
    }

    return result;
  }

  create(data: User): User {
    const createObj = {
      username: data.username,
      password: data.password,
    };

    const result = db
      .prepare(
        `
      INSERT INTO users (username, password)
      VALUES ($username, $password)
      RETURNING *
    `,
      )
      .get(createObj) as User;

    if (!result) {
      throw new Error("Failed to create user");
    }

    return result;
  }

  update(id: number, data: User): User {
    const user = this.getById(id);
    const updateObj = {
      id: id,
      username: data.username || user.username,
      password: data.password || user.password,
    };

    const result = db
      .prepare(
        `
      UPDATE users
      SET username = $username, password = $password
      WHERE id = $id
      RETURNING *
    `,
      )
      .get(updateObj) as User;

    if (!result) {
      throw new Error("Failed to update user");
    }

    return result;
  }

  delete(id: number): number {
    const query = db.prepare<number>("DELETE FROM user WHERE id = ?");
    const result = query.get(id) as User;

    if (!result) {
      throw new Error("Failed to delete user");
    }

    return result.id;
  }

  getByUsername(username: string): User {
    const query = db.prepare<string>(
      "SELECT * FROM users WHERE username = ?",
    );
    const result = query.get(username) as User;

    if (!result) {
      throw new Error(`User with username ${username} not found`);
    }

    return result;
  }

  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async register(data: { username: string; password: string }): Promise<User> {
    const hash = await this.encryptPassword(data.password);
    const newUser = this.create({ ...data, password: hash } as User);

    this.login({ username: data.username, password: data.password });
    return newUser;
  }

  async login(data: { username: string; password: string }): Promise<User> {
    const user = this.getByUsername(data.username);

    if (!user) {
      throw new Error("User not found");
    }

    const verified = await this.verifyPassword(data.password, user.password);

    if (!verified) {
      throw new Error("User not found");
    }

    login(user.id.toString());

    return user;
  }
}

export default new UserModel();
