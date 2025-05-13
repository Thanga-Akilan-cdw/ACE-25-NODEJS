import { writeFile, readFile, appendFile } from 'fs/promises';


async function readFileData(fileName){
    try {
        const fileData = await readFile(fileName);
        return JSON.parse(fileData);
    }
    catch(error){
        console.log("Error reading file : ",error);
        return [];
    }
}

async function writeToFile(fileName, data){
    try{
        await writeFile(fileName,JSON.stringify(data));
    }
    catch(error){
        console.log("Error writing file : ",error)
    }
}

async function appendToFile(fileName, data){
    try{
       const unParsed = await readFile(fileName);
       const buddies = JSON.parse(unParsed);
       buddies.push(data);
       await writeFile(fileName, JSON.stringify(buddies))
    }
    catch(error){
        console.log("Error Appending file : ",error)
    }

}




export {
    readFileData,
    writeToFile,
    appendToFile
}

