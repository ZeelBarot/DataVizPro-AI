const csv = require('csvtojson');
const fs = require('fs');

exports.handleFileUpload = async (req, res) => {
  try {
    const file = req.file;
    const ext = file.originalname.split('.').pop();

    let jsonArray = [];

    if (ext === 'csv') {
      jsonArray = await csv().fromFile(file.path);
    } else if (ext === 'json') {
      const data = fs.readFileSync(file.path, 'utf8');
      jsonArray = JSON.parse(data);
    }

    res.status(200).json(jsonArray);
  } catch (error) {
    res.status(500).json({ message: "Error processing file", error });
  }
};
