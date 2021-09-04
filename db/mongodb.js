const mongoose = require("mongoose");
// sociality-test-db

mongoose.connect("mongodb://mongo/sociality-test-db",{
   autoCreate:true
})