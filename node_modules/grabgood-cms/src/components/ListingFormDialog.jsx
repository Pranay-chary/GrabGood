import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Divider,
  Box,
  Chip,
  IconButton,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const baseValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  contact: yup.string().required('Contact number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  description: yup.string().required('Description is required'),
  status: yup.string().required('Status is required'),
});

const getBusinessTypeFields = (type) => {
  switch (type) {
    case 'restaurant':
      return {
        cuisine: '',
        priceRange: '',
        seatingCapacity: '',
        servingHours: '',
        specialties: [],
        menuCategories: [],
        averageCost: '',
        diningOptions: [],
        paymentMethods: [],
        features: [],
        certifications: [],
        openingHours: {
          monday: { open: '', close: '' },
          tuesday: { open: '', close: '' },
          wednesday: { open: '', close: '' },
          thursday: { open: '', close: '' },
          friday: { open: '', close: '' },
          saturday: { open: '', close: '' },
          sunday: { open: '', close: '' },
        },
      };
    case 'hotel':
      return {
        starRating: '',
        roomTypes: [],
        amenities: [],
        checkInTime: '',
        checkOutTime: '',
        totalRooms: '',
        priceRange: '',
        policies: [],
        features: [],
        nearbyAttractions: [],
        services: [],
        paymentMethods: [],
        languages: [],
        accessibility: [],
      };
    case 'function_hall':
      return {
        capacity: '',
        eventTypes: [],
        facilities: [],
        availableTimeSlots: '',
        parkingCapacity: '',
        venueType: '',
        priceRange: '',
        cateringOptions: [],
        decorationOptions: [],
        audioVisual: [],
        seatingLayouts: [],
        additionalServices: [],
        cancellationPolicy: '',
        minimumNotice: '',
      };
    case 'sweet_shop':
      return {
        specialties: [],
        orderLeadTime: '',
        minimumOrderValue: '',
        deliveryRadius: '',
        categories: [],
        customizationOptions: [],
        packagingOptions: [],
        bulkOrderDiscount: '',
        seasonalSpecials: [],
        dietaryOptions: [],
        shelfLife: '',
        storageInstructions: '',
        qualityCertifications: [],
      };
    default:
      return {};
  }
};

