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
dotenv_1.default.config();
const path = require('path');
const typeDefs = require('./api/schemas/index');
const resolvers = require('./api/resolvers/userResolver');
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
(async () => {
    const server = new server_1.ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    app.use('/graphql', (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server));
    if (process.env.NODE_ENV === 'development') {
        app.use(express_1.default.static(path.join(__dirname, '../../Tune-Mate/client/build')));
    }
    else {
        app.use(express_1.default.static(path.join(__dirname, '../../client/build')));
    }
    app.get('*', function (req, res) {
        if (process.env.NODE_ENV === 'development') {
            res.sendFile(path.join(__dirname, '../../Tune-Mate/client/build', 'index.html'));
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