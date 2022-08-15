/* DB actions */
/* getUser, createUser, cloneRepo.. */

const fs = require('fs/promises');
const fs2 = require('fs');
const chlid_process = require('child_process');
const axios = require('axios');
const SHA256 = require('sha256');
const groupFiles = require('../utils/group-files');
const dotenv = require('dotenv');

dotenv.config();

const github = axios.create({
    headers: {
        Authorization: process.env.API_KEY
    }
});

const createUser = async(user, accessToken) => {

    const User = {
        id: user.id,
        userName: user.name,
        access_token: SHA256(accessToken),
        organizations: await fetchGithub(user._json.organizations_url),
        projects: await fetchGithub(user._json.repos_url),
        avatarUrl: user._json.avatar_url,
        email: user._json.email,
        bio: user._json.bio
    }
    
    await fs.writeFile('./user.json', JSON.stringify(User));
}

const fetchGithub = async(url) => {
    const res = await github.get(url + '?sort=created');
    
    return res.data;
}

const getUser = async() => {
    try {
        const user = await fs.readFile('./user.json', { encoding: 'utf8' });
    
        return user;
    } catch {
        return null;
    }
}

const delUser = async() => {
    await fs.writeFile('./user.json', '');
}

const getRepos = async() => {
    try {
        const user = await getUser();
        const repos = await JSON.parse(user).projects;

        return repos;
    } catch {
        return null;
    }
}

const cloneRepo = async(url, fileName) => {
    // Move clones directory
    try {
        process.chdir('database/clones');
    } catch {}
    
    const startTime = new Date().getTime();
    
    if(!fs2.existsSync(fileName)){
        chlid_process.execSync(`git clone ${url}`);
    } 

    const repo = await github.get(`https://api.github.com/repos/kushadige/${fileName}`);
    
    if(!repo.data.message){

        const Project = {
            uid: repo.data.id,
            name: repo.data.name,
            platforms: [],
            owner: repo.data.owner.id,
            size: repo.data.size,
            duration: 0
        }

        return { Project, startTime };

    } else {
        // Github api cannot found repo
        return false;
    }
}

const analyzeRepo = async(fileName, Project, startTime) => {
    try {
        process.chdir(`database/clones/${fileName}`);
    } catch {}

    const analyzedProject = await groupFiles(fileName, Project, startTime);

    return analyzedProject;
}

const getRepo = async(repoName, res) => {
    try {
        const user = await getUser();
        const projects = await JSON.parse(user).projects;

        await projects.forEach(project => {
            if(project.name === repoName){
                res.send(JSON.stringify(project));
                return;
            }
        });

        res.sendStatus(404);

    } catch {
        return null;
    }
}


module.exports = {
    createUser,
    getUser,
    delUser,
    getRepos,
    cloneRepo,
    analyzeRepo,
    getRepo
}