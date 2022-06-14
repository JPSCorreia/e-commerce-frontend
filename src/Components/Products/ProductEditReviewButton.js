import '../../Style/App.css';
import { useDispatch } from 'react-redux';
import { api } from '../../Features/routes';
import { useToast, Textarea, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, FormControl, FormLabel, FormErrorMessage, Button, useDisclosure } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import { reviewSchema } from '../../Validations/ReviewValidation';
import {RiPlayListAddFill} from 'react-icons/ri'
import { useFormik } from 'formik';
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from 'react'


function ProductEditReviewButton(props) {

  // React/Redux State/Action Management.
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const toast = useToast()
  // const [name, setName] = useState(props.review.full_name)
  // const [comment, setComment] = useState(props.review.comment)
  // const [rating, setRating] = useState(props.review.rating)


  // useEffect(() => {
  //   setName(props.review.full_name)
  //   setComment(props.review.comment)
  //   setRating(props.review.rating)
  // }, []) // eslint-disable-line react-hooks/exhaustive-deps


  const formik = useFormik({

    initialValues: {
      name: props.review.full_name,
      comment: props.review.comment,
      rating: props.review.rating
    },

    validationSchema: reviewSchema,

    onSubmit: async (values, actions) => {
      const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
      await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: 'openid'
      })

      // dispatch review
      await dispatch(api.reviews.editReview({
        token, 
        id: props.review.id,
        products_id: props.review.products_id,
        user_email: props.review.user_email,
        full_name: formik.values.name,
        comment: formik.values.comment,
        rating: formik.values.rating,
      }))  

      if (props.fromOrder) {
        // console.log('!')
        // setName(formik.values.name)
        // setComment(formik.values.comment)
        // setRating(formik.values.rating)
        // await dispatch(api.orderReviews.editReview({
        //   token, 
        //   id: props.review.id,
        //   products_id: props.review.products_id,
        //   user_email: props.review.user_email,
        //   full_name: formik.values.name,
        //   comment: formik.values.comment,
        //   rating: formik.values.rating,
        // }))
        await dispatch(api.orderReviews.getReviews({ token: token, order_id: props.orderId, user_email: user.email }))
      } else {
        await dispatch(api.reviews.getReviews({token, products_id: props.productsId})) 
      }

      toast({
        title: `Review Edited`,
        description: 'Your review was edited successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })  

      onClose();
      actions.resetForm();
    }
  })

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      formik.handleSubmit();
    }
  };

  const ratingChanged = (newRating) => {
    formik.setFieldValue('rating', newRating)
  };

  const buttonOpen = () => {
    onOpen();
    formik.setFieldValue('rating', props.review.rating)

  };



  return(
    <VStack
      display='flex'
      width={['90%','80%']}
      flexDirection='row'
      justifyContent='flex-start'
      ml='0.75rem'
      mb='0.5rem'
      as='form'
    >
      <Button 
        colorScheme='yellow' 
        className='button'
        onClick={buttonOpen}
        rightIcon={<RiPlayListAddFill />}
        size='sm'
      >
        Edit Review
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='3xl'
      >
      <ModalOverlay />
      <ModalContent width='90%'>
        <ModalHeader>Edit review</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={4} isInvalid={formik.errors.name && formik.touched.name}>  
            <FormLabel>Full name</FormLabel>
            <Input 
              id='form-name'
              name='name' 
              placeholder={props.review.full_name} 
              onKeyPress={handleKeypress}
              {...formik.getFieldProps('name')}
            />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl className='react-stars-edit' display='flex' mt={4} isInvalid={formik.errors.rating && formik.touched.rating}>
            <FormLabel marginBottom='0'>Overall rating:</FormLabel>
            <ReactStars
              className='react-stars-edit'
              id='react-stars-edit'
              name='rating'
              count={5}
              value={props.review.rating}
              onChange={ratingChanged}
              placeholder={props.review.rating} 
              size={21}
              color2={'#ffd700'} 
              onBlur={formik.handleBlur}
              // {...formik.getFieldProps('rating')}
            />
            <FormErrorMessage>{formik.errors.rating}</FormErrorMessage>
          </FormControl>
          <FormControl mt={3} isInvalid={formik.errors.comment && formik.touched.comment}>
            <FormLabel >Add a written review</FormLabel>
            <Textarea 
              id='form-comment'
              placeholder='What did you like or dislike? What did you use this product for?'
              name='comment'
              // onKeyPress={handleKeypress} 
              {...formik.getFieldProps('comment')}
            />
            <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={formik.handleSubmit} >
            Save
          </Button>
          <Button onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
      </Modal>
    </VStack>
  )

}

export default ProductEditReviewButton;