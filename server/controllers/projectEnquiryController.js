const ProjectEnquiry = require('../models/projectEnquiry');
const Project = require('../models/projects');

const createEnquiry = async (req, res) => {
    const { propertyType, bhkPreference, budgetRange, locationPreference, name, contactNumber, email, projectId } = req.body;

    try {
        const newEnquiry = await ProjectEnquiry.create({
            propertyType,
            bhkPreference,
            budgetRange,
            locationPreference,
            name,
            contactNumber,
            email,
            projectId,
        });

        res.status(201).json({ message: 'Enquiry created successfully', enquiry: newEnquiry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getEnquiries = async (req, res) => {
    const { page = 1, perPage = 10, sortBy = 'createdAt', order = 'desc', search = '' } = req.query;


    try {
        const query = search
            ? { name: { $regex: search, $options: 'i' } }
            : {};

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(perPage, 10),
            populate: { path: 'projectId', select: 'name location' },
            sort: { [sortBy]: order === 'desc' ? -1 : 1  },
        };

        const data = await ProjectEnquiry.paginate(query, options);

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getEnquiryDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const enquiry = await ProjectEnquiry.findById(id).populate('projectId');

        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }

        res.status(200).json(enquiry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateEnquiryStatus = async (req, res) => {
    console.log('updateEnquiryStatus');
    
    const { userId, newStatus } = req.body;
    console.log('userId, newStatus',userId, newStatus);

    try {
        const enquiry = await ProjectEnquiry.findById(userId);

        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }
         enquiry.isViewed = !enquiry.isViewed;

        await enquiry.save();

        res.status(200).json({ message: 'Enquiry status updated', enquiry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createEnquiry, getEnquiries, getEnquiryDetails, updateEnquiryStatus };
