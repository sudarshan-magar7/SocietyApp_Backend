const db = require('../../config/db');
const fetchuser=require('../../middleware/super-admin-middleware')
const getAllAdmin=async(req,res)=>{
    
    try{
        const [allAdmin]=await db.query(
            'SELECT * FROM admin'
            
        )
        
        res.status(200).send({
            success:true,
            Data:allAdmin,
        })
    }catch(error){
        res.status(500).send({
            success:false,
            msg:'Server Problem.',
            error:error
        })
    }
    
}

module.exports=getAllAdmin;