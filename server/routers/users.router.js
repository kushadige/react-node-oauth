const express = require('express');
const passport = require('passport');
const dbActions = require('../services/db.actions');
require('../services/passport.github');
//const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/access/github', 
    passport.authenticate('github', { 
        scope: ['user', 'repo'],
        successRedirect: 'http://localhost:3000/profile',
        failureRedirect: 'http://localhost:3000/auth/failure' 
    })
);

router.get('/user', async(req, res) => {
    const user = await dbActions.getUser();

    if(user && user !== ''){
        const json = await JSON.parse(user);

        res.status(200).json(json);
    }
});

router.get('/projects', async(req, res) => {
    const repos = await dbActions.getRepos();

    if(repos) {
        res.status(200).json(repos);
    } else {
        res.sendStatus(404);
    }
});

router.get('/logout', async (req, res) => {
    await dbActions.delUser();

    req.session.destroy((err) => {
        if(err) {
            console.log(err);
            return res.json({message: false});
        }

        res.clearCookie('connect.sid');
        return res.status(201).json({message: true});
    });
});

router.post('/analyze', async(req, res) => {
    const url = req.body.url;
    const fileName = url.substring(url.lastIndexOf('/')+1, url.lastIndexOf('.'));

    const response = await dbActions.cloneRepo(url, fileName);

    if(response){

        const analyzed = await dbActions.analyzeRepo(fileName, response.Project, response.startTime);
        
        if(analyzed) {
            res.json(analyzed);
        } else {
            res.json({message: 'Something went wrong'});
        }
    } else {
        res.json({message: 'Something went wrong'});
    }
});

router.get('/project/:name', async(req, res) => {
    const repoName = req.params.name;

    await dbActions.getRepo(repoName, res);
});


module.exports = router;