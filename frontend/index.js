const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');


require('dotenv').config();


const loginRoute = require('./routes/auth/login');
const logoutRoute = require('./routes/auth/logout');
const meRoute = require('./routes/auth/me');
const registerRoute = require('./routes/auth/register');
const verifyRoute = require('./routes/auth/verify');
const commentRoute = require('./routes/auth/comment');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5000',
        'http://127.0.0.1:5000',
    ],
    credentials: true,
}));

app.options(commentRoute,cors());

app.use(loginRoute, cors());
app.use(logoutRoute);
app.use(registerRoute);
app.use(meRoute);
app.use(verifyRoute);
app.use(commentRoute);

app.use(express.static('client/build'));

app.get('*', (req, res) => {
    const myPath = path.resolve(__dirname, 'client', 'build', 'index.html');
    return res.sendFile(myPath);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));