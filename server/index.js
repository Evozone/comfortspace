const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

const userRouter = require('./routes/user.js');
const blogsRouter = require('./routes/blog.js');

const app = express();

const PORT = process.env.PORT || 5000;

const uploadMiddleware = multer({ dest: 'blogMedia/' });

dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/api/user', userRouter);
app.use('/api/blog', blogsRouter);

app.get('/', (req, res) => {
    res.send('Hello to Oktobenotok API');
});

mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () =>
            console.log(
                'Hello! This is oktobenotok backend, listening on port - ',
                PORT
            )
        )
    )
    .catch((error) => console.log(`${error} did not connect`));
