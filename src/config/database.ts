import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbName = process.env.DB_NAME || 'mydb';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    underscored: true,        // camelCase → snake_case columns automatically
    freezeTableName: false,   // sequelize pluralizes table names
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

export default sequelize;
