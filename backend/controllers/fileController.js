const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const ext = path.extname(file.originalname);

    let jsonArray;

    if (ext === '.csv') {
      jsonArray = await csv().fromFile(file.path);
    } else if (ext === '.json') {
      const data = fs.readFileSync(file.path, 'utf8');
      jsonArray = JSON.parse(data);
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    res.status(200).json(jsonArray);
  } catch (err) {
    console.error('Error parsing file:', err);
    res.status(500).json({ error: 'Failed to parse file' });
  }
};

module.exports = { uploadFile };
