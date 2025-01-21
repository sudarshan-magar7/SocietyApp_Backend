const express = require("express");
const {SuperAdminLogin} = require("../controllers/superadmin/society-app");
const {adminCreate}=require('../controllers/admin/admin-create');
const getAllAdmin = require("../controllers/superadmin/getAllAdmin");
const fetchuser=require('../middleware/super-admin-middleware')
const adminDisable=require('../controllers/superadmin/adminDisable');
const adminLogin=require('../controllers/admin/adminLogin')
const societyRegister=require('../controllers/admin/society-register')
const router = express.Router();



router.post("/superadmin/login",SuperAdminLogin);
router.post('/admin/create',adminCreate);
router.put('/admin/disable',adminDisable);
router.get('/allAdmin',fetchuser,getAllAdmin);
router.post('/admin/login',adminLogin);


router.post('/admin/society',fetchuser,societyRegister)


module.exports = router;
