const mongoose = require("mongoose");
// sociality-test-db

mongoose.connect("mongodb://127.0.0.1:27017/sociality-test-db",{
   autoCreate:true
})