import React, { useState } from 'react';

const SurplusForm = () => {
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    servings: '',
    preparationTime: '',
    bestBefore: '',
    storageInstructions: '',
    allergens: [],
    dietaryInfo: [],
    notes: ''
  });

  const allergenOptions = [
    'Milk', 'Eggs', 'Fish', 'Shellfish', 'Tree Nuts',
    'Peanuts', 'Wheat', 'Soybeans'
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Halal', 'Contains Meat',
    'Gluten-Free', 'Dairy-Free'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/partner/surplus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Surplus food posted successfully!');
        setFormData({
          foodType: '',
          quantity: '',
          servings: '',
          preparationTime: '',
          bestBefore: '',
          storageInstructions: '',
          allergens: [],
          dietaryInfo: [],
          notes: ''
        });
      } else {
        throw new Error('Failed to post surplus food');
      }
    } catch (error) {
      console.error('Error posting surplus food:', error);
      alert('Failed to post surplus food. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const array = formData[name];
      if (checked) {
        setFormData({ ...formData, [name]: [...array, value] });
      } else {
        setFormData({ ...formData, [name]: array.filter(item => item !== value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Surplus Food Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Food Type
            </label>
            <input
              type="text"
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              placeholder="e.g., Biryani, Mixed Vegetables"
              className="w-full p-2 border rounded focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity (kg)
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              step="0.1"
              className="w-full p-2 border rounded focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Servings
            </label>
            <input
              type="number"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              min="1"
              className="w-full p-2 border rounded focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preparation Time
            </label>
            <input
              type="datetime-local"
              name="preparationTime"
              value={formData.preparationTime}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Best Before
            </label>
            <input
              type="datetime-local"
              name="bestBefore"
              value={formData.bestBefore}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Storage Instructions
            </label>
            <textarea
              name="storageInstructions"
              value={formData.storageInstructions}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 border rounded focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allergens
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {allergenOptions.map((allergen) => (
                <label key={allergen} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="allergens"
                    value={allergen}
                    checked={formData.allergens.includes(allergen)}
                    onChange={handleChange}
                    className="rounded text-[#2ecc71] focus:ring-[#2ecc71]"
                  />
                  <span className="text-sm">{allergen}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dietary Information
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {dietaryOptions.map((diet) => (
                <label key={diet} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="dietaryInfo"
                    value={diet}
                    checked={formData.dietaryInfo.includes(diet)}
                    onChange={handleChange}
                    className="rounded text-[#2ecc71] focus:ring-[#2ecc71]"
                  />
                  <span className="text-sm">{diet}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#2ecc71] text-white px-6 py-2 rounded hover:bg-[#27ae60]"
        >
          Post Surplus Food
        </button>
      </div>
    </form>
  );
};

export default SurplusForm;
