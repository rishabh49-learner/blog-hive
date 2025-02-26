const upload = require("../middleware/imageUpload");
const asyncHandler = require("express-async-handler");

const handleImageUpload = asyncHandler(async (req, res) => {
  try {
    const uploadPromise = () =>
      new Promise((resolve, reject) => {
        upload.single("image")(req, res, (err) => {
          if (err) {
            return reject(err);
          }
          if (!req.file) {
            return reject(new Error("Image not provided"));
          }
          resolve(req.file);
        });
      });

    const file = await uploadPromise();

    const imageUrl = file.path;

    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  handleImageUpload,
};
