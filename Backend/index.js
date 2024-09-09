const express = require("express");
const dotenv = require("dotenv");
const farmerRoutes = require('./routes/farmerRoutes')
const connectDB = require("./config/db");
const app = express();


dotenv.config();
connectDB();

app.use(express.json());


app.get("/", (req, res)=> {
    res.json({
        msg : "welcome to our server"
    })
})


app.use('/api/v1/farmer', farmerRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}...`);
  });