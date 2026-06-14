const { Router } = require('express');
const login = require('../controllers/auth.controller.js');

const router = Router();

/**
* @openapi
* /api/v1/login:
*   post:
*     summary: Login
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 description: Email
*               password:
*                 type: string
*                 description: Password
*             example:
*               email: "example@gmail.com"
*               password: "123123"
*     responses:
*       200:
*         description: Login
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 token:
*                   type: string
*                   description: Token
*                 user:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: Id
*                     name:
*                       type: string
*                       description: Name
*                     email:
*                       type: string
*                       description: Email
*                     role:
*                       type: object
*                       properties:
*                         id:
*                          type: integer
*                          description: Id
*                         name:
*                          type: string
*                          description: Name
*                         description:
*                          type: string
*                          description: Description
*       400:
*         description: Bad request 
*/

router.post('/login', login);

module.exports = router;