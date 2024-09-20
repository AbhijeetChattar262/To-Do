"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_DEFAULTS = exports.DB_MESSAGES = void 0;
exports.DB_MESSAGES = {
    MISSING_ENV_VARS: 'Missing required environment variables.',
    CONNECTION_SUCCESS: 'Database connection established successfully.',
    CONNECTION_ERROR: 'Unable to connect to the database:',
    TABLES_CREATED_OR_UPDATED: 'Tables are created or updated successfully.',
    SYNC_ERROR: 'Error syncing database:',
};
exports.DB_DEFAULTS = {
    DIALECT: 'mysql',
    PASSWORD: 'root',
};
