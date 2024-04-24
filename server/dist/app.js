"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const dotenv_1 = __importDefault(require("dotenv"));
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const schemas_1 = __importDefault(require("./src/api/schemas"));
const resolvers_1 = __importDefault(require("./src/api/resolvers"));
const db_1 = __importDefault(require("./src/utils/db"));
const helmet_1 = __importDefault(require("helmet"));
const authenticate_1 = __importDefault(require("./src/functions/authenticate"));
dotenv_1.default.config();
const path = require('path');
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
(async () => {
    try {
        app.use((0, helmet_1.default)({
            crossOriginEmbedderPolicy: false,
            contentSecurityPolicy: false,
        }));
    }
    catch (error) {
        console.log('Server error', error.message);
    }
    app.use((0, cors_1.default)());
    const server = new server_1.ApolloServer({
        typeDefs: schemas_1.default,
        resolvers: resolvers_1.default,
    });
    await server.start();
    app.use('/graphql', (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
        context: ({ res }) => res.locals.user,
    }), authenticate_1.default);
    try {
        await (0, db_1.default)();
    }
    catch (error) {
        console.log('Server error', error.message);
    }
    if (process.env.NODE_ENV === 'development') {
        app.use(express_1.default.static(path.join(__dirname, '../client/build')));
    }
    else {
        app.use(express_1.default.static(path.join(__dirname, '../../client/build')));
    }
    app.get('*', function (req, res) {
        if (process.env.NODE_ENV === 'development') {
            res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
        }
        else {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        }
    });
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})();
//# sourceMappingURL=app.js.map