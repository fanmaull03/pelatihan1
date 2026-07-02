const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAll);
router.get('/:nik', UserController.getByNik);
router.post('/', UserController.create);
router.put('/:nik', UserController.update);
router.delete('/:nik', UserController.delete);

module.exports = router;