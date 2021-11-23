import { FileType } from "../models/FileType.js";
import seq from "sequelize";
import { sequelize } from "../configurations/database.js";
const { DataTypes, Model } = seq;

interface FileAttributes {
    userId: number;
    type: FileType;
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;

    createdAt: Date;
    updatedAt: Date;
}

export type FileInput = Required<FileAttributes>;
export type FileOutput = Required<FileAttributes>;

class File extends Model<FileAttributes, FileInput> implements FileAttributes {
  public userId!: number;
  public type!: FileType;
  public fieldname!: string;
  public originalname!: string;
  public encoding!: string;
  public mimetype!: string;
  public destination!: string;
  public filename!: string;
  public path!: string;
  public size!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

File.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fieldname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    originalname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    encoding: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mimetype: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
  { sequelize, tableName: "Files", freezeTableName: true, timestamps: true }
);

export default File;
