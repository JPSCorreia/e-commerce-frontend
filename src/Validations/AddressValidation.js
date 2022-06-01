import * as yup from 'yup';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const addressSchema = yup.object().shape({

  fullName: yup.string().required('Full name is required.'),
  phoneNumber: yup.string().required('Phone number is required.').matches(phoneRegExp, 'Phone number is not valid.'),
  postcode: yup.string().required('Postcode is required.').min(4, 'Postocode is too short.').max(10, 'Postcode is too long.'),
  address: yup.string('Address is required.').required(),
  city: yup.string('City is required.').required()
})