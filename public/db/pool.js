const { Pool } = require("pg");

// Again, this should be read from an environment variable
// const pool = new Pool({
//   connectionString: "postgresql://chandan:yuva@localhost:5432/iop_devices"
// });
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // single env var
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
