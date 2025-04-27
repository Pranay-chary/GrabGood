import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from '@mui/icons-material';

const MEDIA_TYPES = ['image', 'video'];
const BUSINESS_TYPES = ['restaurant', 'hotel', 'function_hall', 'sweet_shop'];

export default function Media() {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    business: 'all',
    search: '',
  });
  const [uploadDialog, setUploadDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    fetchMediaItems();
  }, [filters]);

  const fetchMediaItems = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData = [
        {
          id: 1,
          title: 'Restaurant Interior',
          type: 'image',
          url: 'https://example.com/image1.jpg',
          thumbnail: 'https://example.com/thumb1.jpg',
          businessType: 'restaurant',
          businessId: 1,
          tags: ['interior', 'dining'],
          uploadedAt: '2024-02-20',
          size: '2.5MB',
        },
        // Add more mock data
      ];
      setMediaItems(mockData);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (files) => {
    try {
      // TODO: Implement file upload logic
      console.log('Uploading files:', files);
      setUploadDialog(false);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleDelete = async (ids) => {
    try {
      // TODO: Implement delete logic
      console.log('Deleting items:', ids);
      setSelectedItems([]);
    } catch (error) {
      console.error('Error deleting items:', error);
    }
  };

  const handleEdit = (media) => {
    setSelectedMedia(media);
    setEditDialog(true);
  };

  const handleSaveEdit = async (editedMedia) => {
    try {
      // TODO: Implement save edit logic
      console.log('Saving edited media:', editedMedia);
      setEditDialog(false);
      setSelectedMedia(null);
    } catch (error) {
      console.error('Error saving media:', error);
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
      selectedItems.length === mediaItems.length
        ? []
        : mediaItems.map(item => item.id)
    );
  };

  const MediaCard = ({ item }) => (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <Checkbox
          checked={selectedItems.includes(item.id)}
          onChange={() => handleSelectItem(item.id)}
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
        />
        <CardMedia
          component={item.type === 'video' ? 'video' : 'img'}
          height="140"
          image={item.thumbnail}
          alt={item.title}
        />
      </Box>
      <CardContent>
        <Typography variant="h6" noWrap>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {item.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {item.size}
        </Typography>
        <Box sx={{ mt: 1 }}>
          {item.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{ mr: 0.5, mb: 0.5 }}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <IconButton size="small" onClick={() => handleEdit(item)}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" href={item.url} download>
          <DownloadIcon />
        </IconButton>
        <IconButton size="small" onClick={() => handleDelete([item.id])}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );

  const UploadDialog = () => (
    <Dialog open={uploadDialog} onClose={() => setUploadDialog(false)}>
      <DialogTitle>Upload Media</DialogTitle>
      <DialogContent>
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadIcon />}
          sx={{ mt: 2 }}
        >
          Choose Files
          <input
            type="file"
            hidden
            multiple
            accept="image/*,video/*"
            onChange={(e) => handleUpload(Array.from(e.target.files))}
          />
        </Button>
      </DialogContent>
    </Dialog>
  );

  const EditDialog = () => (
    <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
      <DialogTitle>Edit Media</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              defaultValue={selectedMedia?.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tags"
              defaultValue={selectedMedia?.tags.join(', ')}
              helperText="Separate tags with commas"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Business Type</InputLabel>
              <Select
                defaultValue={selectedMedia?.businessType}
                label="Business Type"
              >
                {BUSINESS_TYPES.map(type => (
                  <MenuItem key={type} value={type}>
                    {type.replace('_', ' ').toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditDialog(false)}>Cancel</Button>
        <Button onClick={() => handleSaveEdit(selectedMedia)} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Media Management</Typography>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={() => setUploadDialog(true)}
        >
          Upload Media
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            placeholder="Search media..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Media Type</InputLabel>
            <Select
              value={filters.type}
              label="Media Type"
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <MenuItem value="all">All Types</MenuItem>
              {MEDIA_TYPES.map(type => (
                <MenuItem key={type} value={type}>
                  {type.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Business Type</InputLabel>
            <Select
              value={filters.business}
              label="Business Type"
              onChange={(e) => setFilters({ ...filters, business: e.target.value })}
            >
              <MenuItem value="all">All Businesses</MenuItem>
              {BUSINESS_TYPES.map(type => (
                <MenuItem key={type} value={type}>
                  {type.replace('_', ' ').toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {selectedItems.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(selectedItems)}
            sx={{ mr: 1 }}
          >
            Delete Selected ({selectedItems.length})
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => console.log('Download selected:', selectedItems)}
          >
            Download Selected
          </Button>
        </Box>
      )}

      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={
            selectedItems.length === mediaItems.length
              ? <CheckBoxIcon />
              : <CheckBoxOutlineBlankIcon />
          }
          onClick={handleSelectAll}
        >
          {selectedItems.length === mediaItems.length ? 'Deselect All' : 'Select All'}
        </Button>
      </Box>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={2}>
          {mediaItems.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
              <MediaCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}

      <UploadDialog />
      <EditDialog />
    </Box>
  );
}
