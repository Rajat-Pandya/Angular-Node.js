# 🚀 Project Creation Prompt — Node.js CRUD API with JWT + Employee Module

> Copy the full prompt below and paste it into a new AI session to recreate this project from scratch including the new Employee CRUD feature.

---

## FULL PROMPT

```
Build a production-ready Node.js REST API using TypeScript, Express, Sequelize ORM, and PostgreSQL. The project must implement JWT authentication, a Products CRUD module, and a new Employees CRUD module. Follow the exact architecture, folder structure, and code patterns described below.

---

## TECH STACK

- Runtime: Node.js
- Language: TypeScript (strict mode, target ES2022, module commonjs)
- Framework: Express ^4.19.2
- ORM: Sequelize ^6.37.3 with PostgreSQL dialect
- Database: PostgreSQL (pg ^8.11.5, pg-hstore ^2.3.4)
- Authentication: jsonwebtoken ^9.0.2
- Password Hashing: bcrypt ^5.1.1
- Validation: Joi ^17.13.1
- API Docs: swagger-ui-express ^5.0.0
- CORS: cors ^2.8.5
- Config: dotenv ^16.4.5
- Dev: ts-node-dev ^2.0.0, typescript ^6.0.2

---

## PROJECT NAME & SCRIPTS

Package name: nodejs-crud-with-jwt

Scripts:
  "start": "node dist/server.js"
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
  "build": "tsc"

---

## FOLDER STRUCTURE

src/
├── app.ts
├── server.ts
├── config/
│   ├── database.ts
│   └── swagger.ts
├── controllers/
│   ├── AuthController.ts
│   ├── ProductController.ts
│   └── EmployeeController.ts       ← NEW
├── interfaces/
│   └── auth.interface.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validation.middleware.ts
├── models/
│   ├── User.ts
│   ├── RefreshToken.ts
│   ├── Product.ts
│   └── Employee.ts                 ← NEW
├── repositories/
│   ├── UserRepository.ts
│   ├── ProductRepository.ts
│   └── EmployeeRepository.ts       ← NEW
├── routes/
│   ├── index.ts
│   ├── auth.routes.ts
│   ├── product.routes.ts
│   └── employee.routes.ts          ← NEW
├── services/
│   ├── AuthService.ts
│   ├── ProductService.ts
│   └── EmployeeService.ts          ← NEW
└── utils/
    └── jwtUtils.ts

---

## TSCONFIG (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

---

## ENVIRONMENT (.env)

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=riseDB
PORT=3000
NODE_ENV=development
JWT_SECRET=your_long_random_secret
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=1d
```

---

## src/config/database.ts

```typescript
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
```

---

## src/app.ts

```typescript
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './config/swagger';
import routes from './routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => { res.redirect('/api-docs'); });
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorMiddleware);

export default app;
```

---

## src/server.ts

```typescript
import app from './app';
import sequelize from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL successfully.');
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
```

---

## src/utils/jwtUtils.ts

```typescript
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const ACCESS_EXP = process.env.JWT_ACCESS_EXPIRATION || '15m';

export interface TokenPayload {
  userId: number;
  email: string;
  role: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXP as any });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
```

---

## src/interfaces/auth.interface.ts

```typescript
import { Request } from 'express';
import { TokenPayload } from '../utils/jwtUtils';

export interface RequestWithUser extends Request {
  user?: TokenPayload;
}
```

---

## src/middleware/error.middleware.ts

```typescript
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error(`[Error] ${statusCode} - ${message}`);
  res.status(statusCode).json({ status: 'error', statusCode, message });
};
```

---

## src/middleware/auth.middleware.ts

```typescript
import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';
import { RequestWithUser } from '../interfaces/auth.interface';

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
```

---

## src/middleware/validation.middleware.ts

```typescript
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((d: any) => d.message).join(', ');
      return res.status(400).json({ message: errorMessage });
    }
    next();
  };
};

// --- Auth Schemas ---
export const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// --- Product Schemas ---
export const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('', null),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required()
});

// --- Employee Schemas ---
export const employeeSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow('', null),
  department: Joi.string().required(),
  designation: Joi.string().required(),
  salary: Joi.number().positive().required(),
  joiningDate: Joi.date().required(),
  isActive: Joi.boolean().optional()
});

export const updateEmployeeSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().allow('', null).optional(),
  department: Joi.string().optional(),
  designation: Joi.string().optional(),
  salary: Joi.number().positive().optional(),
  joiningDate: Joi.date().optional(),
  isActive: Joi.boolean().optional()
});
```

