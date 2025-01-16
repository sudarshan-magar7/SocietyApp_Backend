const express = require("express");
const {SuperAdminLogin} = require("../controllers/society-app");
const {adminCreate}=require('../controllers/admin-create');
const router = express.Router();
router.post("/super/login",SuperAdminLogin);
router.post('/admin/create',adminCreate);
module.exports = router;
