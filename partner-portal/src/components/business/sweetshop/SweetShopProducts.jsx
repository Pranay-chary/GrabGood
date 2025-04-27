import React, { useState } from 'react';

const SweetShopProducts = ({ products, onChange }) => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: 'sweets',
    isVegetarian: true,
    isAvailable: true,
    ingredients: '',
    weight: '',
    unit: 'gm'
  });

  const categories = [
    { id: 'sweets', label: 'Traditional Sweets' },
    { id: 'chocolates', label: 'Chocolates' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'dryfruit', label: 'Dry Fruit Sweets' },
    { id: 'cakes', label: 'Cakes & Pastries' },
    { id: 'seasonal', label: 'Seasonal Specials' },
    { id: 'other', label: 'Other Items' }
  ];

  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addProduct = () => {
    if (!product.name || !product.price) {
      alert('Please enter product name and price');
      return;
    }

    const newProduct = {
      ...product,
      id: Date.now().toString(),
      price: parseFloat(product.price)
    };

    onChange([...products, newProduct]);

    // Reset form
    setProduct({
      id: '',
      name: '',
      description: '',
      price: '',
      category: 'sweets',
      isVegetarian: true,
      isAvailable: true,
      ingredients: '',
      weight: '',
      unit: 'gm'
    });
  };

  const removeProduct = (id) => {
    onChange(products.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Products</h3>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="text-md font-medium text-gray-700 mb-4">Add New Product</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleProductChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="e.g., Kaju Katli"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleProductChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleProductChange}
              rows="2"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="Brief description of the product"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleProductChange}
                min="0"
                step="0.01"
                className="focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">INR</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Weight</label>
              <input
                type="number"
                name="weight"
                value={product.weight}
                onChange={handleProductChange}
                min="0"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                placeholder="Weight"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <select
                name="unit"
                value={product.unit}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              >
                <option value="gm">Grams (gm)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="pcs">Pieces (pcs)</option>
                <option value="box">Box</option>
              </select>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Ingredients</label>
            <textarea
              name="ingredients"
              value={product.ingredients}
              onChange={handleProductChange}
              rows="2"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="List main ingredients"
            />
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isVegetarian"
                  name="isVegetarian"
                  type="checkbox"
                  checked={product.isVegetarian}
                  onChange={handleProductChange}
                  className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isVegetarian" className="font-medium text-gray-700">Vegetarian</label>
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isAvailable"
                  name="isAvailable"
                  type="checkbox"
                  checked={product.isAvailable}
                  onChange={handleProductChange}
                  className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isAvailable" className="font-medium text-gray-700">Available</label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            type="button"
            onClick={addProduct}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
          >
            Add Product
          </button>
        </div>
      </div>
      
      {/* Product List */}
      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-700 mb-4">Your Products</h4>
        
        {products.length === 0 ? (
          <p className="text-gray-500 text-sm">No products added yet</p>
        ) : (
          <div className="bg-white shadow overflow-hidden rounded-md">
            <ul className="divide-y divide-gray-200">
              {products.map(item => (
                <li key={item.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <h5 className="text-lg font-medium text-gray-900">{item.name}</h5>
                        {item.isVegetarian && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Veg
                          </span>
                        )}
                        {!item.isAvailable && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      <div className="text-sm text-gray-500 mt-1">
                        {categories.find(c => c.id === item.category)?.label} 
                        {item.weight && ` • ${item.weight} ${item.unit}`}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-medium text-gray-900 mr-4">₹{item.price}</span>
                      <button
                        type="button"
                        onClick={() => removeProduct(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SweetShopProducts; 