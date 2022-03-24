import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initRoutes from "./routes/web"
import connectDB from './config/connectDB'
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5001;

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.urlencoded({extended: false}))
// app.use(express.json())

viewEngine(app);
initRoutes(app)

connectDB()

app.listen(port,() => {
    console.log(`Server is listening on port ${port}`);
})

