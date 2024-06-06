"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dbConn_1 = __importDefault(require("./config/dbConn"));
const components_1 = require("./routes/api/v1/components");
const path_1 = __importDefault(require("path"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const register_1 = require("./routes/api/register");
const auth_1 = require("./routes/api/auth");
const cookieParser = require("cookie-parser");
const refresh_1 = require("./routes/api/refresh");
const logout_1 = require("./routes/api/logout");
const logAcces_1 = __importDefault(require("./middleware/logAcces"));
const devices_1 = require("./routes/api/v1/devices");
dotenv_1.default.config();
(0, dbConn_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Form data
app.use(express_1.default.urlencoded({ extended: false }));
// Json data
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
// Cookies (refresh)
app.use(cookieParser());
// Static files
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// CORS
app.use((0, cors_1.default)(corsOptions_1.default));
// Logging
app.use(logAcces_1.default);
// Components routes
app.use('/api/v1/components', components_1.components);
// Devices routes
app.use('/api/v1/devices', devices_1.devices);
// Register
app.use('/api/register', register_1.register);
// Authenticate
app.use('/api/auth', auth_1.auth);
// Refresh
app.use('/api/refresh', refresh_1.refresh);
// Logout
app.use('/api/logout', logout_1.logout);
// Favicon
app.get('/favicon.ico', (req, res) => {
    // #swagger.ignore = true
    res.sendFile(path_1.default.join(__dirname, '../public/img/favicon.ico'));
});
// Root
app.get('/', (req, res) => {
    // #swagger.ignore = true
    res.send('Hello world');
});
// 404 Not found
app.all('*', (req, res) => {
    // #swagger.ignore = true
    res.status(404).json({ message: '404 Not found' });
});
// Error handler
app.use(errorHandler_1.default);
// MongoDB connection
mongoose_1.default.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
});
