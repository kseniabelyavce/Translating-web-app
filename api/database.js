import knex from "knex";

export default knex({
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
        filename: "data/db.sqlite"
    }
});