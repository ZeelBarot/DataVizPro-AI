const csv = require('csvtojson');
const path = require('path');

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '../uploads/', file.filename);

    const jsonArray = await csv().fromFile(filePath); // Convert CSV to JSON
    res.status(200).json(jsonArray); // ✅ Send parsed JSON data to frontend
  } catch (error) {
    console.error('Error in uploadFile:', error);
    res.status(500).json({ error: 'Server error while parsing file' });
  }
};

module.exports = { uploadFile };
