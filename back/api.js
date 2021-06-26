const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const Inicio = require('./endpoints');

app.set('port', process.env.PORT || '3000');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Set-Cookie", "HttpOnly;Secure;SameSite=None");
    next();
});

app.use(Inicio);

app.listen(app.get('port'), ()=>{
    console.log('Servidor on port ', app.get('port'));
});
