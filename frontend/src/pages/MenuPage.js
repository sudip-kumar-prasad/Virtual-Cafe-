import React, { useState, useEffect } from 'react';
import MenuItem from '../components/MenuItem';
import apiService from '../services/api'; // Import our API service

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [foodFilter, setFoodFilter] = useState('all');

  // Fetch menu items from the backend when the page loads
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await apiService.getMenuItems();
        // The API returns { success: true, count: ..., data: [...] } if following standard
        // Or just array. Let's assume response.data.data based on typical structure, or response.data if direct array.
        // Looking at api.js (Step 118) -> getMenuItems: () => fetch(...).then(res => res.json())
        // Looking at menuController.js (Step 116) -> res.json({ success: true, count: ..., data: menuItems })
        setMenuItems(response.data || []);
      } catch (err) {
        console.error("Failed to load menu:", err);
        setError("Failed to load menu items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'coffee', name: 'Coffee' },
    { id: 'tea', name: 'Tea' },
    { id: 'pastry', name: 'Pastries' },
    { id: 'food', name: 'Food' }
  ];

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => {
      if (activeCategory === 'food') {
        if (foodFilter === 'veg') {
          return item.category === 'food' && item.isVegetarian;
        } else if (foodFilter === 'non-veg') {
          return item.category === 'food' && !item.isVegetarian;
        }
      }
      return item.category === activeCategory;
    });

  if (loading) return <div className="text-center section"><p>Loading menu...</p></div>;
  if (error) return <div className="text-center section"><p className="error-text">{error}</p></div>;

  return (
    <div className="section" style={{ paddingBottom: 'var(--spacing-xxl)' }}>
      <div className="container">
        <h1 className="section-title">Our Menu</h1>

        {/* Category Filter */}
        <div className="flex-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
          <div className="category-filter" style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--spacing-sm)'
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                className={`btn ${activeCategory === category.id ? '' : 'btn-secondary'}`}
                onClick={() => {
                  setActiveCategory(category.id);
                  setFoodFilter('all');
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Food Category Filter */}
        {activeCategory === 'food' && (
          <div className="flex-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <div className="food-filter" style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'var(--spacing-sm)'
            }}>
              <button
                className={`btn ${foodFilter === 'all' ? '' : 'btn-secondary'}`}
                onClick={() => setFoodFilter('all')}
              >
                All Food
              </button>
              <button
                className={`btn ${foodFilter === 'veg' ? '' : 'btn-secondary'}`}
                onClick={() => setFoodFilter('veg')}
              >
                Vegetarian
              </button>
              <button
                className={`btn ${foodFilter === 'non-veg' ? '' : 'btn-secondary'}`}
                onClick={() => setFoodFilter('non-veg')}
              >
                Non-Vegetarian
              </button>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="menu-grid">
          {filteredItems.map(item => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
            No items found in this category.
          </p>
        )}
      </div>

    </div>
  );
};

export default MenuPage;
