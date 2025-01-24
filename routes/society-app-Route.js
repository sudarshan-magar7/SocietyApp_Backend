const express = require("express");
const {SuperAdminLogin} = require("../controllers/superadmin/society-app");
const {adminCreate}=require('../controllers/admin/admin-create');
const getAllAdmin = require("../controllers/superadmin/getAllAdmin");
const fetchuser=require('../middleware/super-admin-middleware')
const adminDisable=require('../controllers/superadmin/adminDisable');
const adminLogin=require('../controllers/admin/adminLogin')
const societyRegister=require('../controllers/admin/society-register')
const CreateNotice=require('../controllers/admin/notice')
const residentRegister=require('../controllers/admin/resident');
const router = express.Router();

//SuperAdmin

router.post("/superadmin/login",SuperAdminLogin);
router.get('/allAdmin',fetchuser,getAllAdmin);
router.put('/admin/disable',adminDisable);

//Admin

router.post('/admin/create',adminCreate);
router.post('/admin/login',adminLogin);
router.post('/admin/notice',fetchuser,CreateNotice);
router.post('/admin/society',fetchuser,societyRegister)
router.post('/admin/resident/register',fetchuser,residentRegister);


module.exports = router;
