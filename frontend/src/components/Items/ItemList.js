import React, { useState, useEffect } from 'react';
import apiService from '../../services/api'; // Import API service
import ItemCard from './ItemCard';

// Nhận props là "searchQuery" từ trang ShopPage (nếu có)
function ItemList({ searchQuery }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        // Gọi API getItems với query (nếu có)
        const response = await apiService.getItems(searchQuery || '');
        setItems(response.data);
      } catch (err) {
        setError('Failed to fetch items. Please try again later.');
        console.error(err);
      }
      setLoading(false);
    };

    fetchItems();
  }, [searchQuery]); // Chạy lại khi searchQuery thay đổi

  if (loading) {
    return <div className="text-center py-5">Loading items...</div>;
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

  if (items.length === 0) {
    return <div className="text-center py-5">No items found.</div>;
  }

  return (
    <div className="row g-4">
      {items.map(item => (
        // Dùng ItemCard để render
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}

export default ItemList;