import { UserRole } from "../models/UserRole.js";
import seq, { Optional } from "sequelize";
import { sequelize } from "../configurations/database.js";
import { UserStatus } from "../models/UserStatus.js";
const { DataTypes, Model } = seq;

interface UserAttributes {
  id: number;

  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;

  createdAt: Date;
  updatedAt: Date;
}

export type UserInput = Optional<
  UserAttributes,
  | "id"
  | "age"
  | "createdAt"
  | "updatedAt"
>;
export type UserOutput = Required<UserAttributes>;

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public readonly id!: number;

  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public age!: number;
  public password!: string;
  public role!: UserRole;
  public status!: UserStatus;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, tableName: "Users", freezeTableName: true, timestamps: true }
);

export default User;
