const { Router } = require('express');
const { createProduct, getAllProducts, getProductsByUser, updateProduct, updateStockProduct, deleteProduct } = require('../controllers');
const authenticate = require('../middlewares/auth.middleware');
const multer = require('multer');


const router = Router();

/**
* @openapi
* /api/v1/product:
*   post:
*     security:
*        - bearerAuth: []
*     tags: [Product]
*     summary: Here you can create a product.
*     description: The product to be created will be unique. The "name" must be unique and the "URL" too.
*     requestBody:
*      required: true
*      content:
*       application/json:
*        schema:
*         type: object
*         $ref: '#/components/schemas/CreateProduct'
*     responses:
*       201:
*         description: Successful Operation
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/CreateProduct'
*       400:
*         description: Bad Request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: The error message.
*                 errorContent:
*                   type: string
*                   description: The error content.
* /api/v1/products:
*   get:
*     tags: [Product]
*     summary: Here you can get all products.
*     responses:
*       200:
*         description: Successful Operation
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/GetAllProducts'
*       400:
*         description: Bad Request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: The error message.
*                 errorContent:
*                   type: string
*                   description: The error content.
* /api/v1/product/user/{id}:
*   get:
*     tags: [Product]
*     summary: Here you can get all products by user.
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The user id
*     responses:
*       200:
*         description: Successful Operation
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/GetProductsByUser'
*       400:
*         description: Bad Request
* /api/v1/product/{id}:
*   put:
*     security:
*        - bearerAuth: []
*     tags: [Product]
*     summary: Here you can update a product.
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The product id
*     requestBody:
*      required: true
*      content:
*       application/json:
*        schema:
*         type: object
*         $ref: '#/components/schemas/UpdateProduct'
*     responses:
*       200:
*         description: Successful Operation
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/UpdateProduct'
*       400:
*         description: Bad Request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: The error message.
*                 errorContent:
*                   type: string
*                   description: The error content.
* /api/v1/product/{id}/stock:
*   put:
*     security:
*        - bearerAuth: []
*     tags: [Product]
*     summary: Here you can update the stock of a product.
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The product id
*     requestBody:
*      required: true
*      content:
*       application/json:
*        schema:
*         type: object
*         $ref: '#/components/schemas/UpdateStockProduct'
*     responses:
*       200:
*         description: Successful Operation
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/UpdateStockProduct'
*       400:
*         description: Bad Request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: The error message.
*                 errorContent:
*                   type: string
*                   description: The error content.
* /api/v1/product/{id}/delete:
*   delete:
*     security:
*        - bearerAuth: []
*     tags: [Product]
*     summary: Here you can delete a product.
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The product id
*     responses:
*       200:
*         description: Successful Operation
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/DeleteProduct'
*       400:
*         description: Bad Request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: The error message.
*                 errorContent:
*                   type: string
*                   description: The error content.
*/

const upload = multer({ dest: 'uploads/' });

router.post('/product', upload.any(), createProduct);

router.get('/products', getAllProducts);

router.get('/product/user/:id', authenticate, getProductsByUser);

router.put('/product/:id', authenticate, updateProduct);

router.put('/product/:id/stock', authenticate, updateStockProduct);

router.delete('/product/:id/delete', authenticate, deleteProduct);


module.exports = router;