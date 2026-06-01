import sql from "mssql"
import { config } from "./config.js"

async function test() {
    try {
        await sql.connect(config)
        console.log("Connected to SQL Server!")

        // SELECT DB_NAME() AS databaseName
        const result = await sql.query`
            SELECT @@VERSION AS version
        `
        console.log(result.recordset)
        await sql.close()

    } catch(err) {
        console.error(err)
    }
}
test()
