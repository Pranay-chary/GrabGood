import * as yup from 'yup';

const phoneRegExp = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const userSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  role: yup.string().oneOf(['admin', 'editor', 'field_staff'], 'Invalid role').required('Role is required'),
  password: yup.string()
    .when('isNew', {
      is: true,
      then: yup.string()
        .matches(passwordRegExp, 'Password must contain at least 8 characters, one letter and one number')
        .required('Password is required'),
    }),
});

export const listingSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  address: yup.string().required('Address is required'),
  contact: yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Contact number is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  businessType: yup.string().required('Business type is required'),
  isPremium: yup.boolean(),
  status: yup.string()
    .oneOf(['draft', 'pending_verification', 'active', 'inactive'], 'Invalid status')
    .required('Status is required'),
});

export const dealSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  startDate: yup.date()
    .min(new Date(), 'Start date cannot be in the past')
    .required('Start date is required'),
  endDate: yup.date()
    .min(yup.ref('startDate'), 'End date must be after start date')
    .required('End date is required'),
  discount: yup.string().required('Discount is required'),
  status: yup.string()
    .oneOf(['active', 'scheduled', 'expired'], 'Invalid status')
    .required('Status is required'),
  listingIds: yup.array()
    .of(yup.number())
    .min(1, 'At least one listing must be selected'),
}); 