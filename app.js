const express = require('express');
const ejs = require('ejs');
const app = express();
app.use(express.static('video'));
app.use(express.static('static'))
