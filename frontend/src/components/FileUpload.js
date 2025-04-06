import React from 'react';
import axios from 'axios';

const FileUpload = ({ setData }) => {
  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    const res = await axios.post('http://localhost:5000/api/files/upload', formData);
    setData(res.data);
  };

  return (
    <div>
      <input type="file" accept=".csv,.json" onChange={handleUpload} />
    </div>
  );
};

export default FileUpload;
