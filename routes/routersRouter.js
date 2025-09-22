
const { Router } = require("express");
const { insertRouter, deleteRouterById, updateRouterById } = require("../db/queries.js");
const routersRouter = Router();



// Helper function to normalize boolean fields from req.body
function normalizeBooleanFields(body) {
    const booleanFields = [
        'ipv4_support', 'ipv6_support', 'open', 'wpa', 'wpa2', 'wpa3',
        'wpa_wpa2', 'wpa2_wpa3', 'wifi_4', 'wifi_5', 'wifi_6'
    ];
    // console.log(body);
    booleanFields.forEach(field => {
        // If the field is present and "on" (from checkbox), set true else false
        body[field] = Boolean(body[field]);
    });

    return body;
}




routersRouter.post("/add", async (req, res) => {
    const normalizedBody = normalizeBooleanFields(req.body);
    let insertStatus = await insertRouter(normalizedBody);
    console.log("insert status:", insertStatus);
    res.redirect("/");
});

routersRouter.post("/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);

    // Validate ID
    if (isNaN(id)) {
        return res.status(400).send("Invalid router ID");
    }

    try {
        const deleteStatus = await deleteRouterById(id);
        console.log("Delete status:", deleteStatus);

        if (deleteStatus.success && deleteStatus.rowCount > 0) {
            res.redirect("/");
        } else {
            res.status(404).send("Router not found or already deleted.");
        }
    } catch (err) {
        console.error("Delete route error:", err);
        res.status(500).send("Error deleting router: " + err.message);
    }
});

routersRouter.post("/update/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).send("Invalid router ID");
    }
    const data = req.body;
    const normalizedBody = normalizeBooleanFields(req.body);
    // console.log(req.body);
    try {
        const normalizedBody = normalizeBooleanFields(data);
        const updateStatus = await updateRouterById(id, normalizedBody);
        console.log("Update status:", updateStatus);

        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Update failed:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});
// routersRouter.use("/", (req, res) => {});

module.exports = routersRouter;
