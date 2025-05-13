const http = require('http');
const fs = require('fs').promises;

// Generate Random color Palette
const generateRandomColors = async (count) => {
    try {
        const data = await fs.readFile('color_palette.json', 'utf8');
        const color_palette = JSON.parse(data);
        const randomized_color_palette = [];

        for (let i = 0; i < count; i++) {
            randomized_color_palette.push(
                color_palette[Math.floor(Math.random() * color_palette.length)]
            );
        }

        return JSON.stringify(randomized_color_palette);
    } catch (err) {
        console.error('Error reading file:', err);
        return JSON.stringify([]); 
    }
};

// Http server to serve the request
const server = http.createServer(async (req, res) => {
    const colors = await generateRandomColors(5);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(colors);
});

// Server listening at port 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
