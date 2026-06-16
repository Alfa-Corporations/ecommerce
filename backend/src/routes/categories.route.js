const { Router } = require('express');
const { createCategory, getAllCategories, updateCategory, deleteCategory } = require('../controllers');
const authenticate = require('../middlewares/auth.middleware');

const router = Router();

/**
* @openapi
* /api/v1/category:
*   post:
*     security:
*       - bearerAuth: []
*     summary: Create a new category
*     tags: [Categories]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/CategoryCreated'
*     responses:
*       201:
*         description: The category was successfully created
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/Category'
*       400:
*         description: Bad request
* /api/v1/categories:
*   get:
*     summary: Get all categories
*     tags: [Categories]
*     responses:
*       200:
*         description: The categories were successfully retrieved
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/Category'
*       400:
*         description: Bad request
* /api/v1/category/{id}/update:
*   put:
*     security:
*       - bearerAuth: []
*     summary: Update a category
*     tags: [Categories]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The category id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/CategoryUpdated'
*     responses:
*       200:
*         description: The category was successfully updated
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/Category'
*       400:
*         description: Bad request
* /api/v1/category/{id}:
*   delete:
*     security:
*       - bearerAuth: []
*     summary: Delete a category
*     tags: [Categories]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The category id
*     responses:
*       200:
*         description: The category was successfully deleted
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/Category'
*       400:
*         description: Bad request
*/

router.post('/category', authenticate, createCategory);

router.get('/categories', getAllCategories);

router.put('/category/:id/update', authenticate, updateCategory);

router.delete('/category/:id', authenticate, deleteCategory);

module.exports = router;