const Builders = require('../models/builders');


const getAdminbuilders = async (req, res) => {
  try {
    const { page = 1, perPage = 10, sortBy = 'createdAt', order = 'desc', search = '' } = req.query;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(perPage, 10),
      sort: { [sortBy]: order === 'desc' ? -1 : 1 }
    };

    const builders = await Builders.paginate(query, options);


    res.status(200).json(builders);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
};


const getbuildersById = async (req, res) => {
  try {
    const data = await Builders.findOne({ _id: req.params.id }).populate('projects')
    res.status(200).json({ data, message: 'builders found successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
}


const addbuilders = async (req, res) => {
  console.log('addbuilders');
  
  try {
    const { 
      name, subheading,description, questions, answer,reviewsName, reviewsRating, reviewsReview,
      projects,addressStreet,addressCity,addressState,addressZip,addressCountry,addressPhone,
      //  category, location,  BuilderDescription, ExpertOpinions, ongoing, upcoming, completed,
      // configuration, configurationDetails, unitType, configurationSize, Specifications, SpecificationsDetails,
     } = req?.body;


    // let configurationValue = [];
    // if (configuration) {
    //   const configurationArray = Array.isArray(configuration) ? configuration : [configuration];
    //   const DetailsArray = Array.isArray(configurationDetails) ? configurationDetails : [configurationDetails];
    //   const configurationInside = configurationArray.map((configuration, index) => ({
    //     configuration,
    //     details: DetailsArray[index]
    //   }));
    //   configurationValue = configurationInside[0]?.configuration ? configurationInside : undefined;
    // }


    let faqsValue = [];
    if (questions) {
      const questionsArray = Array.isArray(questions) ? questions : [questions];
      const answerArray = Array.isArray(answer) ? answer : [answer];
      const faqsInside = questionsArray.map((questions, index) => ({
        questions,
        answer: answerArray[index]
      }));
      faqsValue = faqsInside[0]?.questions ? faqsInside : undefined;
    }


    // let unitValue = [];
    // if (unitType) {
    //   const unitTypeArray = Array.isArray(unitType) ? unitType : [unitType];
    //   const configurationSizeArray = Array.isArray(configurationSize) ? configurationSize : [configurationSize];
    //   const configurationInside = unitTypeArray.map((unitType, index) => ({
    //     unitType,
    //     configurationSize: configurationSizeArray[index]
    //   }));
    //   unitValue = configurationInside[0]?.unitType ? configurationInside : undefined;
    // }


    // let spacunitValue = [];
    // if (Specifications) {
    //   const SpecificationsArray = Array.isArray(Specifications) ? Specifications : [Specifications];
    //   const SpecificationsDetailsArray = Array.isArray(SpecificationsDetails) ? SpecificationsDetails : [SpecificationsDetails];
    //   const configurationInside = SpecificationsArray.map((Specifications, index) => ({
    //     Specifications,
    //     SpecificationsDetails: SpecificationsDetailsArray[index]
    //   }));
    //   spacunitValue = configurationInside[0]?.Specifications ? configurationInside : undefined;
    // }
    let reviewValue = [];
    if (reviewsName) {
      const reviewsNameArray = Array.isArray(reviewsName) ? reviewsName : [reviewsName];
      const reviewsRatingArray = Array.isArray(reviewsRating) ? reviewsRating : [reviewsRating];
      const reviewsReviewArray = Array.isArray(reviewsReview) ? reviewsReview : [reviewsReview];
      const configurationInside = reviewsNameArray.map((name, index) => ({
        name,
        rating: reviewsRatingArray[index],
        review: reviewsReviewArray[index],
      }));

      reviewValue = configurationInside[0]?.name ? configurationInside : undefined;
    }
    let addressValue = []; 
    if (addressStreet) {
      const addressStreetArray = Array.isArray(addressStreet) ? addressStreet : [addressStreet];
      const addressCityArray = Array.isArray(addressCity) ? addressCity : [addressCity];
      const addressStateArray = Array.isArray(addressState) ? addressState : [addressState];
      const addressZipArray = Array.isArray(addressZip) ? addressZip : [addressZip];
      const addressCountryArray = Array.isArray(addressCountry) ? addressCountry : [addressCountry];
      const addressPhoneArray = Array.isArray(addressPhone) ? addressPhone : [addressPhone];
      const configurationInside = addressStreetArray.map((street, index) => ({
        
        street,
        city: addressCityArray[index],
        state: addressStateArray[index],
        zip: addressZipArray[index],
        country: addressCountryArray[index],
        phone: addressPhoneArray[index],
      }));

      addressValue = configurationInside[0]?.street ? configurationInside : undefined;
    }

    if (req.files.length != 0) {
      const builders = new Builders({
        // category, BuilderDescription, ExpertOpinions, ongoing, upcoming, completed, location,
        // configurations: configurationValue,  unit: unitValue, Spec: spacunitValue, 
        name, subheading,  description,faqs: faqsValue,reviews: reviewValue,projects,address:addressValue,
        image: req.files.map((x) => x.filename),
      });   
      await builders.save();
      res.status(200).json({ message: "Projects added successfully !" });
     
    } else {
      res.status(400).json({ message: "failed only jpg ,jpeg, webp & png file supported !" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
};

const updatebuilders = async (req, res) => {
  try {
    const { _id, image, isAvailable,name, subheading,description, questions, answer,reviewsName, reviewsRating,
       reviewsReview,projects,addressStreet,addressCity,addressState,addressZip,addressCountry,addressPhone,
      //  category, location,  BuilderDescription, ExpertOpinions, ongoing, upcoming, completed,
      // configuration, configurationDetails, unitType, configurationSize, Specifications, SpecificationsDetails, 
       } = req?.body

    // let configurationValue = [];
    // if (configuration) {
    //   const configurationArray = Array.isArray(configuration) ? configuration : [configuration];
    //   const DetailsArray = Array.isArray(configurationDetails) ? configurationDetails : [configurationDetails];
    //   const configurationInside = configurationArray.map((configuration, index) => ({
    //     configuration,
    //     details: DetailsArray[index]
    //   }));
    //   configurationValue = configurationInside[0]?.configuration ? configurationInside : undefined;
    // }


    let faqsValue = [];
    if (questions) {
      const questionsArray = Array.isArray(questions) ? questions : [questions];
      const answerArray = Array.isArray(answer) ? answer : [answer];
      const faqsInside = questionsArray.map((questions, index) => ({
        questions,
        answer: answerArray[index]
      }));
      faqsValue = faqsInside[0]?.questions ? faqsInside : undefined;
    }


    // let unitValue = [];
    // if (unitType) {
    //   const unitTypeArray = Array.isArray(unitType) ? unitType : [unitType];
    //   const configurationSizeArray = Array.isArray(configurationSize) ? configurationSize : [configurationSize];
    //   const configurationInside = unitTypeArray.map((unitType, index) => ({
    //     unitType,
    //     configurationSize: configurationSizeArray[index]
    //   }));
    //   unitValue = configurationInside[0]?.unitType ? configurationInside : undefined;
    // }


    // let spacunitValue = [];
    // if (Specifications) {
    //   const SpecificationsArray = Array.isArray(Specifications) ? Specifications : [Specifications];
    //   const SpecificationsDetailsArray = Array.isArray(SpecificationsDetails) ? SpecificationsDetails : [SpecificationsDetails];
    //   const configurationInside = SpecificationsArray.map((Specifications, index) => ({
    //     Specifications,
    //     SpecificationsDetails: SpecificationsDetailsArray[index]
    //   }));
    //   spacunitValue = configurationInside[0]?.Specifications ? configurationInside : undefined;
    // }
    let reviewValue = [];
    if (reviewsName) {
      const reviewsNameArray = Array.isArray(reviewsName) ? reviewsName : [reviewsName];
      const reviewsRatingArray = Array.isArray(reviewsRating) ? reviewsRating : [reviewsRating];
      const reviewsReviewArray = Array.isArray(reviewsReview) ? reviewsReview : [reviewsReview];
      const configurationInside = reviewsNameArray.map((name, index) => ({
        name,
        rating: reviewsRatingArray[index],
        review: reviewsReviewArray[index],
      }));
      reviewValue = configurationInside[0]?.name ? configurationInside : undefined;

    }
    let addressValue = []; 
    if (addressStreet) {
      const addressStreetArray = Array.isArray(addressStreet) ? addressStreet : [addressStreet];
      const addressCityArray = Array.isArray(addressCity) ? addressCity : [addressCity];
      const addressStateArray = Array.isArray(addressState) ? addressState : [addressState];
      const addressZipArray = Array.isArray(addressZip) ? addressZip : [addressZip];
      const addressCountryArray = Array.isArray(addressCountry) ? addressCountry : [addressCountry];
      const addressPhoneArray = Array.isArray(addressPhone) ? addressPhone : [addressPhone];
      const configurationInside = addressStreetArray.map((street, index) => ({
        
        street,
        city: addressCityArray[index],
        state: addressStateArray[index],
        zip: addressZipArray[index],
        country: addressCountryArray[index],
        phone: addressPhoneArray[index],
      }));

      addressValue = configurationInside[0]?.street ? configurationInside : undefined;
    }

    const images = JSON.parse(image) ?? []
    if (req?.files?.length != 0) {
      req?.files?.map((x) => images.push(x.filename))
    }

    await Builders.updateOne({ _id }, {
      $set: {
        // category, BuilderDescription, ExpertOpinions, ongoing, upcoming, completed, location,
        // configurations: configurationValue,  unit: unitValue, Spec: spacunitValue, 
        isAvailable, image: images,name, subheading,  description,faqs: faqsValue,reviews: reviewValue,
        address:addressValue,

      }
    })

    res.status(200).json({ message: "builders updated successfully !" });
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
}

const deletebuilders = async (req, res) => {
  try {
    await Builders.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'builders deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
}

const getSelectbuilders = async (req, res) => {
  try {
    const data = await Builders.find({isAvailable:true})
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getbuildersById,
  updatebuilders,
  addbuilders,
  deletebuilders,
  getAdminbuilders,
  getSelectbuilders,
}  