---

## src/models/User.ts

```typescript
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare username: string;
  declare email: string;
  declare passwordHash: string;
  declare role: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, field: 'email' },
    passwordHash: { type: DataTypes.STRING, allowNull: false, field: 'password_hash' },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user', field: 'role' },
  },
  { sequelize, tableName: 'users' }
);

export default User;
```

---

## src/models/RefreshToken.ts

```typescript
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

interface RefreshTokenAttributes {
  id: number;
  token: string;
  userId: number;
  expiresAt: Date;
  isRevoked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RefreshTokenCreationAttributes extends Optional<RefreshTokenAttributes, 'id' | 'isRevoked' | 'createdAt' | 'updatedAt'> {}

class RefreshToken extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes> implements RefreshTokenAttributes {
  declare id: number;
  declare token: string;
  declare userId: number;
  declare expiresAt: Date;
  declare isRevoked: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

RefreshToken.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    token: { type: DataTypes.STRING(500), allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
    isRevoked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  { sequelize, tableName: 'refresh_tokens' }
);

User.hasMany(RefreshToken, { foreignKey: 'userId', as: 'refreshTokens' });
RefreshToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default RefreshToken;
```

---

## src/models/Product.ts

```typescript
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'isDeleted' | 'createdAt' | 'updatedAt'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  declare id: number;
  declare name: string;
  declare description: string;
  declare price: number;
  declare stock: number;
  declare isDeleted: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    sequelize,
    tableName: 'products',
    defaultScope: { where: { isDeleted: false } },
    scopes: { withDeleted: {} }
  }
);

export default Product;
```

---

## src/models/Employee.ts  ← NEW

```typescript
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
```

---

## src/repositories/UserRepository.ts

```typescript
import User from '../models/User';

class UserRepository {
  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }
  async findById(id: number) {
    return await User.findByPk(id);
  }
  async create(userData: any) {
    return await User.create(userData);
  }
}

export default new UserRepository();
```

---

## src/repositories/ProductRepository.ts

```typescript
import Product from '../models/Product';

class ProductRepository {
  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Product.findAndCountAll({
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });
    return {
      totalItems: count,
      products: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
  }

  async findById(id: number) {
    return await Product.findByPk(id);
  }

  async create(productData: any) {
    return await Product.create(productData);
  }

  async update(id: number, productData: any) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    return await product.update(productData);
  }

  async softDelete(id: number) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    return await product.update({ isDeleted: true });
  }
}

export default new ProductRepository();
```

---

## src/repositories/EmployeeRepository.ts  ← NEW

```typescript
import Employee from '../models/Employee';

class EmployeeRepository {
  async findAll(page: number, limit: number, filters?: { department?: string; isActive?: boolean }) {
    const offset = (page - 1) * limit;
    const where: any = {};
    if (filters?.department) where.department = filters.department;
    if (filters?.isActive !== undefined) where.isActive = filters.isActive;

    const { count, rows } = await Employee.findAndCountAll({
      where,
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });

    return {
      totalItems: count,
      employees: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
  }

  async findById(id: number) {
    return await Employee.findByPk(id);
  }

  async findByEmail(email: string) {
    return await Employee.findOne({ where: { email } });
  }

  async create(data: any) {
    return await Employee.create(data);
  }

  async update(id: number, data: any) {
    const emp = await Employee.findByPk(id);
    if (!emp) return null;
    return await emp.update(data);
  }

  async softDelete(id: number) {
    const emp = await Employee.findByPk(id);
    if (!emp) return null;
    return await emp.update({ isDeleted: true });
  }
}

export default new EmployeeRepository();
```

---

## src/services/AuthService.ts

```typescript
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import { generateAccessToken, TokenPayload } from '../utils/jwtUtils';

class AuthService {
  async register(userData: { username: string; email: string; password: string; role?: string }) {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) throw new Error('User already exists');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData.password, salt);

    const newUser = await UserRepository.create({
      username: userData.username,
      email: userData.email,
      passwordHash,
      role: userData.role || 'user'
    });

    return { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role };
  }

  async login(loginData: { email: string; password: any }) {
    const user = await UserRepository.findByEmail(loginData.email);
    if (!user || !user.passwordHash || !loginData.password) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(loginData.password, user.passwordHash);
    if (!isValid) throw new Error('Invalid credentials');

    const payload: TokenPayload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(payload);

    return {
      accessToken,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    };
  }
}

export default new AuthService();
```

