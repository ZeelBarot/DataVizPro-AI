import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ChartDisplay = ({ data }) => {
  const keys = Object.keys(data[0]);
  const [xKey, setXKey] = useState(keys[0]);
  const [yKey, setYKey] = useState(keys[1]);
  const [chartType, setChartType] = useState('Bar');

  const exportPDF = () => {
    html2canvas(document.querySelector('#chartArea')).then((canvas) => {
      const pdf = new jsPDF();
      const img = canvas.toDataURL('image/png');
      pdf.addImage(img, 'PNG', 10, 10, 180, 100);
      pdf.save('chart.pdf');
    });
  };

  return (
    <div>
      <div className="controls">
        <select onChange={(e) => setChartType(e.target.value)}>
          <option>Bar</option>
          <option>Line</option>
          <option>Pie</option>
        </select>
        <select onChange={(e) => setXKey(e.target.value)} value={xKey}>
          {keys.map(k => <option key={k}>{k}</option>)}
        </select>
        <select onChange={(e) => setYKey(e.target.value)} value={yKey}>
          {keys.map(k => <option key={k}>{k}</option>)}
        </select>
        <button onClick={exportPDF}>Export to PDF</button>
      </div>

      <div id="chartArea" style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          {chartType === 'Bar' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={yKey} fill="#8884d8" />
            </BarChart>
          ) : chartType === 'Line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={yKey} stroke="#82ca9d" />
            </LineChart>
          ) : (
            <PieChart>
              <Pie data={data} dataKey={yKey} nameKey={xKey} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658'][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartDisplay;
