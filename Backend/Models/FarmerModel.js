const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const farmerSchema = new mongoose.Schema({
    name: {type: "String", required : true},
    email: {type: "String", required : true},
    password: {type: "String", required : true},
    documents: ["String"],
    location: "String",
    rating: Number,
    preferred_crop: ["String"],
    land_availability_status: Boolean,
    size_of_land_available: Number
}, { timestamps: true });


farmerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  farmerSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  
const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;



