// db/insertTestData.js
const fs = require("fs");
const path = require("path");
const pool = require("./pool");

async function insertTestData() {
    try {
        const dataSql = fs.readFileSync(path.join(__dirname, "insert_test_data.sql"), "utf8");
        await pool.query(dataSql);
        console.log("✅ Test data inserted successfully.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Test data insertion error:", error.message);
        process.exit(1);
    }
}

insertTestData();