exports.getFloors = async (req, res) => {
  try {
    const allFloors = [
      { id: "cnx-1-1", name: "ชั้น 3", floor: "cnx-1" },
      { id: "cnx-1-2", name: "ชั้น 4", floor: "cnx-1" },
      { id: "cnx-2-1", name: "ชั้น 1", floor: "cnx-2" },
      { id: "bkk-1-1", name: "ชั้น 1", floor: "bkk-1" },
      { id: "bkk-1-2", name: "ชั้น 2", floor: "bkk-2" },
      { id: "kkc-1-1", name: "ชั้น 1", floor: "kkc-1" },
      { id: "kkc-1-2", name: "ชั้น 2", floor: "kkc-2" },
      { id: "hdy-1-1", name: "ชั้น 1", floor: "hdy-1" },
      { id: "hdy-1-2", name: "ชั้น 2", floor: "hdy-2" },
      { id: "sri-1-1", name: "ชั้น 1", floor: "sri-1" },
      { id: "sri-1-2",name: "ชั้น 2", floor: "sri-2" },
    ];

    const { floor } = req.query;

    if (!floor || floor === "all") {
      return res.status(200).json({
        message:"Get floor Successfully",
        data: allFloors.map((f) => f.name),
      });
    } else {
      const filteredfloors = allFloors.filter(
        (b) => b.floor === floor
      );

      return res.status(200).json({
       message:`Get floor ${floor} Successfully`,
        data: filteredfloors.map((f) => ({ id: f.id, name: f.name })),
      });
    }

  } catch (error) {
    return res.status(500).json({ message: "Error fetching floors", error });
  }
};
