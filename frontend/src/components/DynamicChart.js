import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DynamicChart = ({ data }) => {
  const [xKey, setXKey] = useState('');
  const [yKey, setYKey] = useState('');

  const keys = data[0] ? Object.keys(data[0]) : [];

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <select onChange={(e) => setXKey(e.target.value)} className="border p-1">
          <option value="">Select X-Axis</option>
          {keys.map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
        <select onChange={(e) => setYKey(e.target.value)} className="border p-1">
          <option value="">Select Y-Axis</option>
          {keys.map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
      </div>

      {xKey && yKey && (
        <BarChart width={800} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={yKey} fill="#8884d8" />
        </BarChart>
      )}
    </div>
  );
};

export default DynamicChart;
