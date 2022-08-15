const fileTraversal = require('file-traversal');

//Get extensions from specified directory
const getExtensions = async(directory) => {

    const filePaths = fileTraversal.depth_1st(directory);

    const fileExtensions = filePaths.reduce((acc, curr) => {
        
        const fileName = curr.substring(curr.lastIndexOf('\\') + 1, curr.length);

        if(fileName.indexOf('.') !== -1){
            const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);

            if(!acc[fileExtension])
                acc[fileExtension] = {count: 1}
            else {
                acc[fileExtension].count++;
            }
        } 

        return acc;

    }, {});

    return fileExtensions;
}


module.exports = getExtensions;