const express = require('express');
const app = express();
const DBConnection = require('./config/DBConnection');
const User = require('./model/User');
const UserRoutes = require('./Routes/UserRoutes')

app.use(express.json());
app.use('/user',UserRoutes)


DBConnection()
.then(()=>{
    app.listen(2000,()=>{
    console.log("server was started")
})

})
.catch(error=>{
    console.log(error)
})
