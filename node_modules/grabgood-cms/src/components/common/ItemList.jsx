import React from 'react';
import { Field } from './Form';

const ItemField = ({ name, type, label, methods }) => {
  switch (type) {
    case 'number':
      return (
        <Field
          name={name}
          label={label}
          type="number"
          methods={methods}
        />
      );
    case 'boolean':
      return (
        <div className="flex items-center">
          <input
            type="checkbox"
            id={name}
            {...methods.register(name)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <label htmlFor={name} className="ml-2 text-sm text-gray-700">
            {label}
          </label>
        </div>
      );
    default:
      return (
        <Field
          name={name}
          label={label}
          methods={methods}
        />
      );
  }
};

const ItemForm = ({ prefix, fields, methods }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {fields.map((field) => {
        const fieldName = `${prefix}.${field}`;
        const fieldLabel = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
        
        let fieldType = 'text';
        if (field === 'price' || field === 'quantity') fieldType = 'number';
        if (field.startsWith('is') || field === 'customizable') fieldType = 'boolean';
        
        return (
          <div key={field} className="col-span-1">
            <ItemField
              name={fieldName}
              type={fieldType}
              label={fieldLabel}
              methods={methods}
            />
          </div>
        );
      })}
    </div>
  );
};

export const ItemList = ({ type, config, methods, name }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [items, setItems] = React.useState([]);

  const handleAddItem = () => {
    const newItems = [...items];
    newItems.push({
      id: Date.now(),
      category: selectedCategory
    });
    setItems(newItems);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  if (!config.categories) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select Category</option>
          {config.categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAddItem}
          disabled={!selectedCategory}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300"
        >
          Add Item
        </button>
      </div>

      <div className="space-y-6">
        {items.map((item, index) => {
          const category = config.categories.find(c => c.name === item.category);
          const fields = category.itemFields || category.fields || category.items || [];
          
          return (
            <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-gray-900">
                  {item.category} Item #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>

              {Array.isArray(fields) ? (
                <ItemForm
                  prefix={`${name}[${index}]`}
                  fields={fields}
                  methods={methods}
                />
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {fields.map((field) => (
                    <Field
                      key={field}
                      name={`${name}[${index}].${field}`}
                      label={field}
                      methods={methods}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}; 