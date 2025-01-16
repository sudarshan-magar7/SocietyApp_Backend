const mysql=require("mysql2/promise");

const mySqlPool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'MyStrongPassword123!',
    database:'society_app'
})
module.exports=mySqlPool;