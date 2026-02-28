const express = require('express');
const router = express.Router();

// 1. Import the Brains (Controller)
const itemController = require('../controllers/itemController');

// 2. Import the Guards (Validators)
const { validateItem, validateStatusUpdate } = require('../middleware/validator');

/**
 * Define the API Endpoints
 * All these routes will be prefixed with /api/items in the server.js file
 */

// GET /api/items?category=Lost (or Found)
router.get('/', itemController.getItems);

// GET /api/items/:id (Get details for one specific item)
router.get('/:id', itemController.getItemById);

// POST /api/items (Create a new report)
// Note: We run validateItem first. If it fails, itemController is never called.
router.post('/', validateItem, itemController.createItem);

// PATCH /api/items/:id/status (Update status to Claimed or Resolved)
router.patch('/:id/status', validateStatusUpdate, itemController.updateStatus);

// DELETE /api/items/:id (Remove a report)
router.delete('/:id', itemController.deleteItem);

module.exports = router;