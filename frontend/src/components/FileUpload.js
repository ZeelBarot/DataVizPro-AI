import React, { useState } from 'react';
import axios from 'axios';
import DataTable from './DataTable';
import Chart from './Chart'; // ⬅️ Import

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('No file selected');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData);
      setTableData(response.data);
    } catch (err) {
      alert('Upload failed');
      console.error(err);
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">📊 DataVizPro-AI</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <DataTable data={tableData} />
      <Chart data={tableData} /> {/* ⬅️ Add chart below table */}
    </div>
  );
};

export default FileUpload;
