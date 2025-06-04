const floorSchema = require('../models/floor.model');

exports.getfloors = async (req, res) => {
    try {
        const {floor} = req.query

        const allFloors = await floorSchema.find()

        if(!floor || floor === 'all'){
            return res.status(200).json({
                message : "Get floors Successfully",
                data: allFloors.map(f=>f.name)
            })
        }else{
            const filterrdFloor = allFloors.filter(f=>f.name === floor)
            return res.status(200).json({
                message:`Get floor ${floor} Successfully`,
                data:filterrdFloor.map(f=>f.name)
            })
        }   

    } catch (error) {
        console.error('Error fetching floors:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}