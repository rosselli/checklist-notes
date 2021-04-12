const express = require('express');
const routes  = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(routes);
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(4006, () => console.log('Listening on 4006'));

