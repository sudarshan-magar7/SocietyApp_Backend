const express = require("express");
const {SuperAdminLogin} = require("../controllers/society-app");
const {adminCreate}=require('../controllers/admin-create');
const getAllAdmin = require("../controllers/getAllAdmin");
const fetchuser=require('../middleware/super-admin-middleware')
const adminDisable=require('../controllers/adminDisable');
const adminLogin=require('../controllers/adminLogin')
const router = express.Router();



router.post("/superadmin/login",SuperAdminLogin);
router.post('/admin/create',adminCreate);
router.put('/admin/disable',adminDisable);
router.get('/allAdmin',fetchuser,getAllAdmin);
router.post('/admin/login',adminLogin);


module.exports = router;
