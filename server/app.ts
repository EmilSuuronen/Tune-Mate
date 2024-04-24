import express from 'express';
import {ApolloServer} from '@apollo/server';
import dotenv from 'dotenv';
import {expressMiddleware} from '@apollo/server/express4';
import cors from 'cors';
import typeDefs from "./src/api/schemas";
import resolvers from "./src/api/resolvers";
import mongoConnect from "./src/utils/db";
import {MyContext} from "./src/types/MyContext";
import helmet from 'helmet';

dotenv.config();
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

(async () => {
    try {
        app.use(
            helmet({
                crossOriginEmbedderPolicy: false,
                contentSecurityPolicy: false,
            })
        );
    } catch (error) {
        console.log('Server error', (error as Error).message);
    }
    app.use(cors());

    const server = new ApolloServer<MyContext>({
        typeDefs: typeDefs,
        resolvers: resolvers,
    });

    await server.start()

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, {
            context: ({res}) => res.locals.user,
        })
    );

    try {
        await mongoConnect();
    } catch (error) {
        console.log('Server error', (error as Error).message);
    }

    if (process.env.NODE_ENV === 'development') {
        app.use(express.static(path.join(__dirname, '../client/build')));
    } else {
        app.use(express.static(path.join(__dirname, '../../client/build')));
    }

    app.get('*', function (req, res) {
        if (process.env.NODE_ENV === 'development') {
            res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
        } else {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        }
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });


})();



