
const { Router } = require("express");
const { getAllRouters, getRouterColumns } = require('../db/queries.js');
const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
    try {
        const routers_data = await getAllRouters();
        const columns_data = await getRouterColumns();
        // console.trace();
        // console.table(routers_data);
        res.render("index", { routers: routers_data, columns: columns_data });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = indexRouter;