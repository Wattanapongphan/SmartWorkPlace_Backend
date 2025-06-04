const zoneschema = require('../models/zone.model');

exports.getZones = async (req,res)=>{
    try {
            const {zone} = req.query
    
            const allZones = await zoneschema.find()
    
            if(!zone || zone === 'all'){
                return res.status(200).json({
                    message : "Get Zones Successfully",
                    data: allZones.map(z=>z.name)
                })
            }else{
                const filterrdZone = allZones.filter(z=>z.name === zone)
                return res.status(200).json({
                    message:`Get Zone ${zone} Successfully`,
                    data:filterrdZone.map(z=>z.name)
                })
            }   
    
        } catch (error) {
            console.error('Error fetching floors:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
}
