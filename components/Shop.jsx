// src/components/ItemsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    const enteredCustomerId = prompt('Enter Customer ID:');
    if (enteredCustomerId) {
      setCustomerId(parseInt(enteredCustomerId, 10));
      fetchData();
    } else {
      // Handle when the user cancels entering the customerId
      alert('Customer ID is required.');
    }
  }, []);

  const fetchData = () => {
    axios.get('https://localhost:44334/api/items/')
      .then(response => {
        setItems(response.data.map(item => ({ ...item, added: false })));
      })
      .catch(error => console.error('Error fetching items:', error));
  };

  const handleAddItem = (itemId) => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.itemId === itemId) {
          return { ...item, added: !item.added };
        }
        return item;
      });
    });
  };

  const handleSubmit = () => {
    const selectedItems = items.filter(item => item.added);
    const itemIds = selectedItems.map(item => item.itemId);

    const data = {
      customerId: customerId,
      itemIds: itemIds,
    };

    if (customerId && itemIds.length > 0) {
      axios.post('https://localhost:44334/api/sales/', data)
        .then(response => {
          console.log('Items submitted:', response);
          alert('Items submitted successfully!');
        })
        .catch(error => console.error('Error submitting items:', error));
    } else {
      alert('Please select at least one item.');
    }
  };

  return (
    <div className='container'>
      <h2>Item List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.itemId}>
              <td>{item.itemId}</td>
              <td>{item.itemDesc}</td>
              <td>${item.itemCost}</td>
              <td>
                {item.added ? (
                  <span>Added</span>
                ) : (
                  <button onClick={() => handleAddItem(item.itemId)}>Add</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Shop;
