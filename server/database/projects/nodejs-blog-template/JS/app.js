const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

const data = require(__dirname + '/data.js');
const posts = data.posts;

app.get('/', (req, res) => {
    res.render('home', {...data.pages[0], posts});
});

app.get('/about', (req, res) => {
    res.render('about', data.pages[1]);
});

app.get('/contact', (req, res) => {
    res.render('contact', data.pages[2]);
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/compose', (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content
    };
    
    data.posts.push(post);

    res.redirect('/');
});

app.get('/posts/:title/', (req, res) => {

    const titleParam = _.lowerCase(req.params.title);

    posts.forEach(post => {

        if(post.title.toLowerCase() === titleParam){
            
            res.render('post', post);
            res.redirect('/posts/' + titleParam);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});