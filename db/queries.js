const pool = require("./pool");


async function getRouterById(id) {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM routers WHERE id = $1",
            [id]
        );
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    } catch (error) {
        console.error("Get router by ID error:", error.message);
        throw error;
    }
}

async function getRouterColumns() {
    const result = await pool.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'routers'
        ORDER BY ordinal_position;
    `);
    return result.rows.map(r => r.column_name);
}

async function getAllRouters() {
    const { rows } = await pool.query("SELECT * FROM routers ORDER BY id");
    //   console.log("in query",rows);
    return rows;
}

async function insertRouter(router) {
    try {
        const query = `
            INSERT INTO routers (
                make, model, category, ssid, password,
                serial_number, login_type, login_link, login_id, login_password,
                mac_blocking_type, blocking_steps, ipv4_support, ipv6_support,
                ipv6_changing_steps, open, wpa, wpa2, wpa3,
                wpa_wpa2, wpa2_wpa3, wifi_4, wifi_5, wifi_6
            ) VALUES (
                $1, $2, $3, $4, $5,
                $6, $7, $8, $9, $10,
                $11, $12, $13, $14,
                $15, $16, $17, $18, $19,
                $20, $21, $22, $23, $24
            )
        `;

        const values = [
            router.make, router.model, router.category, router.ssid, router.password,
            router.serial_number, router.login_type, router.login_link, router.login_id, router.login_password,
            router.mac_blocking_type, router.blocking_steps, router.ipv4_support, router.ipv6_support,
            router.ipv6_changing_steps, router.open, router.wpa, router.wpa2, router.wpa3,
            router.wpa_wpa2, router.wpa2_wpa3, router.wifi_4, router.wifi_5, router.wifi_6
        ];

        const result = await pool.query(query, values);
        return { success: true, rowCount: result.rowCount };
    } catch (error) {
        console.error("Insert error:", error.message);
        return { success: false, error: error.message };
    }
}

async function deleteRouterById(id) {
    try {
        const result = await pool.query("DELETE FROM routers WHERE id = $1", [id]);

        if (result.rowCount === 0) {
            return { success: false, error: "No router found with the given ID." };
        }

        return { success: true, rowCount: result.rowCount };
    } catch (error) {
        console.error("❌ Delete error:", error.message);
        return { success: false, error: error.message };
    }
}

async function updateRouterById(id, router) {
    const {
        make,
        model,
        category,
        ssid,
        password,
        serial_number,
        login_type,
        login_link,
        login_id,
        login_password,
        mac_blocking_type,
        blocking_steps,
        ipv4_support,
        ipv6_support,
        ipv6_changing_steps,
        open,
        wpa,
        wpa2,
        wpa3,
        wpa_wpa2,
        wpa2_wpa3,
        wifi_4,
        wifi_5,
        wifi_6
    } = router;

    try {
        const result = await pool.query(
            `UPDATE routers SET 
                make=$1, model=$2, category=$3, ssid=$4, password=$5, 
                serial_number=$6, login_type=$7, login_link=$8, login_id=$9, login_password=$10,
                mac_blocking_type=$11, blocking_steps=$12, ipv4_support=$13, ipv6_support=$14, ipv6_changing_steps=$15,
                open=$16, wpa=$17, wpa2=$18, wpa3=$19, wpa_wpa2=$20, wpa2_wpa3=$21,
                wifi_4=$22, wifi_5=$23, wifi_6=$24
             WHERE id=$25`,
            [
                make, model, category, ssid, password,
                serial_number, login_type, login_link, login_id, login_password,
                mac_blocking_type, blocking_steps, ipv4_support, ipv6_support, ipv6_changing_steps,
                open, wpa, wpa2, wpa3, wpa_wpa2, wpa2_wpa3,
                wifi_4, wifi_5, wifi_6,
                id
            ]
        );
        return { success: true, rowCount: result.rowCount };
    } catch (error) {
        console.error("Update error:", error.message);
        return { success: false, error: error.message };
    }
}


module.exports = {
    getRouterById,
    getRouterColumns,
    getAllRouters,
    insertRouter,
    deleteRouterById,
    updateRouterById
};