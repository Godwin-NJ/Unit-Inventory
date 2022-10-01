const createProduct = async (req, res) => {
  res.send("create product");
};

const createSingleProduct = async (req, res) => {
  res.send("createSingleProduct");
};

const getAllProduct = async (req, res) => {
  res.send("getAllProduct");
};

const getSingleproduct = async (req, res) => {
  res.send("get single product");
};

module.exports = {
  createProduct,
  createSingleProduct,
  getAllProduct,
  getSingleproduct,
};
