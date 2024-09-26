import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  imageUrl: yup.string().url('Invalid URL').required('Image URL is required'),
  name: yup.string().required('Name is required'),
  count: yup.number().positive('Count must be positive').required('Count is required'),
  size: yup.object().shape({
    width: yup.number().positive('Width must be positive').required('Width is required'),
    height: yup.number().positive('Height must be positive').required('Height is required'),
  }).required('Size is required'),
  weight: yup.number().positive('Weight must be positive').required('Weight is required'),
});
