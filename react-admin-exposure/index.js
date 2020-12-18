const express = require('express');
const ApolloServer = require('apollo-server-express').ApolloServer;
const dotenv = require('dotenv');
const { AdurcBuilder } = require('@adurc/core');
const { SqlServerDriver } = require('@adurc/driver-mssql');
const { ReactAdminExposure } = require('@adurc/exposure-react-admin');
const { GraphQLIntrospector } = require('@adurc/introspector-graphql');

dotenv.config();

async function bootstrap() {
    const app = express();

    app.use(express.json());

    const adurc = await AdurcBuilder.create()
        .use(new SqlServerDriver({
            config: {
                database: process.env.DB_DATABASE,
                server: process.env.DB_SERVER,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                options: {
                    instanceName: process.env.DB_INSTANCE,
                }
            }
        }))
        .use(new GraphQLIntrospector({
            path: process.cwd() + '/models/*.graphql',
            encoding: 'utf8',
        }))
        .build();

    const reactAdmin = new ReactAdminExposure({
        adurc,
    });

    const apollo = reactAdmin.useApollo(ApolloServer, {
        playground: true
    });

    apollo.applyMiddleware({ app, path: '/graphql' });

    app.listen(3000);

    console.log(
        'Serving the GraphQL Playground on http://localhost:3000/graphql',
    );

    return app;
}

bootstrap();