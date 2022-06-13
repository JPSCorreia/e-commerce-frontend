import * as yup from 'yup';

export const reviewSchema = yup.object().shape({
  name: yup.string().required('Name is required.'),
  comment: yup.string().required('Comment is required.'),
  rating: yup.string().required('Rating is required').min(1).max(5),
})