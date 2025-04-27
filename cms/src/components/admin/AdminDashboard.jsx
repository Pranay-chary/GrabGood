import React, { useState } from 'react';
import VenueManagement from './VenueManagement';
import MediaManager from './MediaManager';
import QualityVerification from './QualityVerification';

const AdminDashboard = () => {
  const [currentStep, setCurrentStep] = useState('data-entry'); // data-entry, media, verification
  const [venueData, setVenueData] = useState(null);
  const [mediaData, setMediaData] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState('pending'); // pending, approved, rejected

  const handleVenueDataSubmit = (data) => {
    setVenueData(data);
    setCurrentStep('media');
  };

  const handleMediaSubmit = (files) => {
    setMediaData(files);
    setCurrentStep('verification');
  };

  const handleApprove = async (verificationData) => {
    try {
      // Here you would typically make an API call to save the data
      const finalData = {
        ...venueData,
        media: mediaData,
        verification: verificationData,
        status: 'approved',
        timestamp: new Date().toISOString()
      };

      // Simulating an API call
      console.log('Submitting final data:', finalData);
      
      setSubmissionStatus('approved');
      // Reset the form after successful submission
      setTimeout(() => {
        setVenueData(null);
        setMediaData([]);
        setCurrentStep('data-entry');
        setSubmissionStatus('pending');
      }, 3000);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleReject = (verificationData) => {
    setSubmissionStatus('rejected');
    // You might want to store the rejection reason and allow for revisions
    console.log('Rejection data:', verificationData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <nav className="flex items-center space-x-4" aria-label="Progress">
              {['data-entry', 'media', 'verification'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep === step
                        ? 'bg-blue-600 text-white'
                        : index < ['data-entry', 'media', 'verification'].indexOf(currentStep)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep === step ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    {step.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                  {index < 2 && (
                    <div className="ml-4 w-20 h-0.5 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Status Messages */}
        {submissionStatus !== 'pending' && (
          <div
            className={`mb-6 p-4 rounded-md ${
              submissionStatus === 'approved'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {submissionStatus === 'approved'
              ? 'Venue data has been approved and published successfully!'
              : 'Venue data has been rejected. Please review the feedback and make necessary changes.'}
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow">
          {currentStep === 'data-entry' && (
            <VenueManagement onSubmit={handleVenueDataSubmit} />
          )}

          {currentStep === 'media' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Media Management</h2>
              <MediaManager
                initialFiles={mediaData}
                onSubmit={handleMediaSubmit}
              />
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => setCurrentStep('data-entry')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => handleMediaSubmit([])}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Continue to Verification
                </button>
              </div>
            </div>
          )}

          {currentStep === 'verification' && (
            <div className="p-6">
              <QualityVerification
                venueData={{ ...venueData, media: mediaData }}
                onApprove={handleApprove}
                onReject={handleReject}
              />
              <div className="mt-4">
                <button
                  onClick={() => setCurrentStep('media')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back to Media
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 