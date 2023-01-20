const express = require('express');
const userRouter=require('./routes/user.js')
const mongoose=require('mongoose')
const dotenv=require("dotenv")
const cors=require("cors")
const bodyParser=require("body-parser")


const app = express();
// const io = new Server(server, {
//     cors: {
//         origin: ['http://localhost:3000'],
//     },
// });
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());        
        app.use("/api/user", userRouter);

        mongoose.set("strictQuery", false);
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('Hello! This is oktobenotok backend, listening on port - ',
    PORT)))
    .catch((error) => console.log(`${error} did not connect`));
