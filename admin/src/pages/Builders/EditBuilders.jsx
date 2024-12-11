import { Button, Grid, TextField, ToggleButton, Rating, IconButton, Box } from '@mui/material';
import Input from 'components/Input';
import PageLayout from 'layouts/PageLayout';
import React, { useEffect, useState } from 'react';
import Typography from 'components/Typography';
import toast from 'react-hot-toast';
import { useGetBuildersById, useUpdateBuilders } from 'queries/ProductQuery';
import { useNavigate, useParams } from 'react-router-dom';
import ImageList from './ImageList';
import { Delete } from '@mui/icons-material';

const EditBuilders = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const { data, isLoading } = useGetBuildersById({ id });


  useEffect(() => {
    if (data?.data) {
      setDetails(data.data);
    }
  }, [data]);

  const { mutateAsync: updateBuilders, isLoading: loading } = useUpdateBuilders();
  // const { mutateAsync: deleteBuilders, isLoading: deleting } = useDeleteBuilders();

  const handleChange = (e) => {
    setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log('details', details);

    try {
      const formData = new FormData();
      const image = details?.image?.filter((image) => typeof (image) === 'string');
      formData.append('image', JSON.stringify(image));
      details?.image?.forEach((image) => {
        if (typeof (image) === 'object') {
          formData.append('images', image, image.name);
        }
      });
      for (const key in details) {
        // if (details.hasOwnProperty(key) && key !== "image" && key !== "Spec" && key !== "configurations" && key !== "faqs" && key !== "unit" && key !== "ExpertOpinions" && key !== "reviews" && key !== "address") {
        if (details.hasOwnProperty(key) && key !== "image" && key !== "faqs" && key !== "reviews" && key !== "address") {
          formData.append(key, details[key]);
        }
      }
      // details?.ExpertOpinions?.forEach(fit => {
      //   if (fit === '') {

      //   } else {
      //     return formData.append('ExpertOpinions', fit)
      //   }
      // });

      // details?.configurations?.forEach(si => {
      //   if (si.configuration === '') {

      //   } else {
      //     formData.append('configuration', si.configuration);
      //     formData.append('configurationDetails', si.details);
      //   }

      // });
      details?.faqs?.forEach(si => {
        if (si.questions === '') {

        } else {
          formData.append('questions', si.questions);
          formData.append('answer', si.answer);
        }

      });
      // details?.unit?.forEach(si => {
      //   if (si.unitType === '') {

      //   } else {
      //     formData.append('unitType', si.unitType);
      //     formData.append('configurationSize', si.configurationSize);
      //   }
      // });
      // details?.Spec?.forEach(specif => {
      //   if (specif.Specifications === '') {

      //   } else {
      //     formData.append('Specifications', specif.Specifications);
      //     formData.append('SpecificationsDetails', specif.SpecificationsDetails);
      //   }
      // });
      details?.reviews?.forEach(review => {
        if (review.name === '') {

        } else {
          formData.append(`reviewsName`, review.name);
          formData.append(`reviewsRating`, review.rating);
          formData.append(`reviewsReview`, review.review);
        }
      });

      details?.address?.forEach((address) => {
        if (address.street) {
          formData.append('addressStreet', address.street);
          formData.append('addressCity', address.city);
          formData.append('addressState', address.state);
          formData.append('addressZip', address.zip);
          formData.append('addressCountry', address.country);
          formData.append('addressPhone', address.phone);
        }
      });

      updateBuilders(formData)
        .then((res) => {
          if (res) {
            toast.success(res?.message ?? "Builders updated successfully");
            navigate('/builders');
          }
        })
        .catch((err) => {
          toast.error(err?.message ?? "Something went wrong");
        });
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDelete = () => {
  //   deleteBuilders(details)
  //     .then((res) => {
  //       if (res) {
  //         toast.success(res?.message ?? "Builders deleted successfully");
  //         navigate('/builders');
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error(err?.message ?? "Something went wrong");
  //     });
  // };




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
  //   setDetails(prevData => ({ ...prevData, configurations: [...prevData.configurations, { configuration: '', details: '' }] }));
  // };
  // const handleconfigurationChange = (index, field, value) => {
  //   const newconfiguration = [...details.configurations];
  //   newconfiguration[index] = { ...newconfiguration[index], [field]: value };;
  //   setDetails(prevData => ({ ...prevData, configurations: newconfiguration }));
  // };

  // const handleRemoveconfiguration = (index) => {
  //   const newconfiguration = details.configurations.filter((_, i) => i !== index);
  //   setDetails(prevData => ({ ...prevData, configurations: newconfiguration }));
  // };




  const handleAddFAQs = () => {
    setDetails(prevData => ({ ...prevData, faqs: [...prevData.faqs, { questions: '', answer: '' }] }));
  };
  const handleFAQsChange = (index, field, value) => {
    const newFAQs = [...details.faqs];
    newFAQs[index] = { ...newFAQs[index], [field]: value };;
    setDetails(prevData => ({ ...prevData, faqs: newFAQs }));
  };

  const handleRemoveFAQs = (index) => {
    const newFAQs = details.faqs.filter((_, i) => i !== index);
    setDetails(prevData => ({ ...prevData, faqs: newFAQs }));
  };


  // const handleUnitAddconfiguration = () => {
  //   setDetails(prevData => ({ ...prevData, unit: [...prevData.unit, { unitType: '', configurationSize: '' }] }));
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
  //   setDetails(prevData => ({ ...prevData, Spec: [...prevData.Spec, { Specifications: '', SpecificationsDetails: '' }] }));
  // };
  // const handleSpecificationsChange = (index, field, value) => {
  //   const newconfiguration = [...details.Spec];
  //   newconfiguration[index] = { ...newconfiguration[index], [field]: value };;
  //   setDetails(prevData => ({ ...prevData, Spec: newconfiguration }));
  // };

  // const handleSpecificationsRemove = (index) => {
  //   const newconfiguration = details.Spec.filter((_, i) => i !== index);
  //   setDetails(prevData => ({ ...prevData, Spec: newconfiguration }));
  // };


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
      address: [...prevData.address, { street: '', city: '', state: '', zip: '', country: '', phone: '' }],
    }));
  };

  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...details.address];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setDetails((prevData) => ({ ...prevData, address: newAddresses }));
  };

  const handleRemoveAddress = (index) => {
    const newAddresses = details.address.filter((_, i) => i !== index);
    setDetails((prevData) => ({ ...prevData, address: newAddresses }));
  };
  // useEffect(() => {
  //   if (isSingleType) {
  //     details?.stock && setDetails(prevData => ({ ...prevData, stock: '' }));
  //   } else {
  //     details?.sizes && setDetails(prevData => ({ ...prevData, sizes: [{ sizes: '', quantity: '' }] }));
  //   }
  // }, [isSingleType])
  return (
    <PageLayout title={'Edit Builders'}>
      {isLoading ? <Typography fontSize={14} sx={{ paddingX: 5 }}>loading...</Typography> :
        <Grid container spacing={5} display={'flex'} direction={'row'} p={8}>
          <Grid item container spacing={2} xs={12} sm={12} md={6} py={5}>
            <Grid item xs={12} >
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
            <Grid item xs={12} >
              <Input
                required
                disabled
                placeholder="Projects"
                id="projects"
                name="projects"
                value={details?.projects?.name || ''}
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
                {details?.configurations?.map((configuration, index) => (
                  <Grid item xs={12} key={index}>
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
                      {details.configurations.length > 1 && (
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
                {details?.unit?.map((unit, index) => (
                  <Grid item xs={12} key={index}>
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
                        value={unit.configurationSize}
                        onChange={(e) => handleUnitConfigurationChange(index, 'configurationSize', e.target.value)}
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
                {details?.Spec?.map((spec, index) => (
                  <Grid item xs={12} key={index}>
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
                        value={spec.SpecificationsDetails}
                        onChange={(e) => handleSpecificationsChange(index, 'SpecificationsDetails', e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                      />
                      {details.Spec.length > 1 && (
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
                placeholder="Ongoing Builders"
                name="ongoing"
                value={details?.ongoing || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Input
                placeholder="Upcoming Builders"
                name="upcoming"
                value={details?.upcoming || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Input
                placeholder="Completed Builders"
                name="completed"
                value={details?.completed || ''}
                onChange={handleChange}
              />
            </Grid> */}
            <Grid item xs={12}>
              <Typography variant="h6">Addresses</Typography>
              {details?.address?.map((address, index) => (
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
                  {details.address.length > 1 && (
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
                {details?.faqs?.map((FAQs, index) => (
                  <Grid item xs={12} key={index}>
                    <Box key={index} display="flex" alignItems="center">
                      <TextField
                        placeholder={`questions ${index + 1}`}
                        value={FAQs.questions}
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
                      {details.faqs.length > 1 && (
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
              {details?.reviews?.map((review, index) => (
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



            <Grid item xs={12} sm={6}>
              <Typography variant="caption">
                Builders status &nbsp;
              </Typography>
              <ToggleButton
                value={details?.isAvailable}
                selected={details?.isAvailable}
                onChange={() => {
                  setDetails(prev => ({ ...prev, isAvailable: !details?.isAvailable }))
                }}
              >
                {details?.isAvailable ? 'Active' : 'Blocked'}
              </ToggleButton>
            </Grid>
            <Grid item xs={12} sm={12} mt={'auto'}>
              <Grid item xs={12}>
                <Button onClick={handleSubmit}>Update Builders</Button>

                {/* <Button color="secondary" onClick={handleDelete}>DELETE Builders</Button> */}
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item container spacing={2} xs={12} sm={12} md={6}>
            <ImageList details={details?.image} setDetails={setDetails} />
          </Grid> */}

          <Grid item container spacing={2} xs={12} sm={12} md={6}>
            <Grid sx={{ width: '100%' }}>
              <ImageList data={details?.image} dispatch={setDetails} />
            </Grid>
          </Grid>
        </Grid>}
    </PageLayout>
  );
};

export default EditBuilders;
