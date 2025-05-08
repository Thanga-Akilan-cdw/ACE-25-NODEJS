const fs = require('fs');

let color_palette = [];
const randomized_color_palette = [];


// Generate random colors 
const getRandomColors = (count) => {
     for(let i=0; i<count;i++){
          randomized_color_palette.push(color_palette[Math.floor(Math.random() * color_palette.length)]);
     }
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


const start = async () => {

     color_palette = readFile('color_ palette.json');
     
     getRandomColors(5);

     writeFile('randomied_color_palette.json',randomized_color_palette);

     const outputData = readFile('randomied_color_palette.json');

     console.log(outputData)

}

start();

