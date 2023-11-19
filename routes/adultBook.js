const express = require("express");
const mongoose = require("mongoose");
const {AdultBook, validateBook } = require("../models/bookModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const auth = require("../middlwares/auth");

const { Types } = mongoose;
const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "books/adultBooks/"); // Set the destination folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file (e.g., use the book's title or a random string)
    const uniqueFilename = Date.now() + "-" + file.originalname;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

router.get("/books", async (req, res) => {
  try {
    const books = await AdultBook.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to retrieve books" });
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const book = await AdultBook.findById(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const bookImagePath = book.image;
    const bookContentPath = book.content;

    if (!bookImagePath || !bookContentPath) {
      return res
        .status(400)
        .json({ error: "Book image or content path not found" });
    }

    // Read the image and content files as binary data
    const imageFile = fs.readFileSync(bookImagePath);
    const contentFile = fs.readFileSync(bookContentPath);

    // Prepare book details
    const bookDetails = {
      title: book.title,
      description: book.description,
      category: book.category,
      image: imageFile.toString("base64"), // Convert to base64 for client display
      content: contentFile.toString("base64"), // Convert to base64 for client display
    };

    res.status(200).json(bookDetails);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to retrieve book details" });
  }
});

router.post(
  "/books",
  auth(),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "content", maxCount: 1 },
  ]),
  async (req, res) => {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { title, description, category } = req.body;

    try {
      const newBook = new AdultBook({
        title,
        description,
        category,
      });

      // Handle the image
      if (req.files && req.files["image"]) {
        newBook.image = req.files["image"][0].path;
      }

      // Handle the content
      if (req.files && req.files["content"]) {
        newBook.content = req.files["content"][0].path;
      }

      await newBook.save();
      res.status(200).send(newBook);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Failed to create the book" });
    }
  }
);

router.put(
  "/books/:id",
  auth(),
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { title, description, category } = req.body;

    try {
      const book = await AdultBook.findById(id).exec();

      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      // Update the book metadata
      if (title) {
        book.title = title;
      }
      if (description) {
        book.description = description;
      }
      if (category) {
        book.category = category;
      }

      // Handle the updated image
      if (req.file) {
        book.image = req.file.path;
      }

      // No need to handle the updated content in the PUT route

      await book.save();

      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Failed to update the book" });
    }
  }
);

router.delete("/books/:id", auth(), async (req, res) => {
  const { id } = req.params;

  try {
    const book = await AdultBook.findById(id).exec();

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Get the path of the book content file
    const bookContentPath = book.content;
    const bookImagePath = book.image;

    if (bookContentPath) {
      // Delete the book content file from your server's storage
      fs.unlinkSync(bookContentPath);
    }
    if (bookImagePath){
        fs.unlinkSync(bookImagePath)
      }
    // Delete the book document from the database
    await AdultBook.findByIdAndDelete(id).exec();

    res.status(204).json("Successfully deleted"); // Successfully deleted
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to delete the book" });
  }
});

module.exports = router;
