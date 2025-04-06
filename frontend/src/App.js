import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import DataTable from './components/DataTable';
import ChartDisplay from './components/ChartDisplay';
import './styles.css';

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="container">
      <h1>📊 DataVizPro-AI</h1>
      <FileUpload setData={setData} />
      {data.length > 0 && (
        <>
          <DataTable data={data} />
          <ChartDisplay data={data} />
        </>
      )}
    </div>
  );
}

export default App;
