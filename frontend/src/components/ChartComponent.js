import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { FaChartBar } from 'react-icons/fa';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1'];

const ChartComponent = ({ data }) => {
  const [chartType, setChartType] = useState('Bar');
  const [xKey, setXKey] = useState('');
  const [yKey, setYKey] = useState('');

  if (!data || data.length === 0) {
    return <p>No chart data available.</p>;
  }

  const keys = Object.keys(data[0]);

  // Convert y-values to numbers
  const numericData = data.map(item => ({
    ...item,
    [yKey]: Number(item[yKey])
  }));

  return (
    <div style={{ marginTop: '30px' }}>
      <h2><FaChartBar /> Chart Visualization</h2>

      {/* Dropdown selectors */}
      <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
        <label>
          Chart Type:
          <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="Bar">Bar</option>
            <option value="Line">Line</option>
            <option value="Pie">Pie</option>
          </select>
        </label>

        <label>
          X-Axis:
          <select value={xKey} onChange={(e) => setXKey(e.target.value)}>
            <option value="">-- Select --</option>
            {keys.map((key, index) => (
              <option key={index} value={key}>{key}</option>
            ))}
          </select>
        </label>

        <label>
          Y-Axis:
          <select value={yKey} onChange={(e) => setYKey(e.target.value)}>
            <option value="">-- Select --</option>
            {keys.map((key, index) => (
              <option key={index} value={key}>{key}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Chart */}
      {chartType === 'Bar' && xKey && yKey && (
        <BarChart width={800} height={300} data={numericData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={yKey} fill="#8884d8" />
        </BarChart>
      )}

      {chartType === 'Line' && xKey && yKey && (
        <LineChart width={800} height={300} data={numericData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={yKey} stroke="#82ca9d" />
        </LineChart>
      )}

      {chartType === 'Pie' && yKey && (
        <PieChart width={800} height={300}>
          <Pie
            data={numericData}
            dataKey={yKey}
            nameKey={xKey}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {numericData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
    </div>
  );
};

export default ChartComponent;
