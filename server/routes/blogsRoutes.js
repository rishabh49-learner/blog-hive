const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
const {
  getBlogs,
  getMyBlogs,
  getBlog,
  postBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogsController");
const commentsRouter = require("./commentsRoutes");

/**
 * @openapi
 * /api/blogs/my-blogs:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: Get blogs created by the authenticated user
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/my-blogs", validateToken, getMyBlogs);

/**
 * @openapi
 * /api/blogs/:
 *   post:
 *     tags:
 *       - Blogs
 *     summary: Create a new blog
 *     security:
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               summary:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/", validateToken, postBlog);

/**
 * @openapi
 * /api/blogs/{id}:
 *   put:
 *     tags:
 *       - Blogs
 *     summary: Update an existing blog
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               summary:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", validateToken, updateBlog);

/**
 * @openapi
 * /api/blogs/{id}:
 *   delete:
 *     tags:
 *       - Blogs
 *     summary: Delete an existing blog
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", validateToken, deleteBlog);

router.use("/", commentsRouter);

/**
 * @openapi
 * /api/blogs/{id}:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: Get details of a specific blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getBlog);

/**
 * @openapi
 * /api/blogs/:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
router.get("/", getBlogs);

module.exports = router;
