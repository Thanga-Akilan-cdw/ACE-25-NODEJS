const http = require('http');
const fs = require('fs');
const colorPalette = require('./color_palette.json')

// Generate Random color Palette
const generateRandomColors = (count) => {
    let color_palette = [];
    const randomized_color_palette = [];

    color_palette = JSON.parse( fs.readFileSync('color_palette.json' , (err)=>{
        console.log(err);  }));

    for(let i=0; i<count;i++){
        randomized_color_palette.push(color_palette[Math.floor(Math.random() * color_palette.length)]);
    }
    return JSON.stringify(randomized_color_palette);
}

// Http server to serve the request
const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(generateRandomColors(5));
});

// Server listening at port 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});