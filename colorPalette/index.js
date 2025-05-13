const fs = require('fs');

let color_palette = [];


// Generate random colors 
const getRandomColors = (count) => {
     const randomized_color_palette = [];
     for(let i=0; i<count;i++){
          randomized_color_palette.push(color_palette[Math.floor(Math.random() * color_palette.length)]);
     }
     return randomized_color_palette;
}


// read file 
const readFile = (fileName)=> {
     return (JSON.parse( fs.readFileSync(fileName , (err)=>{
          console.log(err);
     })));
}

//write file
const writeFile = (filename, data) => {
     fs.writeFileSync( filename, JSON.stringify(data));
}

//Display Color array

const display = (outputData) => {
     for(const [index ,color] of outputData.entries()){
          console.log(`${index+1} . ${color.id} - ${color.color} -- ${color.code.hex}`)
     }
}



const start = () => {

     color_palette = readFile('color_ palette.json');
     
     const randomColors = getRandomColors(5);

     writeFile('randomied_color_palette.json', randomColors);

     const outputData = readFile('randomied_color_palette.json');

     display(outputData);

}

start();