---

## src/services/ProductService.ts

```typescript
import ProductRepository from '../repositories/ProductRepository';

class ProductService {
  async getAllProducts(page: number = 1, limit: number = 10) {
    return await ProductRepository.findAll(page, limit);
  }

  async getProductById(id: number) {
    const product = await ProductRepository.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async createProduct(productData: any) {
    return await ProductRepository.create(productData);
  }

  async updateProduct(id: number, productData: any) {
    const product = await ProductRepository.update(id, productData);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async deleteProduct(id: number) {
    const product = await ProductRepository.softDelete(id);
    if (!product) throw new Error('Product not found');
    return product;
  }
}

export default new ProductService();
```

---

## src/services/EmployeeService.ts  ← NEW

```typescript
import EmployeeRepository from '../repositories/EmployeeRepository';

class EmployeeService {
  async getAllEmployees(page: number = 1, limit: number = 10, filters?: { department?: string; isActive?: boolean }) {
    return await EmployeeRepository.findAll(page, limit, filters);
  }

  async getEmployeeById(id: number) {
    const emp = await EmployeeRepository.findById(id);
    if (!emp) throw new Error('Employee not found');
    return emp;
  }

  async createEmployee(data: any) {
    const existing = await EmployeeRepository.findByEmail(data.email);
    if (existing) throw new Error('Employee with this email already exists');
    return await EmployeeRepository.create(data);
  }

  async updateEmployee(id: number, data: any) {
    // If email is being updated, check uniqueness
    if (data.email) {
      const existing = await EmployeeRepository.findByEmail(data.email);
      if (existing && existing.id !== id) throw new Error('Email already in use by another employee');
    }
    const emp = await EmployeeRepository.update(id, data);
    if (!emp) throw new Error('Employee not found');
    return emp;
  }

  async deleteEmployee(id: number) {
    const emp = await EmployeeRepository.softDelete(id);
    if (!emp) throw new Error('Employee not found');
    return emp;
  }
}

export default new EmployeeService();
```

---

## src/controllers/AuthController.ts

```typescript
import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error: any) { next(error); }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json({ message: 'Login successful', ...result });
    } catch (error: any) { next(error); }
  }
}

export default new AuthController();
```

---

## src/controllers/ProductController.ts

```typescript
import { Request, Response, NextFunction } from 'express';
import ProductService from '../services/ProductService';

class ProductController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      res.status(200).json(await ProductService.getAllProducts(page, limit));
    } catch (error: any) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await ProductService.getProductById(parseInt(req.params.id)));
    } catch (error: any) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json(await ProductService.createProduct(req.body));
    } catch (error: any) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await ProductService.updateProduct(parseInt(req.params.id), req.body));
    } catch (error: any) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ProductService.deleteProduct(parseInt(req.params.id));
      res.status(204).send();
    } catch (error: any) { next(error); }
  }
}

export default new ProductController();
```

---

## src/controllers/EmployeeController.ts  ← NEW

```typescript
import { Request, Response, NextFunction } from 'express';
import EmployeeService from '../services/EmployeeService';

class EmployeeController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const department = req.query.department as string | undefined;
      const isActive = req.query.isActive !== undefined
        ? req.query.isActive === 'true'
        : undefined;
      res.status(200).json(await EmployeeService.getAllEmployees(page, limit, { department, isActive }));
    } catch (error: any) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await EmployeeService.getEmployeeById(parseInt(req.params.id)));
    } catch (error: any) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json(await EmployeeService.createEmployee(req.body));
    } catch (error: any) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await EmployeeService.updateEmployee(parseInt(req.params.id), req.body));
    } catch (error: any) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await EmployeeService.deleteEmployee(parseInt(req.params.id));
      res.status(204).send();
    } catch (error: any) { next(error); }
  }
}

export default new EmployeeController();
```

---

## src/routes/auth.routes.ts

