exports.getbuildings = async (req, res) => {
    try {
        const allbuilding = [
             { id: 'cnx-1', name: 'ตึกเชียงใหม่ 1', building: 'cnx' },
            { id: 'cnx-2', name: 'ตึกเชียงใหม่ 2', building: 'cnx' },
            { id: 'bkk-1', name: 'ตึกกรุงเทพ 1', building: 'bkk' },
            { id: 'bkk-2', name: 'ตึกกรุงเทพ 2', building: 'bkk' },
            { id: 'kkc-1', name: 'ตึกขอนแก่น 1', building: 'kkc' },
            { id: 'kkc-2', name: 'ตึกขอนแก่น 2', building: 'kkc' },
            { id: 'hdy-1', name: 'ตึกหาดใหญ่ 1', building: 'hdy' },
            { id: 'hdy-2', name: 'ตึกหาดใหญ่ 2', building: 'hdy' },
            { id: 'sri-1', name: 'ตึกสระบุรี 1', building: 'sri' }
        ]

        const {building} = req.query;

        if (!building || building === 'all') {
            return res.status(200).json({
                success: true,
                data: allbuilding.map(b => b.name),
            });
        }else{
            const filteredBuildings = allbuilding.filter(b => b.building === building);

            return res.status(200).json({
                success: true,
                data: filteredBuildings.map(b => b.name)
            });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error fetching buildings", error });
    }
}