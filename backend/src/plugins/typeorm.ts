import fastifyPlugin from "fastify-plugin";
import pg from "pg";
import { DataSource, EntitySchema, MixedList } from "typeorm";

declare module "fastify" {
    interface FastifyInstance {
        dataSource: DataSource;
    }
}

export type AuthenticatePluginOptions = {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: MixedList<string | Function | EntitySchema<any>>;
};

const typeOrmPlugin = fastifyPlugin<AuthenticatePluginOptions>(
    async function (app, opts) {
        pg.defaults.parseInputDatesAsUTC = true;

        const dateParser = pg.types.getTypeParser(pg.types.builtins.TIMESTAMP);
        pg.types.setTypeParser(pg.types.builtins.TIMESTAMP, (val: string) =>
            dateParser(`${val}Z`)
        );

        const dataSource = new DataSource({
            type: "postgres",
            synchronize: true,
            logging: true,
            subscribers: [],
            migrations: [],

            ...opts,
        });

        app.decorate("dataSource", dataSource);

        await dataSource.initialize();
    }
);

export default typeOrmPlugin;
