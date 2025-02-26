const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
const {
  addComment,
  deleteComment,
  getAllCommentsForBlog,
} = require("../controllers/commentsController");

/**
 * @openapi
 * /api/blogs/{blogId}/comments:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Add a new comment to a blog
 *     parameters:
 *       - in: path
 *         name: blogId
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
 *               content:
 *                 type: string
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/:blogId/comments", validateToken, addComment);

/**
 * @openapi
 * /api/blogs/{blogId}/comments/{commentId}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete a comment from a blog
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:blogId/comments/:commentId", validateToken, deleteComment);

/**
 * @openapi
 * /api/blogs/{blogId}/comments:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get all comments for a blog
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get("/:blogId/comments", getAllCommentsForBlog);

module.exports = router;
