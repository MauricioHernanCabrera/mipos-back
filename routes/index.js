const express = require("express");
const router = express();

const controller = require("./../controller");

router.get("/balance", controller.balance);
router.post("/balance/open/day", controller.balanceOpenDay);
router.get("/has/open/cashier/balance", controller.hasOpenCashierBalance);
router.post("/cashier/balance/close/day", controller.cashierBalanceCloseDay);
router.post("/context/clean", controller.cleanContext);

module.exports = router;
