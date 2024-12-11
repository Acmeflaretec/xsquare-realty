import { Autocomplete, Button, Grid, TextField, IconButton,Rating } from '@mui/material'
import Box from 'components/Box'
import Input from 'components/Input'
import PageLayout from 'layouts/PageLayout'
import React, {  useState } from 'react'
import ImageList from './ImageList';
import Typography from 'components/Typography'
import { useGetSelectProjects ,useAddBuilders} from 'queries/ProductQuery'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Delete } from '@mui/icons-material';

const AddBuilders = () => {
  const navigat = useNavigate()
  const [details, setDetails] = useState({
    // ExpertOpinions: [''],
    // configuration: [{ configuration: '', details: '' }],
    // unit: [{ unitType: '', size: '' }],
    // spec: [{ Specifications: '', details: '' }],
    addresses: [{ street: '', city: '', state: '', zip: '', country: '', phone: '' }],
    FAQs: [{ questions: '', answer: '' }],
    reviews: [{ name: '', rating: 0, review: '' }],
  })
  const { data, isLoading } = useGetSelectProjects({ pageNo: 1, pageCount: 100 });
  const { mutateAsync: AddBuilders, isLoading: loading } = useAddBuilders()
  const handleChange = (e) => {
    setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [disable, setDisable] = useState(false)
  
  const [projects, setProjects] = useState()

  const handleSubmit = () => {

    try {

      if (!details?.name) {
        return toast.error("name is required")
      }
      if (!details?.subheading) {
        return toast.error("name is subheading")
      }
      if (!projects?._id) {
        return toast.error("projects is required")
      }
      if (!details?.image) {
        return toast.error("image is required")
      }
      if (!details?.description) {
        return toast.error("description is required")
      }
      
      setDisable(true)
      const formData = new FormData();
      details?.image?.forEach((image) => {
        formData.append('images', image, image.name);
      });
      // for (const key in details) {
      //   // if (details.hasOwnProperty(key) && key !== "image" && key !== "spec" && key !== "configuration" && key !== "FAQs" && key !== "unit" && key !== "ExpertOpinions" && key !== "reviews"  ) {
      //   if (details.hasOwnProperty(key) && key !== "image"  && key !== "FAQs" && key !== "reviews"  ) {
      //     formData.append(key, details[key]);
      //   }
      // }
      for (const key in details) {
        if (details.hasOwnProperty(key) && !['image', 'FAQs', 'reviews', 'addresses'].includes(key)) {
          formData.append(key, details[key]);
        }
      }
      formData.append('projects', projects?._id);
      // details?.ExpertOpinions?.forEach(fit => {
      //   if (fit === '') {

      //   } else {
      //     return formData.append('ExpertOpinions', fit)
      //   }
      // });
     
      // details?.configuration?.forEach(si => {
      //   if (si.configuration === '') {

      //   } else {
      //     formData.append('configuration', si.configuration);
      //     formData.append('configurationDetails', si.details);
      //   }

      // });
      
      // details?.unit?.forEach(si => {
      //   if (si.unitType === '') {

      //   } else {
      //     formData.append('unitType', si.unitType);
      //     formData.append('configurationSize', si.size);
      //   }
      // });
      // details?.spec?.forEach(specif => {
      //   if (specif.Specifications === '') {

      //   } else {
      //     formData.append('Specifications', specif.Specifications);
      //     formData.append('SpecificationsDetails', specif.details);
      //   }
      // });
      details?.FAQs?.forEach(si => {
        if (si.questions === '') {

        } else {
          formData.append('questions', si.questions);
          formData.append('answer', si.answer);
        }

      });
      details?.reviews?.forEach(review => {
        if (review.name === '') {

        } else {
          formData.append(`reviewsName`, review.name);
          formData.append(`reviewsRating`, review.rating);
          formData.append(`reviewsReview`, review.review);
        }
      });
      details?.addresses?.forEach((address) => {
        if (address.street) {
          formData.append('addressStreet', address.street);
          formData.append('addressCity', address.city);
          formData.append('addressState', address.state);
          formData.append('addressZip', address.zip);
          formData.append('addressCountry', address.country);
          formData.append('addressPhone', address.phone);
        }
      });
      
      AddBuilders(formData)
        .then((res) => {
          toast.success(res?.message ?? "Builders added");
          setDisable(false)
          navigat('/builders')
        })
        .catch((err) => {
          toast.error(err?.message ?? "Something went wrong");
          setDisable(false)
        });
    } catch (error) {
      setDisable(false)
      console.error(error)
    }
  }



  // const handleExpertOpinionsChange = (index, value) => {
  //   const newfeature = [...details.ExpertOpinions];
  //   newfeature[index] = value;
  //   setDetails(prevData => ({ ...prevData, ExpertOpinions: newfeature }));
  // };
  // const handleAddExpertOpinions = () => {
  //   setDetails(prevData => ({ ...prevData, ExpertOpinions: [...prevData.ExpertOpinions, ''] }));
  // };
  // const handleRemoveExpertOpinions = (index) => {
  //   const newfeature = details.ExpertOpinions.filter((_, i) => i !== index);
  //   setDetails(prevData => ({ ...prevData, ExpertOpinions: newfeature }));
  // };

  // const handleAddconfiguration = () => {
  //   setDetails(prevData => ({ ...prevData, configuration: [...prevData.configuration, { configuration: '', details: '' }] }));
  // };
  // const handleconfigurationChange = (index, field, value) => {
  //   const newconfiguration = [...details.configuration];
  //   newconfiguration[index] = { ...newconfiguration[index], [field]: value };;
  //   setDetails(prevData => ({ ...prevData, configuration: newconfiguration }));
  // };

  // const handleRemoveconfiguration = (index) => {
  //   const newconfiguration = details.configuration.filter((_, i) => i !== index);
  //   setDetails(prevData => ({ ...prevData, configuration: newconfiguration }));
  // };
  
  // const handleUnitAddconfiguration = () => { 
  //   setDetails(prevData => ({ ...prevData, unit: [...prevData.unit, { unitType: '', size: '' }] }));
  // };
  // const handleUnitConfigurationChange = (index, field, value) => {
  //   const newconfiguration = [...details.unit];
  //   newconfiguration[index] = { ...newconfiguration[index], [field]: value };;
  //   setDetails(prevData => ({ ...prevData, unit: newconfiguration }));
  // };

  // const handleUnitRemoveconfiguration = (index) => {
  //   const newconfiguration = details.unit.filter((_, i) => i !== index);
  //   setDetails(prevData => ({ ...prevData, unit: newconfiguration }));
  // };


  // const handleAddSpecifications = () => { 
  //   setDetails(prevData => ({ ...prevData, spec: [...prevData.spec, { Specifications: '', details: '' }] }));
  // };
  // const handleSpecificationsChange = (index, field, value) => { 
  //   const newconfiguration = [...details.spec];
  //   newconfiguration[index] = { ...newconfiguration[index], [field]: value };;
  //   setDetails(prevData => ({ ...prevData, spec: newconfiguration }));
  // };

  // const handleSpecificationsRemove = (index) => {
  //   const newconfiguration = details.spec.filter((_, i) => i !== index);
  //   setDetails(prevData => ({ ...prevData, spec: newconfiguration }));
  // };

  const handleAddFAQs = () => {
    setDetails(prevData => ({ ...prevData, FAQs: [...prevData.FAQs, { questions: '', answer: '' }] }));
  };
  const handleFAQsChange = (index, field, value) => {
    const newFAQs = [...details.FAQs];
    newFAQs[index] = { ...newFAQs[index], [field]: value };;
    setDetails(prevData => ({ ...prevData, FAQs: newFAQs }));
  };

  const handleRemoveFAQs = (index) => {
    const newFAQs = details.FAQs.filter((_, i) => i !== index);
    setDetails(prevData => ({ ...prevData, FAQs: newFAQs }));
  };


  const handleAddReview = () => {
    setDetails((prevData) => ({
      ...prevData,
      reviews: [...prevData.reviews, { name: '', rating: 0, review: '' }],
    }));
  };

  const handleReviewChange = (reviewIndex, field, value) => {
    const newReviews = [...details.reviews];
    newReviews[reviewIndex] = { ...newReviews[reviewIndex], [field]: value };
    setDetails((prevData) => ({ ...prevData, reviews: newReviews }));
  };

  const handleRemoveReview = (reviewIndex) => {
    const newReviews = details.reviews.filter((_, i) => i !== reviewIndex);
    setDetails((prevData) => ({ ...prevData, reviews: newReviews }));
  };


  const handleAddAddress = () => {
    setDetails((prevData) => ({
      ...prevData,
      addresses: [...prevData.addresses, { street: '', city: '', state: '', zip: '', country: '', phone: '' }],
    }));
  };

  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...details.addresses];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setDetails((prevData) => ({ ...prevData, addresses: newAddresses }));
  };

  const handleRemoveAddress = (index) => {
    const newAddresses = details.addresses.filter((_, i) => i !== index);
    setDetails((prevData) => ({ ...prevData, addresses: newAddresses }));
  };

    // useEffect(() => {
    //   if (isSingleType) {
    //     details?.stock && setDetails(prevData => ({ ...prevData, stock: '' }));
    //   } else {
    //     details?.configuration && setDetails(prevData => ({ ...prevData, configuration: [{ configuration: '', details: '' }] }));
    //   }
    // }, [isSingleType])
  return (
    <PageLayout
      title={'Add Builders'}
    >
      <Grid container spacing={5} display={'flex'} direction={'row'} p={8} >
        <Grid item container spacing={2} xs={12} sm={12} md={6} py={5}>
          <Grid item xs={12} sm={12} md={12}>
            <Input
              required
              placeholder="Item name"
              id="name"
              name="name"
              value={details?.name || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              required
              placeholder="Item subheading"
              id="subheading"
              name="subheading"
              value={details?.subheading || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Autocomplete
              id="projects-select"
              options={data?.data}
              value={projects}
              onChange={(event, newValue) => {
                setProjects(newValue);
              }}
              autoHighlight
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`${process.env.REACT_APP_API_URL}/uploads/${option?.image[0]}`}
                  />
                  <Typography color="inherit" variant="caption">
                    {option?.name} <br />
                    {option?.subheading}
                  </Typography>
                  <Typography sx={{ ml: 'auto' }} color={option?.isAvailable ? 'success' : 'error'} variant="caption">
                    {option?.isAvailable ? 'available' : 'NA'}
                  </Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Choose a projects"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              id="description"
              placeholder="More about"
              name="description"
              value={details?.description || ''}
              onChange={handleChange}
              multiline
              rows={5}
            />
          </Grid>       

          
          {/* <Grid item xs={12} >
            <Grid container direction="row">
              {details?.configuration?.map((configuration, index) => (
                <Grid item xs={12}  key={index}>
                  <Box key={index} display="flex" alignItems="center">
                    <TextField
                      placeholder={`Configuration ${index + 1}`}
                      value={configuration.configuration}
                      onChange={(e) => handleconfigurationChange(index, 'configuration', e.target.value)}
                      fullWidth
                      margin="normal"
                      required
                      style={{ marginRight: '5px' }}
                    />
                    <TextField
                      placeholder="details"
                      value={configuration.details}
                      onChange={(e) => handleconfigurationChange(index, 'details', e.target.value)}
                      fullWidth
                      margin="normal"
                      required
                    />
                    {details.configuration.length > 1 && (
                      <IconButton onClick={() => handleRemoveconfiguration(index)}>
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                </Grid>
              ))}
              <Button onClick={handleAddconfiguration} variant="contained" color="primary" fullWidth className="mt-4">
                Add Configuration
              </Button>
            </Grid>
          </Grid>



          <Grid item xs={12} >
            <Grid container direction="row">
              {details?.unit?.map((unit , index) => (
                <Grid item xs={12}  key={index}>
                  <Box key={index} display="flex" alignItems="center">
                    <TextField
                      placeholder={`Unit Type ${index + 1}`}
                      value={unit.unitType}
                      onChange={(e) => handleUnitConfigurationChange(index, 'unitType', e.target.value)}
                      fullWidth
                      margin="normal"
                      required
                      style={{ marginRight: '5px' }}
                    />
                    <TextField
                      placeholder="Size in Sq.Ft"
                      value={unit.size}
                      onChange={(e) => handleUnitConfigurationChange(index, 'size', e.target.value)}
                      fullWidth
                      margin="normal"
                      required
                    />
                    {details.unit.length > 1 && (
                      <IconButton onClick={() => handleUnitRemoveconfiguration(index)}>
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                </Grid>
              ))}
              <Button onClick={handleUnitAddconfiguration} variant="contained" color="primary" fullWidth className="mt-4">
                Add Unit
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Input
              required
              placeholder="Location Embed url"
              id="location"
              name="location"
              value={details?.location || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} >
            <Grid container direction="row">
              {details?.spec?.map((spec , index) => (
                <Grid item xs={12}  key={index}>
                  <Box key={index} display="flex" alignItems="center">
                    <TextField
                      placeholder={`Specifications Type ${index + 1}`}
                      value={spec.Specifications}
                      onChange={(e) => handleSpecificationsChange(index, 'Specifications', e.target.value)}  
                      fullWidth
                      margin="normal"
                      required
                      style={{ marginRight: '5px' }}
                    />
                    <TextField
                      placeholder="Details"
                      value={spec.details}
                      onChange={(e) => handleSpecificationsChange(index, 'details', e.target.value)}
                      fullWidth
                      margin="normal"
                      required
                    />
                    {details.spec.length > 1 && (
                      <IconButton onClick={() => handleSpecificationsRemove(index)}>
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                </Grid>
              ))}
              <Button onClick={handleAddSpecifications} variant="contained" color="primary" fullWidth className="mt-4">
                Add Specifications
              </Button>
            </Grid>
          </Grid>


          <Grid item xs={12}>
            {details?.ExpertOpinions?.map((ExpertOpinions, index) => (
              <Box key={index} display="flex" alignItems="center">
                <TextField
                  placeholder={`Expert Opinions ${index + 1}`}
                  value={ExpertOpinions}
                  onChange={(e) => handleExpertOpinionsChange(index, e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                {details.ExpertOpinions.length > 1 && (
                  <IconButton onClick={() => handleRemoveExpertOpinions(index)}>
                    <Delete />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button onClick={handleAddExpertOpinions} variant="contained" color="primary" fullWidth className="mt-4">
            Expert Opinions
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Input
              id="BuilderDescription"
              placeholder="More about the Builder"
              name="BuilderDescription"
              value={details?.BuilderDescription || ''}
              onChange={handleChange}
              multiline
              rows={5}
            />
          </Grid>   
          <Grid item xs={12} sm={6} md={4}>
            <Input
              placeholder="Ongoing Projects"
              name="ongoing"
              value={details?.ongoing || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Input
              placeholder="Upcoming Projects"
              name="upcoming"
              value={details?.upcoming || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Input
              placeholder="Completed Projects"
              name="completed"
              value={details?.completed || ''}
              onChange={handleChange}
            />
          </Grid> */}

<Grid item xs={12}>
            <Typography variant="h6">Addresses</Typography>
            {details.addresses.map((address, index) => (
              <Box key={index} mt={2} display="flex" flexDirection="column">
                <TextField
                  placeholder="Street"
                  value={address.street}
                  onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  placeholder="Zip Code"
                  value={address.zip}
                  onChange={(e) => handleAddressChange(index, 'zip', e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  placeholder="Country"
                  value={address.country}
                  onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  placeholder="Phone Number"
                  value={address.phone}
                  onChange={(e) => handleAddressChange(index, 'phone', e.target.value)}
                  fullWidth
                  margin="normal"
                />
                {details.addresses.length > 1 && (
                  <IconButton onClick={() => handleRemoveAddress(index)}>
                    <Delete />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button
              onClick={handleAddAddress}
              variant="contained"
              color="primary"
              className="mt-4"
              fullWidth
            >
              Add Address
            </Button>
          </Grid>


          <Grid item xs={12} >
            <Grid container direction="row">
              {details?.FAQs?.map((FAQs, index) => (
                <Grid item xs={12}  key={index}>
                  <Box key={index} display="flex" alignItems="center">
                    <TextField
                      placeholder={`questions ${index + 1}`}
                      value={FAQs.questions }
                      onChange={(e) => handleFAQsChange(index, 'questions', e.target.value)}
                      fullWidth
                      margin="normal"
                      required
                      style={{ marginRight: '5px' }}
                    />
                    <TextField
                      placeholder="answer"
                      value={FAQs.answer}
                      onChange={(e) => handleFAQsChange(index, 'answer', e.target.value)}
                      fullWidth
                      margin="normal"
                      required
                    />
                    {details.FAQs.length > 1 && (
                      <IconButton onClick={() => handleRemoveFAQs(index)}>
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                </Grid>
              ))}
              <Button onClick={handleAddFAQs} variant="contained" color="primary" fullWidth className="mt-4">
                Add FAQs
              </Button>
            </Grid>
          </Grid>


          <Grid item xs={12}>
            <Typography variant="h6">Reviews</Typography>
            {details.reviews.map((review, index) => (
              <Box key={index} mt={2} display="flex" flexDirection="column">
                <TextField
                  placeholder="Reviewer Name"
                  value={review.name}
                  onChange={(e) =>
                    handleReviewChange(index, 'name', e.target.value)
                  }
                  fullWidth
                  margin="normal"
                />
                <Rating
                  value={review.rating}
                  onChange={(e, value) =>
                    handleReviewChange(index, 'rating', value)
                  }
                />
                <TextField
                  placeholder="Review"
                  value={review.review}
                  onChange={(e) =>
                    handleReviewChange(index, 'review', e.target.value)
                  }
                  fullWidth
                  margin="normal"
                  multiline
                  rows={3}
                />
                {details.reviews.length > 1 && (
                  <IconButton onClick={() => handleRemoveReview(index)}>
                    <Delete />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button
              onClick={handleAddReview}
              variant="contained"
              color="primary"
              className="mt-4"
              fullWidth
            >
              Add Review
            </Button>
          </Grid>
          

          



          

          



        </Grid>
        <Grid item container spacing={2} xs={12} sm={12} md={6} py={5}>
          <Grid xs={12}>
            <ImageList data={details?.image} dispatch={setDetails} />
          </Grid>
          <Grid item xs={12} sm={8}></Grid>
          <Grid item xs={12} sm={4} mt={'auto'}>
            <Button sx={{ mr: 0, width: '100%' }} onClick={handleSubmit} disabled={disable} variant='contained'>
              Add Builders
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PageLayout>
  )
}

export default AddBuilders