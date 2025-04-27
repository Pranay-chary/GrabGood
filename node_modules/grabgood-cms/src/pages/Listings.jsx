import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  Menu,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { listings } from '../utils/api';
import ListingFormDialog from '../components/ListingFormDialog';

const BUSINESS_TYPES = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'function_hall', label: 'Function Hall' },
  { value: 'sweet_shop', label: 'Sweet Shop' },
];

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending_verification', label: 'Pending Verification' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export default function Listings() {
  const [activeTab, setActiveTab] = useState('restaurant');
  const [listingsData, setListingsData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    isPremium: false,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchListings();
  }, [activeTab, filters, searchQuery]);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const params = {
        type: activeTab,
        status: filters.status !== 'all' ? filters.status : undefined,
        isPremium: filters.isPremium || undefined,
        search: searchQuery || undefined,
      };
      const data = await listings.getAll(params);
      setListingsData(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      showSnackbar('Error fetching listings', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedListing(null);
    setOpenDialog(true);
  };

  const handleEdit = (listing) => {
    setSelectedListing(listing);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await listings.delete(id);
      showSnackbar('Listing deleted successfully');
      fetchListings();
    } catch (error) {
      console.error('Error deleting listing:', error);
      showSnackbar('Error deleting listing', 'error');
    }
  };

  const handleBulkDelete = async () => {
    try {
      await listings.bulkDelete(selectedItems);
      showSnackbar('Selected listings deleted successfully');
      setSelectedItems([]);
      fetchListings();
    } catch (error) {
      console.error('Error deleting listings:', error);
      showSnackbar('Error deleting listings', 'error');
    }
  };

  const handleExport = async (format = 'csv') => {
    try {
      const params = {
        type: activeTab,
        status: filters.status !== 'all' ? filters.status : undefined,
        isPremium: filters.isPremium || undefined,
        search: searchQuery || undefined,
        format,
        ids: selectedItems.length > 0 ? selectedItems : undefined,
      };
      const blob = await listings.export(params);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `listings-export-${new Date().toISOString()}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showSnackbar('Export completed successfully');
    } catch (error) {
      console.error('Error exporting listings:', error);
      showSnackbar('Error exporting listings', 'error');
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedListing(null);
  };

  const handleDialogSave = async (formData) => {
    try {
      if (selectedListing) {
        await listings.update(selectedListing.id, formData);
        showSnackbar('Listing updated successfully');
      } else {
        await listings.create(formData);
        showSnackbar('Listing created successfully');
      }
      handleDialogClose();
      fetchListings();
    } catch (error) {
      console.error('Error saving listing:', error);
      showSnackbar('Error saving listing', 'error');
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === listingsData.length
        ? []
        : listingsData.map(item => item.id)
    );
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const ListingCard = ({ listing }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={selectedItems.includes(listing.id)}
              onChange={() => handleSelectItem(listing.id)}
            />
            <Typography variant="h6">{listing.name}</Typography>
          </Box>
          <Box>
            {listing.isPremium && (
              <Chip label="Premium" color="primary" size="small" sx={{ mr: 1 }} />
            )}
            <Chip label={listing.status} color="secondary" size="small" />
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Address: {listing.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact: {listing.contact}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {listing.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Deals:
            </Typography>
            {listing.deals.map((deal, index) => (
              <Chip
                key={index}
                label={deal}
                size="small"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <IconButton onClick={() => handleEdit(listing)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(listing.id)} size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Listings Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add New Listing
        </Button>
      </Box>

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3 }}
      >
        {BUSINESS_TYPES.map((type) => (
          <Tab
            key={type.value}
            value={type.value}
            label={type.label}
          />
        ))}
      </Tabs>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <MenuItem value="all">All Status</MenuItem>
                {STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              startIcon={<FilterIcon />}
              onClick={() => setFilters({ ...filters, isPremium: !filters.isPremium })}
              variant={filters.isPremium ? 'contained' : 'outlined'}
            >
              Premium Only
            </Button>
          </Grid>
        </Grid>
      </Box>

      {selectedItems.length > 0 && (
        <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleBulkDelete}
          >
            Delete Selected ({selectedItems.length})
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Export Selected
          </Button>
        </Box>
      )}

      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={
            selectedItems.length === listingsData.length
              ? <CheckBoxIcon />
              : <CheckBoxOutlineBlankIcon />
          }
          onClick={handleSelectAll}
        >
          {selectedItems.length === listingsData.length ? 'Deselect All' : 'Select All'}
        </Button>
      </Box>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box>
          {listingsData.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </Box>
      )}

      <ListingFormDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSave={handleDialogSave}
        listing={selectedListing}
        businessType={activeTab}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => { handleExport('csv'); setAnchorEl(null); }}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export as CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { handleExport('xlsx'); setAnchorEl(null); }}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export as Excel</ListItemText>
        </MenuItem>
      </Menu>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
