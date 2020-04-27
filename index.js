require('dotenv').config();
const Pusher = require('pusher');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use([
    helmet(),
    cors(),
    express.urlencoded({extended: true}),
    express.json(),
    morgan('dev'),
]);

const pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.APP_KEY,
    secret: process.env.APP_SECRET,
    cluster: process.env.APP_CLUSTER,
    useTLS: true
});

app.set('PORT', process.env.PORT || 5000);

app.post('/message', (req, res) => {
    const payload = req.body;
    pusher.trigger('chat', 'message', payload);
    res.send(payload);
});

app.listen(app.get('PORT'), () => console.log(`Listening at ${app.get('PORT')}`));
