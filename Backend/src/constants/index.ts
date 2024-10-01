export const API_RESPONSES = {
  CREATED: {
    message: "Resource created",
    code: 201,
  },
  OK: {
    message: "Resource found",
    code: 200,
  },
  BAD_REQUEST: {
    message: "Invalid request",
    code: 400,
  },
  UNAUTHORIZED: {
    message: "Unauthorized",
    code: 401,
  },
  NOT_FOUND: {
    message: "Resource not found",
    code: 404,
  },
  SOMETHING_WENT_WRONG: {
    message: "Something went wrong",
    code: 500,
  },
  DB: {
    CREATE_TODO_FAILED: {
      message: "Failed to create todo in database",
      code: 501,
    },
    GET_TODOS_BY_USER_ID_FAILED: {
      message: "Failed to get todos by user id in database",
      code: 502,
    },
    GET_TODOS_BY_ID_AND_USER_ID_NOT_FOUND: {
      message: "Failed to get todos by id and user id in database",
      code: 503,
    },
    UPDATE_COMPLETE_STATUS_TASK_FAILED: {
      message: "Failed to update todo completion status in database",
      code: 504,
    },
    UPDATE_TASK_FAILED: {
      message: "Failed to update todo task in database",
      code: 505,
    },
    DELETE_TODO_FAILED: {
      message: "Failed to delete todo in database",
      code: 506,
    },
    FIND_USER_BY_USERNAME_FAILED: {
      message: "Failed to find user by username in database",
      code: 507,
    },
    CREATE_USER_FAILED: {
      message: "Failed to create user in database",
      code: 508,
    },
  },

  CONTROLLER: {
    CREATE_TODO_FAILED: {
      message: "Failed to create user",
      code: 511,
    },
    GET_TODOS_BY_USER_ID_FAILED: {
      message: "Failed to get todos by user id",
      code: 512,
    },
    GET_TODOS_BY_ID_AND_USER_ID_NOT_FOUND: {
      message: "Failed to get todos by id and user id",
      code: 513,
    },
    UPDATE_COMPLETE_STATUS_TASK_FAILED: {
      message: "Failed to update todo completion status",
      code: 514,
    },
    UPDATE_TASK_FAILED: {
      message: "Failed to update todo task",
      code: 515,
    },
    DELETE_TODO_FAILED: {
      message: "Failed to delete todo",
      code: 516,
    },
    CREATE_TODO_SUCCESS: {
      message: "Todo created successfully",
      code: 200,
    },
    GET_TODOS_BY_USER_ID_SUCCESS: {
      message: "Todos fetched successfully",
      code: 200,
    },
    GET_TODOS_BY_ID_AND_USER_ID_SUCCESS: {
      message: "Todo fetched successfully",
      code: 200,
    },
    UPDATE_COMPLETE_STATUS_TASK_SUCCESS: {
      message: "Todo completion status updated successfully",
      code: 200,
    },
    UPDATE_TASK_SUCCESS: {
      message: "Todo task updated successfully",
      code: 200,
    },
    DELETE_TODO_SUCCESS: {
      message: "Todo deleted successfully",
      code: 200,
    },
    INVALID_CREDENTIALS: {
      message: "Invalid credentials",
      code: 531,
    },
    LOGIN_FAILED: {
      message: "Login failed",
      code: 532,
    },
    REGISTER_FAILED: {
      message: "Register failed",
      code: 533,
    },
    USER_ALREADY_EXISTS: {
      message: "User already exists",
      code: 535,
    },
    LOGIN_SUCCESS: {
      message: "Login successful",
      code: 200,
    },
    REGISTER_SUCCESS: {
      message: "Register successful",
      code: 200,
    },
  },
  VALIDATION_MESSAGES: {
    TASK_REQUIRED: {
      message: "Task is required",
      code: 601,
    },
    USERNAME_AND_PASSWORD_REQUIRED: {
      message: "Username and password are required",
      code: 602,
    },
    INVALID_TOKEN: {
      message: "Invalid token",
      code: 603
    }
  }
};

export const AUTH_HEADERS = {
  AUTHORIZATION: "authorization",
};

export const AUTH_PREFIXES = {
  BEARER: "Bearer ",
};

export const AUTH_DEFAULTS = {
  JWT_SECRET: "defaultSecret",
};

export const DB_MESSAGES = {
  MISSING_ENV_VARS: 'Missing required environment variables.',
  CONNECTION_SUCCESS: 'Database connection established successfully.',
  CONNECTION_ERROR: 'Unable to connect to the database:',
  TABLES_CREATED_OR_UPDATED: 'Tables are created or updated successfully.',
  SYNC_ERROR:'Error syncing database:',
};

export const DB_DEFAULTS = {
  DIALECT: 'mysql' as const,
  PASSWORD: 'root',
};

export const VALIDATION_MESSAGES = {
  TASK_REQUIRED: {
    message: "Task is required",
    code: 601,
  },
  USERNAME_AND_PASSWORD_REQUIRED: {
    message: "Username and password are required",
    code: 602,
  }
};

