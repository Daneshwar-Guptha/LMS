const express = require('express')
const mongoose = require('mongoose');
const uri = "mongodb+srv://dbUser:dbUser@guptacluster.terlemf.mongodb.net/LMS?retryWrites=true&w=majority&appName=GuptaCluster";

const DBConnection = async() => {
    await mongoose.connect(uri)
        .then(() => {
            console.log("DBConnection was successful")
        })
        .catch(error => {
            console.log("DB was not connected");
        })

}
module.exports = DBConnection;