const { AdurcBuilder } = require('@adurc/core/dist/builder');
const { SqlServerDriver } = require('@adurc/driver-mssql');
const { GraphQLIntrospector } = require('@adurc/introspector-graphql');

const dotenv = require('dotenv');
dotenv.config();

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

module.exports.default = builder;