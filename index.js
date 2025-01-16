const express = require('express');
const mySqlPool = require('./config/db');
const app = express();
const PORT = 8080;
app.use(express.json());


app.use('/api/v1',require("./routes/society-app-Route"));





app.get("/test", (req, res) => {
    res.status(200).send("<h1>node</h1>");
});  



mySqlPool.query("SELECT 1").then(()=>{
    console.log(`Mysql DB Connection Succesfully.`)

    app.listen(PORT, () => {
        console.log(`Server Running On Port ${PORT}`);
    });
    
}).catch((e)=>{
    console.log(e)
})

