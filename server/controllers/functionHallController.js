const FunctionHall = require('../models/FunctionHall');
const Business = require('../models/Business');
const { cloudinaryUploader } = require('../utils/cloudinary'); // Assuming you use Cloudinary for image uploads

// Get function hall profile
exports.getFunctionHallProfile = async (req, res) => {
  try {
    const partnerId = req.user.id;
    
    const functionHall = await FunctionHall.findOne({ partner: partnerId });
    
    if (!functionHall) {
      return res.status(404).json({ 
        success: false, 
        message: 'Function hall profile not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: functionHall
    });
  } catch (error) {
    console.error('Error fetching function hall profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching function hall profile',
      error: error.message
    });
  }
};

// Create/Update function hall profile
exports.updateFunctionHallProfile = async (req, res) => {
  try {
    const partnerId = req.user.id;
    const profileData = req.body;
    
    // Find existing profile or create new one
    let functionHall = await FunctionHall.findOne({ partner: partnerId });
    
    if (functionHall) {
      // If function hall exists, update it
      functionHall = await FunctionHall.findOneAndUpdate(
        { partner: partnerId },
        { $set: profileData },
        { new: true, runValidators: true }
      );
    } else {
      // If function hall doesn't exist, create new one
      // Check if this partner already has a business record
      let business = await Business.findOne({ partnerId });
      
      // If no business record exists, create one
      if (!business) {
        business = await Business.create({
          partnerId,
          businessType: 'function_hall',
          businessName: profileData.businessName,
          isActive: true
        });
      }
      
      // Create function hall with reference to business
      functionHall = await FunctionHall.create({
        ...profileData,
        partner: partnerId,
        businessId: business._id
      });
    }
    
    res.status(200).json({
      success: true,
      data: functionHall,
      message: 'Function hall profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating function hall profile:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while updating function hall profile',
      error: error.message
    });
  }
};

// Upload function hall photos
exports.uploadFunctionHallPhotos = async (req, res) => {
  try {
    const partnerId = req.user.id;
    
    // Ensure the function hall exists
    const functionHall = await FunctionHall.findOne({ partner: partnerId });
    
    if (!functionHall) {
      return res.status(404).json({ 
        success: false, 
        message: 'Function hall profile not found' 
      });
    }
    
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }
    
    const uploadPromises = req.files.map(async (file) => {
      // Upload to Cloudinary (or your preferred storage)
      const result = await cloudinaryUploader(file.path, 'function-halls');
      
      // Return structured photo object
      return {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 15),
        url: result.secure_url,
        name: file.originalname,
        category: req.body.category || 'other'
      };
    });
    
    // Wait for all uploads to complete
    const newPhotos = await Promise.all(uploadPromises);
    
    // Add new photos to the existing ones
    functionHall.photos = [...functionHall.photos, ...newPhotos];
    await functionHall.save();
    
    res.status(200).json({
      success: true,
      data: newPhotos,
      message: 'Photos uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading function hall photos:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading photos',
      error: error.message
    });
  }
};

// Delete function hall photo
exports.deletePhoto = async (req, res) => {
  try {
    const partnerId = req.user.id;
    const { photoId } = req.params;
    
    // Find the function hall profile
    const functionHall = await FunctionHall.findOne({ partner: partnerId });
    
    if (!functionHall) {
      return res.status(404).json({ 
        success: false, 
        message: 'Function hall profile not found' 
      });
    }
    
    // Remove the photo
    functionHall.photos = functionHall.photos.filter(photo => photo.id !== photoId);
    await functionHall.save();
    
    res.status(200).json({
      success: true,
      message: 'Photo deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting function hall photo:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting photo',
      error: error.message
    });
  }
};

// Get function hall venues
exports.getVenues = async (req, res) => {
  try {
    const partnerId = req.user.id;
    
    const functionHall = await FunctionHall.findOne({ partner: partnerId });
    
    if (!functionHall) {
      return res.status(404).json({ 
        success: false, 
        message: 'Function hall profile not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: functionHall.venues
    });
  } catch (error) {
    console.error('Error fetching function hall venues:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching venues',
      error: error.message
    });
  }
};

// Update function hall availability
exports.updateAvailability = async (req, res) => {
  try {
    const partnerId = req.user.id;
    const availabilityData = req.body;
    
    // Find the function hall profile
    const functionHall = await FunctionHall.findOne({ partner: partnerId });
    
    if (!functionHall) {
      return res.status(404).json({ 
        success: false, 
        message: 'Function hall profile not found' 
      });
    }
    
    // Update availability
    functionHall.availability = availabilityData;
    await functionHall.save();
    
    res.status(200).json({
      success: true,
      message: 'Availability updated successfully'
    });
  } catch (error) {
    console.error('Error updating function hall availability:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating availability',
      error: error.message
    });
  }
}; 