import sql from "mssql";

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),

  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  return sql.connect(config);
}
