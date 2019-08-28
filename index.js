const express = require('express');
const request = require('request');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use((err, req, res, next) => {
    console.log('err', err);
    res.status(500).json({
        type: 'error',
        message: err.message
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});