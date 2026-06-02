import "dotenv/config";
import { getConnection } from "./src/lib/db.js";

try {
  const pool = await getConnection();

  const result = await pool.request().query("SELECT DB_NAME() AS dbName");

  console.log("Connected successfully!");
  console.log(result.recordset);
} catch (err) {
  console.error("Connection failed:");
  console.error(err);
}
// node test.js
/* import sql from "mssql";

const config = {
  server: "DESKTOP-SGCHB4B",
  database: "StreamDB",
  user: "nextapp",
  password: "nextapp123",
  options: {
    trustServerCertificate: true,
  },
};

await sql.connect(config);
console.log("Connected!"); */
