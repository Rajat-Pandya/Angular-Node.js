export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Node.js CRUD API with JWT + Employee Module',
    version: '1.0.0',
    description: 'Production-ready REST API built with Express, TypeScript, Sequelize, and PostgreSQL, featuring JWT authentication, Products CRUD, and Employees CRUD.'
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server'
    }
  ],
  tags: [
    { name: 'Auth', description: 'User authentication and registration' },
    { name: 'Products', description: 'Product management operations' },
    { name: 'Employees', description: 'Employee management operations' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT access token (e.g. from /auth/login)'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          username: { type: 'string', example: 'johndoe' },
          email: { type: 'string', format: 'email', example: 'johndoe@example.com' },
          role: { type: 'string', example: 'user' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' }
        }
      },
      RegisterRequest: {
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
          username: { type: 'string', example: 'johndoe' },
          email: { type: 'string', format: 'email', example: 'johndoe@example.com' },
          password: { type: 'string', minLength: 6, example: 'secret123' },
          role: { type: 'string', example: 'user' }
        }
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'johndoe@example.com' },
          password: { type: 'string', example: 'secret123' }
        }
      },
      LoginResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Login successful' },
          accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          user: { $ref: '#/components/schemas/User' }
        }
      },
      Product: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Mechanical Keyboard' },
          description: { type: 'string', example: 'Backlit mechanical keyboard' },
          price: { type: 'number', format: 'float', example: 89.99 },
          stock: { type: 'integer', example: 50 },
          isDeleted: { type: 'boolean', example: false },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' }
        }
      },
      ProductInput: {
        type: 'object',
        required: ['name', 'price', 'stock'],
        properties: {
          name: { type: 'string', example: 'Mechanical Keyboard' },
          description: { type: 'string', example: 'Backlit mechanical keyboard' },
          price: { type: 'number', format: 'float', example: 89.99 },
          stock: { type: 'integer', example: 50 }
        }
      },
      ProductListResponse: {
        type: 'object',
        properties: {
          totalItems: { type: 'integer', example: 1 },
          products: {
            type: 'array',
            items: { $ref: '#/components/schemas/Product' }
          },
          totalPages: { type: 'integer', example: 1 },
          currentPage: { type: 'integer', example: 1 }
        }
      },
      Employee: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          firstName: { type: 'string', example: 'Jane' },
          lastName: { type: 'string', example: 'Smith' },
          email: { type: 'string', format: 'email', example: 'jane.smith@example.com' },
          phone: { type: 'string', example: '555-0123' },
          department: { type: 'string', example: 'Engineering' },
          designation: { type: 'string', example: 'Lead Architect' },
          salary: { type: 'number', format: 'float', example: 120000.00 },
          joiningDate: { type: 'string', format: 'date', example: '2023-01-15' },
          isActive: { type: 'boolean', example: true },
          isDeleted: { type: 'boolean', example: false },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' }
        }
      },
      CreateEmployeeRequest: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'department', 'designation', 'salary', 'joiningDate'],
        properties: {
          firstName: { type: 'string', example: 'Jane' },
          lastName: { type: 'string', example: 'Smith' },
          email: { type: 'string', format: 'email', example: 'jane.smith@example.com' },
          phone: { type: 'string', example: '555-0123' },
          department: { type: 'string', example: 'Engineering' },
          designation: { type: 'string', example: 'Lead Architect' },
          salary: { type: 'number', format: 'float', example: 120000.00 },
          joiningDate: { type: 'string', format: 'date', example: '2023-01-15' },
          isActive: { type: 'boolean', example: true }
        }
      },
      UpdateEmployeeRequest: {
        type: 'object',
        description: 'Partial update for employee (must pass at least one field)',
        properties: {
          firstName: { type: 'string', example: 'Jane' },
          lastName: { type: 'string', example: 'Smith' },
          email: { type: 'string', format: 'email', example: 'jane.smith@example.com' },
          phone: { type: 'string', example: '555-0123' },
          department: { type: 'string', example: 'Engineering' },
          designation: { type: 'string', example: 'Principal Architect' },
          salary: { type: 'number', format: 'float', example: 135000.00 },
          joiningDate: { type: 'string', format: 'date', example: '2023-01-15' },
          isActive: { type: 'boolean', example: true }
        }
      },
      EmployeeListResponse: {
        type: 'object',
        properties: {
          totalItems: { type: 'integer', example: 1 },
          employees: {
            type: 'array',
            items: { $ref: '#/components/schemas/Employee' }
          },
          totalPages: { type: 'integer', example: 1 },
          currentPage: { type: 'integer', example: 1 }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'error' },
          statusCode: { type: 'integer', example: 400 },
          message: { type: 'string', example: 'Error description' }
        }
      }
    }
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' }
            }
          }
        },
        responses: {
          '201': {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'User registered successfully' },
                    user: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Validation error',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          },
          '409': {
            description: 'User already exists',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login and obtain JWT access token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LoginResponse' }
              }
            }
          },
          '400': {
            description: 'Validation error',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          },
          '401': {
            description: 'Invalid credentials',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      }
    },
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'Get paginated list of active products',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'page',
            in: 'query',
            schema: { type: 'integer', default: 1 },
            description: 'Page number'
          },
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 10 },
            description: 'Items per page'
          }
        ],
        responses: {
          '200': {
            description: 'List of products retrieved successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ProductListResponse' }
              }
            }
          },
          '401': {
            description: 'Unauthorized - invalid or missing token',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      },
      post: {
        tags: ['Products'],
        summary: 'Create a new product',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProductInput' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Product created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' }
              }
            }
          },
          '400': {
            description: 'Validation error',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      }
    },
    '/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Get product by ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'Product ID'
          }
        ],
        responses: {
          '200': {
            description: 'Product retrieved successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          },
          '404': {
            description: 'Product not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      },
      put: {
        tags: ['Products'],
        summary: 'Update an existing product',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'Product ID'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProductInput' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Product updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' }
              }
            }
          },
          '400': {
            description: 'Validation error',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          },
          '404': {
            description: 'Product not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      },
      delete: {
        tags: ['Products'],
        summary: 'Soft delete a product',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'Product ID'
          }
        ],
        responses: {
          '204': {
            description: 'Product soft deleted successfully'
          },
          '401': {
            description: 'Unauthorized',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          },
          '404': {
            description: 'Product not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      }
    },
    '/employees': {
      get: {
        tags: ['Employees'],
        summary: 'Get paginated list of employees with optional filters',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'page',
            in: 'query',
            schema: { type: 'integer', default: 1 },
            description: 'Page number'
          },
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 10 },
            description: 'Items per page'
          },
          {
            name: 'department',
            in: 'query',
            schema: { type: 'string' },
            description: 'Filter by department'
          },
          {
            name: 'isActive',
            in: 'query',
            schema: { type: 'boolean' },
            description: 'Filter by active status'
          }
        ],
        responses: {
          '200': {
            description: 'List of employees retrieved successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/EmployeeListResponse' }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      },
      post: {
        tags: ['Employees'],
        summary: 'Create a new employee',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateEmployeeRequest' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Employee created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Employee' }
              }
            }
          },
          '400': {
            description: 'Validation error',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          },
          '409': {
            description: 'Employee email already exists (including soft-deleted)',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      }
    },
    '/employees/{id}': {
      get: {
        tags: ['Employees'],
        summary: 'Get employee by ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'Employee ID'
          }
        ],
        responses: {
          '200': {
            description: 'Employee retrieved successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Employee' }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          },
          '404': {
            description: 'Employee not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      },
      put: {
        tags: ['Employees'],
        summary: 'Update employee (partial update, must pass at least one field)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'Employee ID'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateEmployeeRequest' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Employee updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Employee' }
              }
            }
          },
          '400': {
            description: 'Validation error (e.g. empty update body)',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          },
          '401': {
            description: 'Unauthorized',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          },
          '404': {
            description: 'Employee not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          },
          '409': {
            description: 'Email already in use by another employee',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      },
      delete: {
        tags: ['Employees'],
        summary: 'Soft delete an employee',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'Employee ID'
          }
        ],
        responses: {
          '204': {
            description: 'Employee soft deleted successfully'
          },
          '401': {
            description: 'Unauthorized',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          },
          '404': {
            description: 'Employee not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      }
    }
  }
};
