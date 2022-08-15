const getExtensions = require('./file-extensions');
const { searchFiles } = require('find-file-extension');
const fs = require('fs');

//Grouping files via extensions recursively

const groupFiles = async(fileName, Project, startTime) => {

    const FROM = `${fileName}`;
    const TO = `../projects/${fileName}/`;

    const platforms = await getExtensions(fileName);
    const fileExtensions = Object.keys(platforms);

    Project.platforms = platforms;

    //Create directories
    if(!fs.existsSync(TO)){
        fs.mkdirSync(TO);
    }
    fileExtensions.forEach((extension) => {

        try {
            if(!fs.existsSync(TO + extension.toUpperCase())){
                fs.mkdirSync(TO + extension.toUpperCase());
            }
        } catch(err) {
            console.log(err);
        }
        
    });

    //Write files to their own folder
    fileExtensions.forEach(extension => {

        const filePaths = searchFiles(extension, FROM);

        filePaths.forEach(path => {

            const fileName = path.substring(path.lastIndexOf('\\') + 1, path.length);

            fs.readFile(path, 'utf8', (err, data) => {
                if(err){
                    console.log(err);
                    return;
                }

                fs.writeFile(`${TO}/${extension.toUpperCase()}/${fileName}`, data, (err) => {
                    console.log(err);
                });
            });

        });
    });

    const endTime = new Date().getTime();
    Project.duration = endTime - startTime;

    return Project;

}

module.exports = groupFiles;