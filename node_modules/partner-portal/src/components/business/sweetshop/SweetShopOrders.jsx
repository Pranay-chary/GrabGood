import React from 'react';

const SweetShopOrders = ({ orderSettings, onChange }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      ...orderSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Order Settings</h3>
      
      <div className="bg-white p-4 rounded-md shadow">
        <h4 className="text-md font-medium text-gray-700 mb-4">Delivery Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Order Value (₹)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                name="minimumOrderValue"
                value={orderSettings.minimumOrderValue}
                onChange={handleChange}
                min="0"
                className="focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Minimum value required for customers to place an order</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Delivery Radius (km)</label>
            <input
              type="number"
              name="deliveryRadius"
              value={orderSettings.deliveryRadius}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="e.g., 5"
            />
            <p className="mt-1 text-xs text-gray-500">Maximum distance for delivery service</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Delivery Charge (₹)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                name="deliveryCharge"
                value={orderSettings.deliveryCharge}
                onChange={handleChange}
                min="0"
                className="focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Standard delivery fee</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Free Delivery Above (₹)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                name="freeDeliveryAbove"
                value={orderSettings.freeDeliveryAbove}
                onChange={handleChange}
                min="0"
                className="focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Order value above which delivery is free</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-md shadow">
        <h4 className="text-md font-medium text-gray-700 mb-4">Timing Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Estimated Delivery Time (minutes)</label>
            <input
              type="number"
              name="deliveryTime"
              value={orderSettings.deliveryTime}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="e.g., 30"
            />
            <p className="mt-1 text-xs text-gray-500">Average time for order delivery</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Maximum Advance Order Days</label>
            <input
              type="number"
              name="advanceOrderDays"
              value={orderSettings.advanceOrderDays}
              onChange={handleChange}
              min="0"
              max="90"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="e.g., 7"
            />
            <p className="mt-1 text-xs text-gray-500">How many days in advance customers can place orders</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-md shadow">
        <h4 className="text-md font-medium text-gray-700 mb-4">Order Types</h4>
        <div className="space-y-4">
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="acceptBulkOrders"
                name="acceptBulkOrders"
                type="checkbox"
                checked={orderSettings.acceptBulkOrders}
                onChange={handleChange}
                className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="acceptBulkOrders" className="font-medium text-gray-700">Accept Bulk Orders</label>
              <p className="text-gray-500">Allow customers to place large quantity orders</p>
            </div>
          </div>
          
          {orderSettings.acceptBulkOrders && (
            <div className="pl-7 border-l-2 border-green-100 ml-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Minimum Bulk Order Quantity</label>
                  <input
                    type="number"
                    name="minBulkOrderQuantity"
                    value={orderSettings.minBulkOrderQuantity || ''}
                    onChange={handleChange}
                    min="1"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                    placeholder="e.g., 25"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bulk Order Lead Time (days)</label>
                  <input
                    type="number"
                    name="bulkOrderLeadTime"
                    value={orderSettings.bulkOrderLeadTime || ''}
                    onChange={handleChange}
                    min="0"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                    placeholder="e.g., 3"
                  />
                  <p className="mt-1 text-xs text-gray-500">Days notice required for bulk orders</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="acceptCustomOrders"
                name="acceptCustomOrders"
                type="checkbox"
                checked={orderSettings.acceptCustomOrders || false}
                onChange={handleChange}
                className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="acceptCustomOrders" className="font-medium text-gray-700">Accept Custom Orders</label>
              <p className="text-gray-500">Allow customers to request custom sweets or modifications</p>
            </div>
          </div>
          
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="acceptPreOrders"
                name="acceptPreOrders"
                type="checkbox"
                checked={orderSettings.acceptPreOrders || false}
                onChange={handleChange}
                className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="acceptPreOrders" className="font-medium text-gray-700">Accept Pre-Orders</label>
              <p className="text-gray-500">Allow customers to place orders in advance</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-md shadow">
        <h4 className="text-md font-medium text-gray-700 mb-4">Payment Settings</h4>
        <div className="space-y-4">
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="allowCashOnDelivery"
                name="allowCashOnDelivery"
                type="checkbox"
                checked={orderSettings.allowCashOnDelivery || false}
                onChange={handleChange}
                className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="allowCashOnDelivery" className="font-medium text-gray-700">Allow Cash On Delivery</label>
            </div>
          </div>
          
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="allowOnlinePayment"
                name="allowOnlinePayment"
                type="checkbox"
                checked={orderSettings.allowOnlinePayment !== false}
                onChange={handleChange}
                className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="allowOnlinePayment" className="font-medium text-gray-700">Allow Online Payment</label>
            </div>
          </div>
          
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="requireAdvancePayment"
                name="requireAdvancePayment"
                type="checkbox"
                checked={orderSettings.requireAdvancePayment || false}
                onChange={handleChange}
                className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="requireAdvancePayment" className="font-medium text-gray-700">Require Advance Payment for Large Orders</label>
              <p className="text-gray-500">Require a deposit for bulk or custom orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SweetShopOrders; 