```typescript
import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { validateRequest, registerSchema, loginSchema } from '../middleware/validation.middleware';

const router = Router();
router.post('/register', validateRequest(registerSchema), AuthController.register);
router.post('/login', validateRequest(loginSchema), AuthController.login);
export default router;
```

---

## src/routes/product.routes.ts

```typescript
import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateRequest, productSchema } from '../middleware/validation.middleware';

const router = Router();
router.use(authMiddleware);
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/', validateRequest(productSchema), ProductController.create);
router.put('/:id', validateRequest(productSchema), ProductController.update);
router.delete('/:id', ProductController.delete);
export default router;
```

---

## src/routes/employee.routes.ts  ← NEW

```typescript
import { Router } from 'express';
import EmployeeController from '../controllers/EmployeeController';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateRequest, employeeSchema, updateEmployeeSchema } from '../middleware/validation.middleware';

const router = Router();
router.use(authMiddleware);
router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getById);
router.post('/', validateRequest(employeeSchema), EmployeeController.create);
router.put('/:id', validateRequest(updateEmployeeSchema), EmployeeController.update);
router.delete('/:id', EmployeeController.delete);
export default router;
```

---

## src/routes/index.ts

```typescript
import { Router } from 'express';
import authRoutes from './auth.routes';
import productRoutes from './product.routes';
import employeeRoutes from './employee.routes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/employees', employeeRoutes);
export default router;
```

---

## src/config/swagger.ts

Generate a complete Swagger/OpenAPI 3.0 document that covers ALL of the following endpoints:

### Auth (tag: Auth)
- POST /auth/register — Register user (body: username, email, password)
- POST /auth/login — Login, returns accessToken (body: email, password)

### Products (tag: Products, security: bearerAuth)
- GET /products?page=1&limit=10 — Paginated list
- GET /products/:id — Get by ID
- POST /products — Create (body: name, description, price, stock)
- PUT /products/:id — Update (body: name, description, price, stock)
- DELETE /products/:id — Soft delete, returns 204

### Employees (tag: Employees, security: bearerAuth)  ← NEW
- GET /employees?page=1&limit=10&department=string&isActive=boolean — Paginated list with optional filters
- GET /employees/:id — Get by ID
- POST /employees — Create (body: firstName, lastName, email, phone, department, designation, salary, joiningDate)
- PUT /employees/:id — Update (partial body, all fields optional except must pass at least one)
- DELETE /employees/:id — Soft delete, returns 204

Include full component schemas for User, Product, and Employee. Add bearerAuth security scheme. The server URL is http://localhost:3000/api.

---

## BUSINESS RULES & KEY PATTERNS

1. **Architecture**: Controller → Service → Repository → Model (strict layering)
2. **Soft Delete**: Products and Employees use `isDeleted: boolean` flag; the model's `defaultScope` filters them out automatically. A `withDeleted` scope exists for admin use.
3. **JWT Auth**: Access token only (no refresh token rotation in current implementation). Token payload: `{ userId, email, role }`. Expiry: 15m.
4. **Validation**: Joi schemas in `validation.middleware.ts`. `abortEarly: false` to return all errors at once.
5. **Error Handling**: All controller methods use `try/catch` and delegate to `next(error)`. The global `errorMiddleware` returns `{ status, statusCode, message }`.
6. **DB Config**: `underscored: true` — Sequelize auto-maps camelCase fields to snake_case DB columns. `freezeTableName: false` — table names are pluralised automatically.
7. **Password**: bcrypt with salt rounds = 10. Never return `passwordHash` in responses.
8. **CORS**: All origins allowed in development.
9. **Root route**: `GET /` redirects to `/api-docs`.
10. **Employee page** (`empDetails`): The UI page for employee details should use these employee CRUD API endpoints: list (GET /api/employees), add (POST /api/employees), edit (PUT /api/employees/:id), and delete (DELETE /api/employees/:id).

---

## WHAT TO BUILD

Implement all files listed above exactly. After generating all files, verify:
- `npm run dev` starts without TypeScript errors
- All routes are reachable via Swagger UI at http://localhost:3000/api-docs
- Employee CRUD is fully functional with pagination, optional filters, soft delete, and email uniqueness validation
- JWT token from POST /auth/login can be used to access /api/employees and /api/products
```

---

*Generated from project at `d:\self learning\nodejs crud with jwt`*
