import React from 'react';

const DataTable = ({ data }) => {
  if (!data || data.length === 0) return <p>No data to display.</p>;

  const headers = Object.keys(data[0]);

  return (
    <table border="1" style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
      <thead>
        <tr>
          {headers.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {headers.map((key) => (
              <td key={key}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
