const express = require('express');
const ApolloServer = require('apollo-server-express').ApolloServer;
const { BuilderStage } = require('@adurc/core/dist/interfaces/builder.generator');
const { ReactAdminExposure } = require('@adurc/exposure-react-admin');
const dotenv = require('dotenv');
dotenv.config();

const builder = require('./adurc-builder');

async function bootstrap() {
    const app = express();

    app.use(express.json());

    builder.use(ReactAdminExposure.use(
        ApolloServer,
        {
            playground: true
        },
        (apollo) => apollo.applyMiddleware({ app, path: '/graphql' })
    ));

    builder.use(function* customGenerator(context) {
        context.logger.debug('[sample] customer generator: builder before init')
        yield BuilderStage.OnInit;
        context.logger.debug('[sample] customer generator: models found ' + context.models.length);
    });

    const adurc = await builder.build();

    app.listen(3000);

    console.log(
        '[sample] Serving the GraphQL Playground on http://localhost:3000/graphql',
    );

    console.log('[sample] Example using adurc directly like prisma:');

    const users = await adurc.user.findMany({
        select: {
            name: true,
        },
    });

    for (const user of users) {
        console.log(`[sample] User ${JSON.stringify(user)}`);
    }

    return app;
}

bootstrap();