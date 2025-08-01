const pool = require('./pool');

async function initializeDatabase() {
  try {
    // Create the custom ENUM type `category` if it doesn't exist
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category') THEN
          CREATE TYPE category AS ENUM ('CAT 1', 'CAT 2', 'CAT 3');
        END IF;
      END$$;
    `);

    // Create the `routers` table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS routers (
        id SERIAL PRIMARY KEY,
        make TEXT NOT NULL,
        model TEXT NOT NULL,
        category category NOT NULL,
        ssid TEXT NOT NULL,
        password TEXT NOT NULL,
        serial_number TEXT,
        login_type TEXT,
        login_link TEXT,
        login_id TEXT,
        login_password TEXT,
        mac_blocking_type TEXT,
        blocking_steps TEXT,
        ipv4_support BOOLEAN DEFAULT FALSE,
        ipv6_support BOOLEAN DEFAULT FALSE,
        ipv6_changing_steps TEXT,
        open BOOLEAN DEFAULT FALSE,
        wpa BOOLEAN DEFAULT FALSE,
        wpa2 BOOLEAN DEFAULT FALSE,
        wpa3 BOOLEAN DEFAULT FALSE,
        wpa_wpa2 BOOLEAN DEFAULT FALSE,
        wpa2_wpa3 BOOLEAN DEFAULT FALSE,
        wifi_4 BOOLEAN DEFAULT FALSE,
        wifi_5 BOOLEAN DEFAULT FALSE,
        wifi_6 BOOLEAN DEFAULT FALSE
      );
    `);

    console.log("✅ Database initialized successfully.");
  } catch (err) {
    console.error("❌ Failed to initialize database:", err.message);
  } finally {
    await pool.end(); // Close the DB connection
  }
}

initializeDatabase();
