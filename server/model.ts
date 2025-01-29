import { Model, DataTypes, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

dotenv.config({ path: path.resolve(__dirname, `../.env.${env}`) });

// const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql',
//   port: 3306,
// });

const sequelize = new Sequelize('crypto', 'root', '97chocho', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});


type TAccountHolder = {
  id: number;
 name: string;

  withdrawalAmount: number;
  depositAmount:number;
  fee: number;
  status: 'none' | 'pending';
  walletAddress: string;
  requestedWithdrawalAmount:number
};

type CreationTAccountHolder = Omit<TAccountHolder, 'id'>;

export class AccountHolder extends Model<TAccountHolder, CreationTAccountHolder> {
  public id!: number;
  public name!: string;
  public withdrawalAmount!: number; 
  public depositAmount!:number;
  public fee!: number;
  public status!: 'none' | 'pending';
  public walletAddress!: string;
  public requestedWithdrawalAmount!:number
}

AccountHolder.init(
  {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },

      withdrawalAmount: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      fee: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      status: {
          type: DataTypes.ENUM('none', 'pending'),
          allowNull: false,
      },
      walletAddress: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
      requestedWithdrawalAmount: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      depositAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
  },
  {
    sequelize,
    tableName: 'accountHolders',
    timestamps: true, 
  }
);

export { sequelize };
