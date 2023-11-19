const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for ChildBook
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: String,
  content: String,
});


const ChildBook = mongoose.model("ChildBook", bookSchema);
const TeenagerBook = mongoose.model("TeenagerBook", bookSchema);
const AdultBook = mongoose.model("AdultBook", bookSchema);

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string(),
    content: Joi.string(),
  });

  return schema.validate(book);
}


module.exports.validateBook = validateBook;
module.exports.ChildBook = ChildBook;
module.exports.TeenagerBook = TeenagerBook;
module.exports.AdultBook = AdultBook;
