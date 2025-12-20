export const getProducts = async (req, res, next) => {
  try {
    const {
      minAmount,
      maxAmount,
      category,
      inStock,
      minRatings,
      maxRatings,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = "1",
      limit = "10",
      searchQuery,
    } = req.query;

    const pipeline = [];
    const matchStage = {};

    // Price filter
    if (minAmount || maxAmount) {
      matchStage.price = {};
      if (minAmount) matchStage.price.$gte = parseFloat(minAmount);
      if (maxAmount) matchStage.price.$lte = parseFloat(maxAmount);
    }

    // Ratings filter
    if (minRatings || maxRatings) {
      matchStage.ratings = {};
      if (minRatings) matchStage.ratings.$gte = parseFloat(minRatings);
      if (maxRatings) matchStage.ratings.$lte = parseFloat(maxRatings);
    }

    // Category filter
    if (category) matchStage.category = category;

    // In-stock filter
    if (inStock !== undefined) {
      if (inStock === "true") matchStage.inStock = true;
      else if (inStock === "false") matchStage.inStock = false;
    }

    // First match for filters
    pipeline.push({ $match: matchStage });

    // Add regex search stage (if searchQuery exists)
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i"); // case-insensitive
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: searchRegex } },
            { category: { $regex: searchRegex } },
            // You can add more fields like { description: { $regex: searchRegex } } if available
          ],
        },
      });
    }

    // Sort stage
    const sortStage = {};
    sortStage[sortBy] = sortOrder === "desc" ? -1 : 1;
    pipeline.push({ $sort: sortStage });

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    pipeline.push({ $skip: (pageNum - 1) * limitNum });
    pipeline.push({ $limit: limitNum });

    // Run aggregation
    const data = await Product.aggregate(pipeline);

    res.status(200).json({
      status: "success",
      page: pageNum,
      limit: limitNum,
      results: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
      message: "Something went wrong",
    });
  }
};

/*

Final Aggregation Pipeline looks like

[
  {
    $match: {
      price: { $gte: 1000, $lte: 5000 },
      ratings: { $gte: 3 },
      category: "electronics",
      inStock: true
    }
  },
  {
    $match: {
      $or: [
        { name: { $regex: /laptop/i } },
        { category: { $regex: /laptop/i } }
      ]
    }
  },
  { $sort: { price: -1 } },
  { $skip: 5 },
  { $limit: 5 }
]


*/
