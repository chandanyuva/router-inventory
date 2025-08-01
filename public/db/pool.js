const { Pool } = require("pg");

// Again, this should be read from an environment variable
const pool = new Pool({
  connectionString: "postgresql://chandan:yuva@localhost:5432/iop_devices"
});

module.exports = pool;