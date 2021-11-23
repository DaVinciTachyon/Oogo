import seq from "sequelize";
import { sequelize } from "../configurations/database.js";
const { DataTypes, Model } = seq;

interface PaymentAttributes {
    userId: number;
    name: string;
    iban: string;

    createdAt: Date;
    updatedAt: Date;
}

export type PaymentInput = Required<PaymentAttributes>;
export type PaymentOutput = Required<PaymentAttributes>;

class Payment extends Model<PaymentAttributes, PaymentInput> implements PaymentAttributes {
  public userId!: number;
  public name!: string;
  public iban!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iban: {
      type: DataTypes.STRING,
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
  { sequelize, tableName: "Payments", freezeTableName: true, timestamps: true }
);

export default Payment;