export default function ListingFormDialog({ open, onClose, onSave, listing, businessType }) {
  const [deals, setDeals] = useState([]);
  const [newDeal, setNewDeal] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      contact: '',
      email: '',
      description: '',
      status: 'draft',
      isPremium: false,
      ...getBusinessTypeFields(businessType),
      ...listing,
    },
    validationSchema: baseValidationSchema,
    onSubmit: (values) => {
      onSave({
        ...values,
        deals,
        mediaFiles,
        type: businessType,
      });
    },
  });

  useEffect(() => {
    if (listing) {
      formik.setValues({
        ...formik.values,
        ...listing,
      });
      setDeals(listing.deals || []);
      setMediaFiles(listing.mediaFiles || []);
    }
  }, [listing]);

  const handleAddDeal = () => {
    if (newDeal.trim()) {
      setDeals([...deals, newDeal.trim()]);
      setNewDeal('');
    }
  };

  const handleRemoveDeal = (index) => {
    setDeals(deals.filter((_, i) => i !== index));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setMediaFiles([...mediaFiles, ...files]);
  };

  const renderBusinessTypeFields = () => {
    switch (businessType) {
      case 'restaurant':
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="cuisine"
                label="Cuisine Type"
                value={formik.values.cuisine}
                onChange={formik.handleChange}
                error={formik.touched.cuisine && Boolean(formik.errors.cuisine)}
                helperText={formik.touched.cuisine && formik.errors.cuisine}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="priceRange"
                label="Price Range"
                value={formik.values.priceRange}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="seatingCapacity"
                label="Seating Capacity"
                type="number"
                value={formik.values.seatingCapacity}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="averageCost"
                label="Average Cost for Two"
                type="number"
                value={formik.values.averageCost}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="specialties"
                label="Specialties"
                value={formik.values.specialties.join(', ')}
                onChange={(e) => formik.setFieldValue('specialties', e.target.value.split(',').map(item => item.trim()))}
                helperText="Enter specialties separated by commas"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Dining Options</InputLabel>
                <Select
                  multiple
                  name="diningOptions"
                  value={formik.values.diningOptions}
                  onChange={formik.handleChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {['Dine-in', 'Takeaway', 'Delivery', 'Buffet'].map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={formik.values.diningOptions.includes(option)} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="servingHours"
                label="Serving Hours"
                value={formik.values.servingHours}
                onChange={formik.handleChange}
              />
            </Grid>
          </>
        );
      case 'hotel':
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="starRating"
                label="Star Rating"
                type="number"
                value={formik.values.starRating}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="totalRooms"
                label="Total Rooms"
                type="number"
                value={formik.values.totalRooms}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="checkInTime"
                label="Check-in Time"
                type="time"
                value={formik.values.checkInTime}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="checkOutTime"
                label="Check-out Time"
                type="time"
                value={formik.values.checkOutTime}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="roomTypes"
                label="Room Types"
                value={formik.values.roomTypes.join(', ')}
                onChange={(e) => formik.setFieldValue('roomTypes', e.target.value.split(',').map(item => item.trim()))}
                helperText="Enter room types separated by commas"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="amenities"
                label="Amenities"
                value={formik.values.amenities.join(', ')}
                onChange={(e) => formik.setFieldValue('amenities', e.target.value.split(',').map(item => item.trim()))}
                helperText="Enter amenities separated by commas"
              />
            </Grid>
          </>
        );
      case 'function_hall':
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="capacity"
                label="Capacity"
                type="number"
                value={formik.values.capacity}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="parkingCapacity"
                label="Parking Capacity"
                type="number"
                value={formik.values.parkingCapacity}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="venueType"
                label="Venue Type"
                value={formik.values.venueType}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="minimumNotice"
                label="Minimum Notice Period (days)"
                type="number"
                value={formik.values.minimumNotice}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="eventTypes"
                label="Event Types"
                value={formik.values.eventTypes.join(', ')}
                onChange={(e) => formik.setFieldValue('eventTypes', e.target.value.split(',').map(item => item.trim()))}
                helperText="Enter event types separated by commas"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="facilities"
                label="Facilities"
                value={formik.values.facilities.join(', ')}
                onChange={(e) => formik.setFieldValue('facilities', e.target.value.split(',').map(item => item.trim()))}
                helperText="Enter facilities separated by commas"
              />
            </Grid>
          </>
        );
      case 'sweet_shop':
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="orderLeadTime"
                label="Order Lead Time (hours)"
                type="number"
                value={formik.values.orderLeadTime}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="minimumOrderValue"
                label="Minimum Order Value"
                type="number"
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="deliveryRadius"
                label="Delivery Radius (km)"
                type="number"
                value={formik.values.deliveryRadius}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="bulkOrderDiscount"
                label="Bulk Order Discount (%)"
                type="number"
                value={formik.values.bulkOrderDiscount}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="specialties"
                label="Specialties"
                value={formik.values.specialties.join(', ')}
                onChange={(e) => formik.setFieldValue('specialties', e.target.value.split(',').map(item => item.trim()))}
                helperText="Enter specialties separated by commas"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="dietaryOptions"
                label="Dietary Options"
                value={formik.values.dietaryOptions.join(', ')}
                onChange={(e) => formik.setFieldValue('dietaryOptions', e.target.value.split(',').map(item => item.trim()))}
                helperText="Enter dietary options separated by commas"
              />
            </Grid>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {listing ? 'Edit' : 'Add New'} {businessType.replace('_', ' ').toUpperCase()}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="contact"
                label="Contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formik.values.status}
                  label="Status"
                  onChange={formik.handleChange}
                >
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="pending_verification">Pending Verification</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Business-Specific Information
              </Typography>
            </Grid>

            {renderBusinessTypeFields()}

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Deals & Offers
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Add Deal"
                  value={newDeal}
                  onChange={(e) => setNewDeal(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={handleAddDeal}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {deals.map((deal, index) => (
                  <Chip
                    key={index}
                    label={deal}
                    onDelete={() => handleRemoveDeal(index)}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Media
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<AddIcon />}
              >
                Upload Media
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </Button>
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {mediaFiles.map((file, index) => (
                  <Chip
                    key={index}
                    label={file.name || file}
                    onDelete={() => setMediaFiles(mediaFiles.filter((_, i) => i !== index))}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.isPremium}
                    onChange={(e) => formik.setFieldValue('isPremium', e.target.checked)}
                    name="isPremium"
                  />
                }
                label="Premium Listing"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {listing ? 'Save Changes' : 'Create Listing'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 