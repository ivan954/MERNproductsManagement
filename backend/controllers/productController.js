import Product from "../model/productModel.js";

//@desc Fetch all products
//@route Get /api/products
const getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (error) {
    console.log(error.message);
  }

  if (!products) {
    return res.status(404).json({ message: "NO PRODUCT found" });
  }

  return res.status(200).json({ products });
};

//@desc Fetch singel product
//@route Get /api/products/:id
const getProductById = async (req, res, next) => {
  let product;
  const id = req.params.id;
  try {
    product = await Product.findById(id);
  } catch (error) {
    console.log(error.message);
  }

  if (!product) {
    return res.status(404).json({ message: "NO PRODUCT found" });
  }

  return res.status(200).json(product);
};

//@desc Create a product
//@route POST /api/products
const createProduct = async (req, res, next) => {
  let product;
  const {
    name,
    catalogNumber,
    description,
    productType,
    marketingData,
    price,
    image,
  } = req.body;
  try {
    product = new Product({
      name: name,
      catalogNumber: catalogNumber,
      description: description,
      productType: productType,
      marketingData: marketingData,
      price: price,
      image: image,
    });
    if (name === "" || catalogNumber === "" || price === "") {
      return res
        .status(500)
        .json({ message: "Name Catalog Number and Price required !!!" });
    }

    await product.save();
  } catch (error) {
    console.log(error);
  }
  if (!product) {
    return res.status(500).json({ message: "Unable to Add" });
  }
  return res.status(201).json({ product });
};

//@desc Update a product
//@route PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  let product;
  const id = req.params.id;
  const {
    name,
    catalogNumber,
    description,
    productType,
    marketingData,
    price,
    image,
  } = req.body;
  try {
    product = await Product.findByIdAndUpdate(id, {
      name: name,
      catalogNumber: catalogNumber,
      description: description,
      productType: productType,
      marketingData: marketingData,
      price: price,
      image: image,
    });

    product = await product.save();
  } catch (error) {
    console.log(error);
  }
  if (!product) {
    return res.status(404).json({ message: "Unable to update by this ID" });
  }
  return res.status(200).json({ product });
};

//@desc Delete a product
//@route Delete /api/products/:id
const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  let product;
  try {
    product = await Product.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  if (!product) {
    return res.status(404).json({ message: "Unable to delete by this ID" });
  }
  return res.status(200).json({ message: "Product Successfuly Deleted" });
};

export {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
