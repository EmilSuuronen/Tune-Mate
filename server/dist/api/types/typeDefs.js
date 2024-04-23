"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
    type Query {
        getUserById: String
    }
`;
module.exports = typeDefs;
//# sourceMappingURL=typeDefs.js.map