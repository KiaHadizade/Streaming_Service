import sql from "mssql"
import "dotenv/config"
import { config } from "./config.js"

try {
    await sql.connect(config)
    console.log("Connected to SQL Server!")

    // SELECT DB_NAME() AS databaseName
    const result = await sql.query("SELECT @@VERSION AS version") // OR: SELECT DB_NAME() AS dbName
    console.log(result.recordset)
    await sql.close()

} catch(err) {
    console.error("Connection failed:")
    console.error(err)
}
