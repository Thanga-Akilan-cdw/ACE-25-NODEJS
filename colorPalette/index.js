const fs = require('fs').promises; 

// Generate random colors 
const getRandomColors = (count, color_palette) => {
    const randomized_color_palette = [];
    for (let i = 0; i < count; i++) {
        randomized_color_palette.push(
            color_palette[Math.floor(Math.random() * color_palette.length)]
        );
    }
    return randomized_color_palette;
}

// Read file
const readFile = async (fileName) => {
    try {
        const fileData = await fs.readFile(fileName, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.log("Error reading file:", error);
        return [];
    }
}

// Write file
const writeFile = async (filename, data) => {
    try {
        await fs.writeFile(filename, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log("Error writing file:", error);
    }
}

// Display color array 
const display = (outputData) => {
    for (const [index, color] of outputData.entries()) {
        console.log(`${index + 1}. ${color.id} - ${color.color} -- ${color.code.hex}`);
    }
}

const start = async () => {
    const color_palette = await readFile('color_ palette.json');

    const randomColors = getRandomColors(5, color_palette);

    await writeFile('randomized_color_palette.json', randomColors); 

    const outputData = await readFile('randomized_color_palette.json'); 

    console.log(outputData);

    // display(outputData);
}

start();
