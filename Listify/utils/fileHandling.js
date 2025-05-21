import fs from "fs/promises";


export const readDataFromFile = async (fileName) => {
    const rawData = await fs.readFile(`./data/${fileName}.json`);
    const users = JSON.parse(rawData);
    return users;
}


export const writeDataToFile = async (fileName, data) => {
    const stringifiedData = JSON.stringify(data);
    await fs.writeFile(`./data/${fileName}.json`, stringifiedData);
}

