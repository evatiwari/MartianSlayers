const express = require('express');
const app= express();
const http= require('http');

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', (req,res,next)=>{
    res.render('home');
});

app.listen(3000, () => console.log('Listening on port 3000'));