import express from 'express';
import { ApolloServer } from '@apollo/server';
import dotenv from 'dotenv';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';

dotenv.config();
const path = require('path');
const typeDefs = require('./api/schemas/index');
const resolvers = require('./api/resolvers/index');
const app = express();
const port = process.env.PORT || 8080;

(async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start()

    app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));

    if (process.env.NODE_ENV === 'development') {
        app.use(express.static(path.join(__dirname, '../../Tune-Mate/client/build')));
    } else {
        app.use(express.static(path.join(__dirname, '../../client/build')));
    }

    app.get('*', function (req, res) {
        if (process.env.NODE_ENV === 'development') {
            res.sendFile(path.join(__dirname, '../../Tune-Mate/client/build', 'index.html'));
        } else {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        }
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})();



