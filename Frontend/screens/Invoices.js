import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [invoices, setInvoices] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:3004/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(`Invoice uploaded: ${JSON.stringify(response.data)}`);
      fetchInvoices();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:3004/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div>
      <h1>Invoice Recognition</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <div>
        <h2>Invoices</h2>
        <ul>
          {invoices.map((invoice) => (
            <li key={invoice.id}>
              {invoice.customer_name} - {invoice.date} - ${invoice.amount} - {invoice.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
