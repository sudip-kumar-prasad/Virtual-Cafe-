import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import menuItems from '../data/menuData';

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [foodFilter, setFoodFilter] = useState('all');

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
            <MenuItem key={item.id} item={item} />
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
