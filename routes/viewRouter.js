const { Router } = require("express");
const { getRouterById } = require("../public/db/queries.js");

const viewRouter = Router();

viewRouter.get("/api/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid router ID" });
    }

    try {
        const router = await getRouterById(id);
        if (!router) {
            return res.status(404).json({ error: "Router not found" });
        }
        res.json(router);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = viewRouter;
