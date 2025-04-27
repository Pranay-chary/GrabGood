import React, { useState } from 'react';

const QualityVerification = ({ venueData, onApprove, onReject }) => {
  const [verificationNotes, setVerificationNotes] = useState('');
  const [checklist, setChecklist] = useState({
    basicInfo: false,
    contact: false,
    location: false,
    media: false,
    pricing: false,
    description: false
  });

  const handleChecklistChange = (key) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isAllChecked = Object.values(checklist).every(value => value);

  const handleSubmit = (action) => {
    const verificationData = {
      checklist,
      notes: verificationNotes,
      timestamp: new Date().toISOString(),
      status: action === 'approve' ? 'approved' : 'rejected'
    };

    if (action === 'approve') {
      onApprove(verificationData);
    } else {
      onReject(verificationData);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Quality Verification</h2>
        <p className="mt-1 text-sm text-gray-500">
          Please verify all aspects of the venue information before approval.
        </p>
      </div>

      <div className="space-y-4">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-sm font-medium text-gray-700">Verification Checklist</h3>
          <div className="mt-4 space-y-3">
            {Object.entries(checklist).map(([key, checked]) => (
              <div key={key} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={key}
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleChecklistChange(key)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor={key} className="text-sm font-medium text-gray-700">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Verification Notes
          </label>
          <div className="mt-1">
            <textarea
              id="notes"
              rows={4}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={verificationNotes}
              onChange={(e) => setVerificationNotes(e.target.value)}
              placeholder="Add any notes or comments about the verification process..."
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex-1">
            {!isAllChecked && (
              <p className="text-sm text-yellow-600">
                Please complete all verification checks before proceeding
              </p>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => handleSubmit('reject')}
              className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('approve')}
              disabled={!isAllChecked}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white
                ${isAllChecked
                  ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              Approve
            </button>
          </div>
        </div>
      </div>

      {venueData && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Preview Data</h3>
          <div className="bg-gray-50 rounded-md p-4">
            <pre className="text-xs overflow-auto">
              {JSON.stringify(venueData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualityVerification; 