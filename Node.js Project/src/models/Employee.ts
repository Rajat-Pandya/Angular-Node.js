import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface EmployeeAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  department: string;
  designation: string;
  salary: number;
  joiningDate: Date;
  isActive: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EmployeeCreationAttributes
  extends Optional<EmployeeAttributes, 'id' | 'phone' | 'isActive' | 'isDeleted' | 'createdAt' | 'updatedAt'> {}

class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phone: string | null;
  declare department: string;
  declare designation: string;
  declare salary: number;
  declare joiningDate: Date;
  declare isActive: boolean;
  declare isDeleted: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Employee.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    department: { type: DataTypes.STRING, allowNull: false },
    designation: { type: DataTypes.STRING, allowNull: false },
    salary: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    joiningDate: { type: DataTypes.DATEONLY, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    sequelize,
    tableName: 'employees',
    defaultScope: { where: { isDeleted: false } },
    scopes: { withDeleted: {} }
  }
);

export default Employee;
