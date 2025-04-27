import React from 'react';
import { Field, Select } from './Form';
import { ItemList } from './ItemList';
import { venueTypeConfig } from '../../config/venueTypeConfig';

export const DynamicFields = ({ type, methods }) => {
  if (!type || !venueTypeConfig[type]) {
    return null;
  }

  const { additionalFields } = venueTypeConfig[type];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Additional Details</h3>
      <div className="grid grid-cols-1 gap-6">
        {additionalFields.map((field) => {
          switch (field.type) {
            case 'multiselect':
              return (
                <div key={field.name} className="col-span-1">
                  <Select
                    name={`typeSpecificDetails.${field.name}`}
                    label={field.label}
                    options={field.options.map(option => ({
                      value: option,
                      label: option
                    }))}
                    methods={methods}
                    multiple={true}
                  />
                </div>
              );
            case 'timeRange':
              return (
                <div key={field.name} className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center space-x-4">
                      <Field
                        name={`typeSpecificDetails.${field.name}[0].start`}
                        type="time"
                        label="Start Time"
                        methods={methods}
                      />
                      <Field
                        name={`typeSpecificDetails.${field.name}[0].end`}
                        type="time"
                        label="End Time"
                        methods={methods}
                      />
                    </div>
                  </div>
                </div>
              );
            case 'time':
              return (
                <div key={field.name} className="col-span-1">
                  <Field
                    name={`typeSpecificDetails.${field.name}`}
                    type="time"
                    label={field.label}
                    methods={methods}
                  />
                </div>
              );
            case 'number':
              return (
                <div key={field.name} className="col-span-1">
                  <Field
                    name={`typeSpecificDetails.${field.name}`}
                    type="number"
                    label={field.label}
                    methods={methods}
                  />
                </div>
              );
            case 'itemList':
            case 'menuList':
            case 'roomList':
            case 'sweetsList':
              return (
                <div key={field.name} className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <ItemList
                    type={field.type}
                    config={field}
                    methods={methods}
                    name={`typeSpecificDetails.${field.name}`}
                  />
                </div>
              );
            default:
              return (
                <div key={field.name} className="col-span-1">
                  <Field
                    name={`typeSpecificDetails.${field.name}`}
                    label={field.label}
                    methods={methods}
                  />
                </div>
              );
          }
        })}
      </div>
    </div>
  );
}; 