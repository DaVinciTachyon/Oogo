import seq from "sequelize";
import { sequelize } from "../configurations/database.js";
const { DataTypes, Model } = seq;

interface MinderAttributes {
    userId: number;
    experience: number;
    qualifications: string;
    rate: number;
    transport: boolean;
    inHome: boolean;
    description: string;

    createdAt: Date;
    updatedAt: Date;
}

export type MinderInput = Required<MinderAttributes>;
export type MinderOutput = Required<MinderAttributes>;

class Minder extends Model<MinderAttributes, MinderInput> implements MinderAttributes {
  public userId!: number;
  public experience!: number;
  public qualifications!: string;
  public rate!: number;
  public transport!: boolean;
  public inHome!: boolean;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Minder.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    experience: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    qualifications: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rate: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    transport: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    inHome: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    description: {
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
  { sequelize, tableName: "Minders", freezeTableName: true, timestamps: true }
);

export default Minder;
