const Farmer = require('../Models/FarmerModel');

const getFarmerById = async (req, res) => {
    try {
        // Extract farmer ID from URL parameters
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).send({ error: 'Farmer ID is required' });
        }

        // Find farmer by ID
        const farmer = await Farmer.findById(id);

        // Check if farmer was found
        if (!farmer) {
            return res.status(404).send({ error: 'Farmer not found' });
        }

        // Send the farmer data
        res.send(farmer);
    } catch (error) {
        // Handle any errors
        res.status(500).send({ error: 'Server error' });
    }
};

const getFarmersByLocation = async (req, res) => {
    try {
        // Extract the search keyword from query parameters
        const searchKeyword = req.query.search || '';

        // Build the query object for search
        const query = searchKeyword
            ? { location: { $regex: searchKeyword, $options: 'i' } }
            : {}; // No search keyword, return all farmers

        // Find farmers based on the query
        const farmers = await Farmer.find(query);

        // Check if no farmers were found
        if (farmers.length === 0) {
            return res.status(404).send({ message: 'No farmers found for the specified location' });
        }

        // Send the list of farmers
        res.json(farmers);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: error.message });
    }
};

const getFarmers = async (req, res) => {
    try {
        // Extract the search keyword from query parameters
        const searchKeyword = req.query.search || '';

        // Build the query object for search
        const query = searchKeyword
            ? {
                $or: [
                    { name: { $regex: searchKeyword, $options: 'i' } },
                    { email: { $regex: searchKeyword, $options: 'i' } },
                ],
            }
            : {}; // No search keyword, return all farmers

        // Find farmers based on the query
        const farmers = await Farmer.find(query);

        // Send the list of farmers
        res.send(farmers);
    } catch (error) {
        // Handle any errors
        res.status(500).send({ error: 'Server error' });
    }
};


const registerFarmer = async (req, res) => {
    const { name, email, password, location } = req.body;
    try {

        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please Enter all the Fields");
        }

        const FarmerExits = await Farmer.findOne({ email });

        if (FarmerExits) {
            res.status(400);
            throw new Error("User already exists");
        }

        const f = await Farmer.create({
            name,
            email,
            password,
            location,
        });

        if (f) {
            res.status(201).json({
                _id: f._id,
                name: f.name,
                email: f.email,
                location: f.location
            });
        } else {
            res.status(400);
            throw new Error("User not found");
        }
    } catch (e) {
        res.json({
            msg: `{e.message}`
        })
    }
}

const updateFarmerDetails = async (req, res) => {

    try {
        const f = await Farmer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
        });
    } catch (err) {
        res.status(400).json({
            status: 'failure',
            message: err
        })
    }

};


module.exports = { registerFarmer, updateFarmerDetails, getFarmers, getFarmerById, getFarmersByLocation };