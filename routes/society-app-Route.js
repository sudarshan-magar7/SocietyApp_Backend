const express = require("express");
const {SuperAdminLogin} = require("../controllers/society-app");
const {adminCreate}=require('../controllers/admin-create');
const getAllAdmin = require("../controllers/getAllAdmin");
const fetchuser=require('../middleware/super-admin-middleware')
const adminDisable=require('../controllers/adminDisable')
const router = express.Router();



router.post("/super/login",SuperAdminLogin);
router.post('/admin/create',adminCreate);
router.put('/admin/disable',adminDisable);
router.get('/allAdmin',fetchuser,getAllAdmin);


module.exports = router;
