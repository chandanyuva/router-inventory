const { Router } = require("express");
const pool = require("../public/db/pool");
const searchRouter = Router();

// Search API with ILIKE on make, model, ssid
searchRouter.get("/api", async (req, res) => {
    const q = req.query.q || "";
    try {
        const result = await pool.query(
            `SELECT *
             FROM routers
             WHERE make ILIKE $1
                OR model ILIKE $1
                OR ssid ILIKE $1
                OR password ILIKE $1
                OR serial_number ILIKE $1
                OR category::text ILIKE $1
                OR login_type ILIKE $1
                OR login_link ILIKE $1
                OR login_id ILIKE $1
                OR login_password ILIKE $1
                OR mac_blocking_type ILIKE $1
                OR blocking_steps ILIKE $1
                OR ipv6_changing_steps ILIKE $1
             ORDER BY id
             LIMIT 50`,
            [`%${q}%`]
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Search API error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Render the search page
// searchRouter.get("/", (req, res) => {
//     res.render("search");
// });

module.exports = searchRouter;
