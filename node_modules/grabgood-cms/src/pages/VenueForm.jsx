import React, { useEffect } from 'react';
import { z } from 'zod';
import { Form, Field, TextArea, Select, Checkbox, SubmitButton } from '../components/common/Form';
import { DynamicFields } from '../components/common/DynamicFields';
import { useVenues } from '../hooks/useVenues';
import { VenueType, PriceRange } from '../types/venue';
import { venueTypeConfig } from '../config/venueTypeConfig';

const createVenueSchema = (type) => {
  const baseSchema = {
    name: z.string().min(2, "Name must be at least 2 characters"),
    type: z.enum(Object.keys(VenueType), {
      errorMap: () => ({ message: "Please select a valid venue type" })
    }),
    description: z.string().min(10, "Description must be at least 10 characters"),
    address: z.string().min(5, "Address is required"),
    capacity: z.string().min(1, "Capacity is required"),
    facilities: z.string().min(1, "Facilities are required"),
    contactName: z.string().min(2, "Contact name is required"),
    contactPhone: z.string().min(10, "Valid phone number is required"),
    contactEmail: z.string().email("Valid email is required"),
    priceRange: z.enum(Object.keys(PriceRange), {
      errorMap: () => ({ message: "Please select a price range" })
    }),
    isActive: z.boolean(),
    isVeg: z.boolean().optional(),
    parkingAvailable: z.boolean(),
    acAvailable: z.boolean(),
  };

  // Add type-specific validation
  if (type && venueTypeConfig[type]) {
    const { requiredFields } = venueTypeConfig[type];
    requiredFields.forEach(field => {
      if (baseSchema[field]) {
        baseSchema[field] = baseSchema[field].refine(val => val !== undefined, {
          message: `${field} is required for ${type}`
        });
      }
    });
  }

  return z.object(baseSchema);
};

export function VenueFormPage() {
  const { createVenue } = useVenues();
  const [selectedType, setSelectedType] = React.useState('');
  const [schema, setSchema] = React.useState(() => createVenueSchema());

  useEffect(() => {
    setSchema(createVenueSchema(selectedType));
  }, [selectedType]);

  const handleSubmit = async (data) => {
    try {
      await createVenue(data);
    } catch (error) {
      console.error('Failed to create venue:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create New Venue</h1>
      
      <Form
        onSubmit={handleSubmit}
        validationSchema={schema}
        defaultValues={{
          isActive: true,
          parkingAvailable: false,
          acAvailable: false,
          isVeg: false,
        }}
        className="space-y-6"
      >
        {(methods) => {
          const type = methods.watch('type');
          if (type !== selectedType) {
            setSelectedType(type);
          }

          return (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field
                  name="name"
                  label="Venue Name"
                  placeholder="Enter venue name"
                  methods={methods}
                />
                
                <Select
                  name="type"
                  label="Venue Type"
                  options={Object.entries(VenueType).map(([key, value]) => ({
                    value: key,
                    label: value.replace(/_/g, ' ').toLowerCase()
                      .replace(/\b\w/g, l => l.toUpperCase())
                  }))}
                  methods={methods}
                />

                <TextArea
                  name="description"
                  label="Description"
                  placeholder="Enter venue description"
                  methods={methods}
                  rows={4}
                  className="sm:col-span-2"
                />
                
                <TextArea
                  name="address"
                  label="Address"
                  placeholder="Enter complete address"
                  methods={methods}
                  rows={3}
                  className="sm:col-span-2"
                />

                <Field
                  name="capacity"
                  label="Capacity"
                  placeholder="e.g., 200 people"
                  methods={methods}
                />

                <TextArea
                  name="facilities"
                  label="Facilities"
                  placeholder="List available facilities"
                  methods={methods}
                  rows={3}
                  className="sm:col-span-2"
                />

                <Field
                  name="contactName"
                  label="Contact Person"
                  placeholder="Enter contact person name"
                  methods={methods}
                />

                <Field
                  name="contactPhone"
                  label="Contact Phone"
                  placeholder="Enter contact number"
                  type="tel"
                  methods={methods}
                />

                <Field
                  name="contactEmail"
                  label="Contact Email"
                  placeholder="Enter contact email"
                  type="email"
                  methods={methods}
                />

                <Select
                  name="priceRange"
                  label="Price Range"
                  options={Object.entries(PriceRange).map(([key, value]) => ({
                    value: key,
                    label: value
                  }))}
                  methods={methods}
                />

                <div className="sm:col-span-2 grid grid-cols-2 gap-6">
                  <Checkbox
                    name="parkingAvailable"
                    label="Parking Available"
                    methods={methods}
                  />
                  
                  <Checkbox
                    name="acAvailable"
                    label="AC Available"
                    methods={methods}
                  />

                  <Checkbox
                    name="isVeg"
                    label="Pure Vegetarian"
                    methods={methods}
                  />

                  <Checkbox
                    name="isActive"
                    label="Active Venue"
                    methods={methods}
                  />
                </div>
              </div>

              {type && <DynamicFields type={type} methods={methods} />}

              <div className="flex justify-end mt-6">
                <SubmitButton>
                  Create Venue
                </SubmitButton>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
} 