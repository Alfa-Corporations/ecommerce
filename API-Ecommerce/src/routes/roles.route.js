const { Router } = require('express');
const { createRole, getAllRoles, updateRole, deleteRole} = require('../controllers');
const authenticate = require('../middlewares/auth.middleware');

const router = Router();

/**
* @openapi
* /api/v1/role:
*   post:
*     security:
*       - bearerAuth: []
*     summary: Create a new role
*     tags: [Roles]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/RoleCreated'
*     responses:
*       201:
*         description: The role was successfully created
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/Role'
*       400:
*         description: Bad request
* /api/v1/roles:
*   get:
*     summary: Get all roles
*     tags: [Roles]
*     responses:
*       200:
*         description: The roles were successfully retrieved
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Role'
*       400:
*         description: Bad request
* /api/v1/role/{id}/update:
*   put:
*     security:
*       - bearerAuth: []
*     summary: Update a role
*     tags: [Roles]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The role id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/RoleUpdated'
*     responses:
*       200:
*         description: The role was successfully updated
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/Role'
*       400:
*         description: Bad request
* /api/v1/role/{id}:
*   delete:
*     security:
*       - bearerAuth: []
*     summary: Delete a role
*     tags: [Roles]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The role id
*     responses:
*       200:
*         description: The role was successfully deleted
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/Role'
*       400:
*         description: Bad request
*/

router.post('/role', authenticate, createRole);

router.get('/roles', getAllRoles)

router.put('/role/:id/update', authenticate, updateRole);

router.delete('/role/:id', authenticate, deleteRole);

module.exports = router;