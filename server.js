const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('.'));

// Endpoint to list images in a folder
app.get('/list-images', async (req, res) => {
    try {
        const folder = req.query.folder;
        const folderPath = path.join(__dirname, 'assets', 'imgs', folder);
        
        // Read directory contents
        const files = await fs.readdir(folderPath);
        
        // Filter only image files
        const imageFiles = files.filter(file => 
            file.toLowerCase().endsWith('.jpg') || 
            file.toLowerCase().endsWith('.jpeg') || 
            file.toLowerCase().endsWith('.png') ||
            file.toLowerCase().endsWith('.gif')
        );

        // Sort files to ensure consistent order
        imageFiles.sort();
        
        res.json(imageFiles);
    } catch (error) {
        console.error('Error reading directory:', error);
        res.status(500).json({ error: 'Error reading directory' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 