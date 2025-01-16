const express = require("express");
const {SuperAdminLogin} = require("../controllers/society-app");
const {adminCreate}=require('../controllers/admin-create');
const getAllAdmin = require("../controllers/getAllAdmin");
const router = express.Router();
router.post("/super/login",SuperAdminLogin);
router.post('/admin/create',adminCreate);
router.get('/allAdmin',getAllAdmin);
module.exports = router;
