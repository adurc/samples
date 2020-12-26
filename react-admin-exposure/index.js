const express = require('express');
const ApolloServer = require('apollo-server-express').ApolloServer;
const dotenv = require('dotenv');
const { AdurcBuilder } = require('@adurc/core/dist/builder');
const { SqlServerDriver } = require('@adurc/driver-mssql');
const { ReactAdminExposure } = require('@adurc/exposure-react-admin');
const { GraphQLIntrospector } = require('@adurc/introspector-graphql');

dotenv.config();

async function bootstrap() {
    const app = express();

    app.use(express.json());

    const builder = new AdurcBuilder();

    builder.use(SqlServerDriver.use('adurc', {
        database: process.env.DB_DATABASE,
        server: process.env.DB_SERVER,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        options: {
            instanceName: process.env.DB_INSTANCE,
        }
    }));

    builder.use(GraphQLIntrospector.use({
        path: process.cwd() + '/models/*.graphql',
        encoding: 'utf8',
        defaultSourceName: 'adurc',
    }));

    builder.use(ReactAdminExposure.use(
        ApolloServer,
        {
            playground: true
        },
        (apollo) => apollo.applyMiddleware({ app, path: '/graphql' })
    ));

    const adurc = await builder.build();

    const users = adurc.client.user.findMany({
        select: {
            name: true,
        }
    });

    for (const user of users) {
        console.log(`User ${user.name}`);
    }

    app.listen(3000);

    console.log(
        'Serving the GraphQL Playground on http://localhost:3000/graphql',
    );

    return app;
}

bootstrap();