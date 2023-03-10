import mongoose from "mongoose";

const Schema = mongoose.Schema;

// default value for data is 7 days before today, 604800000 = 7 days in milliseconds
let date = new Date(Date.now() - 604800000);

const ProductSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  catalogNumber: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
  },
  productType: {
    type: String,
  },
  marketingData: {
    type: Date,
    default: date,
  },
  image: {
    type: String,
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
