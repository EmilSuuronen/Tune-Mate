import express from 'express';
import { ApolloServer } from '@apollo/server';
import dotenv from 'dotenv';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';

dotenv.config();
const path = require('path');
const typeDefs = require('./api/types/typeDefs');
const resolvers = require('./api/resolvers/userResolver');
const app = express();
const port = process.env.PORT || 8080;

(async () => {
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
    });

    await server.start()

    app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));

    if (process.env.NODE_ENV === 'development') {
        app.use(express.static(path.join(__dirname, '../../client/build')));
    } else {
        app.use(express.static(path.join(__dirname, '../../client/build')));
    }

    app.get('*', function (req, res) {
        if (process.env.NODE_ENV === 'development') {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        } else {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        }
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})();



