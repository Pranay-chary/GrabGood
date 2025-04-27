import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import PartnerNavbar from '../components/PartnerNavbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { toast } from '../utils/toastUtil';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/auth/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        let errorMessage = 'Failed to fetch order details';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError(error.message || 'Failed to fetch order details. Please try again later.');
      toast.error(error.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (newStatus) => {
    try {
      const response = await fetch(`/api/auth/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) {
        let errorMessage = 'Failed to update order status';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }
      
      // Update order status in state
      setOrder({ ...order, status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error(error.message || 'Failed to update order status');
    }
  };

  const getStatusBadge = (status) => {
    let variant = 'default';
    
    switch (status.toLowerCase()) {
      case 'pending':
        variant = 'warning';
        break;
      case 'confirmed':
        variant = 'info';
        break;
      case 'preparing':
        variant = 'info';
        break;
      case 'ready':
        variant = 'success';
        break;
      case 'completed':
        variant = 'success';
        break;
      case 'cancelled':
        variant = 'danger';
        break;
      default:
        variant = 'default';
    }
    
    return <Badge variant={variant}>{status}</Badge>;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/orders')}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="spinner"></div>
            <p className="mt-2 text-gray-600">Loading order details...</p>
          </div>
        ) : error ? (
          <Card className="bg-red-50 border-l-4 border-red-500 text-red-700">
            <div className="p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">{error}</p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" onClick={fetchOrderDetails}>
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ) : order ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Order #{order.orderId || order.id}</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Placed on {format(new Date(order.createdAt), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                    <div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                    <div className="divide-y divide-gray-200">
                      {order.items.map((item, index) => (
                        <div key={index} className="py-4 flex justify-between">
                          <div className="flex">
                            {item.imageUrl && (
                              <img 
                                src={item.imageUrl} 
                                alt={item.name}
                                className="h-16 w-16 object-cover rounded-md mr-4" 
                              />
                            )}
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                              {item.notes && <p className="text-sm text-gray-500">Notes: {item.notes}</p>}
                            </div>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">Subtotal</span>
                      <span className="text-sm font-medium text-gray-900">{formatPrice(order.subtotal || 0)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">Tax</span>
                      <span className="text-sm font-medium text-gray-900">{formatPrice(order.tax || 0)}</span>
                    </div>
                    {order.deliveryFee !== undefined && (
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Delivery Fee</span>
                        <span className="text-sm font-medium text-gray-900">{formatPrice(order.deliveryFee)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-4 border-t border-gray-200">
                      <span className="text-base font-medium text-gray-900">Total</span>
                      <span className="text-base font-medium text-gray-900">{formatPrice(order.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Order Status Update Section */}
              <Card className="mt-6">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Update Order Status</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {order.status === 'pending' && (
                      <>
                        <Button 
                          onClick={() => handleUpdateOrderStatus('confirmed')}
                          variant="success"
                        >
                          Confirm Order
                        </Button>
                        <Button 
                          onClick={() => handleUpdateOrderStatus('cancelled')}
                          variant="danger"
                        >
                          Cancel Order
                        </Button>
                      </>
                    )}
                    
                    {order.status === 'confirmed' && (
                      <Button 
                        onClick={() => handleUpdateOrderStatus('preparing')}
                        variant="primary"
                      >
                        Mark as Preparing
                      </Button>
                    )}
                    
                    {order.status === 'preparing' && (
                      <Button 
                        onClick={() => handleUpdateOrderStatus('ready')}
                        variant="primary"
                      >
                        Mark as Ready
                      </Button>
                    )}
                    
                    {order.status === 'ready' && (
                      <Button 
                        onClick={() => handleUpdateOrderStatus('completed')}
                        variant="success"
                      >
                        Mark as Completed
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Customer Information and Delivery Details */}
            <div>
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{order.customer.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{order.customer.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{order.customer.phone || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {order.orderType === 'delivery' && order.deliveryAddress && (
                <Card className="mt-6">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Address</label>
                        <p className="mt-1 text-sm text-gray-900">{order.deliveryAddress.street}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">City</label>
                          <p className="mt-1 text-sm text-gray-900">{order.deliveryAddress.city}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">State</label>
                          <p className="mt-1 text-sm text-gray-900">{order.deliveryAddress.state}</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Postal Code</label>
                        <p className="mt-1 text-sm text-gray-900">{order.deliveryAddress.postalCode}</p>
                      </div>
                      {order.deliveryAddress.instructions && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Delivery Instructions</label>
                          <p className="mt-1 text-sm text-gray-900">{order.deliveryAddress.instructions}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )}

              {order.orderType === 'pickup' && (
                <Card className="mt-6">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Pickup Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Pickup Time</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {order.pickupTime ? format(new Date(order.pickupTime), 'MMM d, yyyy h:mm a') : 'As soon as possible'}
                        </p>
                      </div>
                      {order.pickupInstructions && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Pickup Instructions</label>
                          <p className="mt-1 text-sm text-gray-900">{order.pickupInstructions}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )}

              <Card className="mt-6">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Payment Method</label>
                      <p className="mt-1 text-sm text-gray-900">{order.paymentMethod || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Payment Status</label>
                      <p className="mt-1 text-sm text-gray-900">
                        <Badge variant={order.paymentStatus === 'paid' ? 'success' : 'warning'}>
                          {order.paymentStatus || 'N/A'}
                        </Badge>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Order not found</h3>
            <p className="mt-1 text-sm text-gray-500">The order you're looking for doesn't exist or you don't have permission to view it.</p>
            <div className="mt-6">
              <Button onClick={() => navigate('/orders')}>
                Back to Orders
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderDetails; 