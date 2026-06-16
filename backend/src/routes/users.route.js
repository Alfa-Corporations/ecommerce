const { Router } = require('express');
const { createUser, verifyUser, getAllUser, deleteUser, getAllCart, addPrductToCart, updateProductInCart, deleteProductInCart, purchases, getPurchases } = require('../controllers');
const authenticate = require('../middlewares/auth.middleware');

const router = Router();

/**
* @openapi
* /api/v1/user:
*   post:
*     tags: [User]
*     summary: Here you can create an user.
*     description: The role property is optional, if you don't send it, the default role will be client. this property is for the admin, if you want to create an admin user, you have to send the role property with the value "admin".
*     requestBody:
*      required: true
*      content:
*       application/json:
*        schema:
*         type: object
*         $ref: '#/components/schemas/CreateUser'
*     responses:
*       201:
*         description: Successful Operation
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: OK
*                 data:
*                   type: array
*                   items:
*                     type: object
*                     $ref: '#/components/schemas/Users'
*       400:
*         description: Missing Data
* /api/v1/user/{userId}/verify:
*  put:
*   security:
*    - bearerAuth: []
*   tags: [User]
*   summary: verify your user with the code sended to your email
*   parameters:
*    - in: path
*      name: userId
*      schema:
*       type: integer
*       required: true
*       minimun: 1
*   requestBody:
*    required: true
*    content:
*      application/json:
*       schema:
*        type: object
*        $ref: '#/components/schemas/Verify'
*   responses:
*     200:
*         description: Successful Operation
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: OK
*                 data:
*                   type: array
*                   items:
*                     type: object
*                     $ref: '#/components/schemas/Verify'
*     400:
*       description: Missing Data
* /api/v1/user/all:
*  get:
*   tags: [User]
*   summary: Get all users
*   responses:
*     200:
*       description: Successful Operation
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               status:
*                 type: string
*                 example: OK
*               data:
*                 type: array
*                 items:
*                   type: object
*                   $ref: '#/components/schemas/Users'
*     400:
*       description: Missing Data
* /api/v1/user/{userId}:
*  delete:
*   security:
*     - bearerAuth: []
*   tags: [User]
*   summary: Delete an user
*   parameters:
*    - in: path
*      name: userId
*      schema:
*       type: integer
*       required: true
*       minimun: 1
*   responses:
*     200:
*       description: Successful Operation
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               status:
*                 type: string
*                 example: OK
*               data:
*                 type: array
*                 items:
*                   type: object
*                   $ref: '#/components/schemas/Users'
*     400:
*       description: Missing Data
* /api/v1/user/{userId}/cart:
*  get:
*   security:
*     - bearerAuth: []
*   tags: [Cart]
*   summary: Get all cart
*   parameters:
*    - in: path
*      name: userId
*      schema:
*       type: integer
*       required: true
*       minimun: 1
*   responses:
*     200:
*       description: Successful Operation
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               status:
*                 type: string
*                 example: OK
*               data:
*                 type: array
*                 items:
*                   type: object
*                   $ref: '#/components/schemas/GetAllCart'
* /api/v1/user/cart/{cartId}/product:
*  post:
*   security:
*     - bearerAuth: []
*   tags: [Cart]
*   summary: Add product to cart
*   parameters:
*    - in: path
*      name: cartId
*      schema:
*       type: integer
*       required: true
*       minimun: 1
*   requestBody:
*    required: true
*    content:
*      application/json:
*       schema:
*        type: object
*        $ref: '#/components/schemas/AddToCart'
*   responses:
*     201:
*       description: Successful Operation
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               status:
*                 type: string
*                 example: OK
*               data:
*                 type: array
*                 items:
*                   type: object
*                   $ref: '#/components/schemas/Cart'
*     400:
*       description: Missing Data
* /api/v1/user/cart/{cartId}/product/update:
*  put:
*   security:
*     - bearerAuth: []
*   tags: [Cart]
*   summary: Update product in cart
*   parameters:
*    - in: path
*      name: cartId
*      schema:
*       type: integer
*       required: true
*       minimun: 1
*   requestBody:
*    required: true
*    content:
*      application/json:
*       schema:
*        type: object
*        $ref: '#/components/schemas/UpdateProductCart'
*   responses:
*     200:
*       description: Successful Operation
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               status:
*                 type: string
*                 example: OK
*               data:
*                 type: array
*                 items:
*                   type: object
*                   $ref: '#/components/schemas/Cart'
*     400:
*       description: Missing Data
* /api/v1/user/cart/product/{productId}:
*  delete:
*   security:
*     - bearerAuth: []
*   tags: [Cart]
*   summary: Delete product in cart
*   parameters:
*    - in: path
*      name: productId
*      schema:
*       type: integer
*       required: true
*       minimun: 1
*   responses:
*     200:
*       description: Successful Operation
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               status:
*                 type: string
*                 example: OK
*               data:
*                 type: array
*                 items:
*                   type: object
*                   $ref: '#/components/schemas/Cart'
*     400:
*       description: Missing Data
* /api/v1/user/{userId}/purchase:
*  put:
*   security:
*     - bearerAuth: []
*   tags: [Purchases]
*   summary: Purchases
*   parameters:
*    - in: path
*      name: userId
*      schema:
*       type: integer
*       required: true
*       minimun: 1
*   responses:
*     200:
*       description: Successful Operation
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               status:
*                 type: string
*                 example: OK
*               data:
*                 type: array
*                 items:
*                   type: object
*                   $ref: '#/components/schemas/Purchase'
*     400:
*       description: Missing Data
* /api/v1/user/{userId}/purchases:
*  get:
*   security:
*     - bearerAuth: []
*   tags: [Purchases]
*   summary: Get purchases
*   parameters:
*    - in: path
*      name: userId
*      schema:
*       type: integer
*       required: true
*       minimun: 1
*   responses:
*     200:
*       description: Successful Operation
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               status:
*                 type: string
*                 example: OK
*               data:
*                 type: array
*                 items:
*                   type: object
*                   $ref: '#/components/schemas/GetPurchase'
*     400:
*       description: Missing Data
*/


router.post('/user', createUser);

router.put('/user/:id/verify', verifyUser);

router.get('/user/all', getAllUser);

router.delete('/user/:id', deleteUser);

/* ----------------------------------------------------------- */

router.get('/user/:id/cart', getAllCart);

router.post('/user/cart/:id/product', addPrductToCart);

router.put('/user/cart/:id/product/update', updateProductInCart);

router.delete('/user/cart/product/:id', deleteProductInCart);

router.put('/user/:id/purchase', purchases);

router.get('/user/:id/purchases', getPurchases);


module.exports = router;