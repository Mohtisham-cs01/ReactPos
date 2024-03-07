
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/itemPage.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ itemId: null, itemDesc: '', itemCost: '' });
  const [editItemId, setEditItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://localhost:44334/api/items/')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => console.error('Error fetching items:', error));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    axios.post('https://localhost:44334/api/items/', { ...formData, itemId: 0 })
      .then(response => {
        console.log('Item added:', response);
        setFormData({ itemId: null, itemDesc: '', itemCost: '' });
        fetchData();
      })
      .catch(error => console.error('Error adding item:', error));
  };

  const handleEditItem = (itemId) => {
    const selectedItem = items.find(item => item.itemId === itemId);
    setFormData({ itemId: selectedItem.itemId, itemDesc: selectedItem.itemDesc, itemCost: selectedItem.itemCost });
    setEditItemId(itemId);
  };

  const handleUpdateItem = () => {
    axios.put(`https://localhost:44334/api/items/${editItemId}`, formData)
      .then(response => {
        console.log('Item updated:', response);
        setFormData({ itemId: null, itemDesc: '', itemCost: '' });
        setEditItemId(null);
        fetchData();
      })
      .catch(error => console.error('Error updating item:', error));
  };

  const handleDeleteItem = (itemId) => {
    axios.delete(`https://localhost:44334/api/items/${itemId}`)
      .then(response => {
        console.log('Item deleted:', response);
        fetchData();
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  const filteredItems = items.filter(item =>
    item.itemDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h2>Item List</h2>
        <input
          type="text"
          placeholder="Search by Description"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.itemId}>
              <td>{item.itemId}</td>
              <td>{item.itemDesc}</td>
              <td>${item.itemCost}</td>
              <td>
                <button className='mr-2 btn-primary' onClick={() => handleEditItem(item.itemId)}>Edit</button>
                <button className='btn-danger' onClick={() => handleDeleteItem(item.itemId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-container">
        <input
          type="text"
          placeholder="Description"
          name="itemDesc"
          value={formData.itemDesc}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Cost"
          name="itemCost"
          value={formData.itemCost}
          onChange={handleInputChange}
        />
        {editItemId ? (
          <button onClick={handleUpdateItem}>Update Item</button>
        ) : (
          <button onClick={handleAddItem}>Add Item</button>
        )}
      </div>
    </div>
  );
};

export default ItemList;
