// src/components/SalesPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/salespage.css'; // Import your custom CSS file

const SalesPage = () => {
    const [salesData, setSalesData] = useState([
      {
        salesMaster: {
          invoiceId: 15,
          customerId: 1,
          invoiceDate: '2024-03-06T20:44:46.4264672',
          invoiceAmount: 69.98,
        },
        salesDetails: [
          { salesDetailsId: 1, invoiceId: 15, item: '4', cost: 39.99 },
          { salesDetailsId: 2, invoiceId: 15, item: '3', cost: 29.99 },
        ],
      },
      {
        salesMaster: {
          invoiceId: 16,
          customerId: 2,
          invoiceDate: '2024-03-06T20:44:46.4264672',
          invoiceAmount: 69.98,
        },
        salesDetails: [
          { salesDetailsId: 1, invoiceId: 16, item: '5', cost: 39.99 },
          { salesDetailsId: 2, invoiceId: 16, item: '6', cost: 29.99 },
        ],
      },
      // Add more sales data as needed
    ]);

    useEffect( () => {
        axios.get('https://localhost:44334/api/Sales/GetAllSalesInfo').then(
            res => {
                setSalesData(res.data)
            }
        ).catch(error => console.error('Error fetching sales:', error))
    } 
    , []);

   

  
    const [selectedSales, setSelectedSales] = useState(null);
  
    const handleToggleDetails = (salesMaster) => {
      setSelectedSales(selectedSales === salesMaster ? null : salesMaster);
    };
  
    return (
      <div className="sales-page">
        <table className="table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Customer ID</th>
              <th>Invoice Date</th>
              <th>Invoice Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((data, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{data.salesMaster.invoiceId}</td>
                  <td>{data.salesMaster.customerId}</td>
                  <td>{new Date(data.salesMaster.invoiceDate).toLocaleString()}</td>
                  <td>{data.salesMaster.invoiceAmount}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleToggleDetails(data.salesMaster)}
                    >
                      {selectedSales === data.salesMaster ? 'Hide Details' : 'Show Details'}
                    </button>
                  </td>
                </tr>
                {selectedSales === data.salesMaster && (
                  <tr>
                    <td colSpan="5">
                      <table className="table table-details">
                        <thead>
                          <tr>
                            <th>Details ID</th>
                            <th>Invoice ID</th>
                            <th>Item</th>
                            <th>Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.salesDetails.map((detail, idx) => (
                            <tr key={idx}>
                              <td>{detail.salesDetailsId}</td>
                              <td>{detail.invoiceId}</td>
                              <td>{detail.item}</td>
                              <td>{detail.cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default SalesPage;