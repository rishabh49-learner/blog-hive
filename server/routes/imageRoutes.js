const express = require('express');
const router = express.Router();
const { handleImageUpload } = require('../controllers/imageController');

/**
 * @openapi
 * '/api/upload':
 *   post:
 *     tags:
 *       - Upload
 *     summary: Upload an image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       500:
 *         description: Internal server error
 */

router.post('/', handleImageUpload);

module.exports = router;
