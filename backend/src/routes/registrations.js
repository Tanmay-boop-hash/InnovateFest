const express = require('express');
const router = express.Router();
const {
  registerUser,
  getAllRegistrations,
  getRegistrationById,
  deleteRegistration
} = require('../controllers/registrationController');

router.post('/', registerUser);
router.get('/', getAllRegistrations);
router.get('/:id', getRegistrationById);
router.delete('/:id', deleteRegistration);

module.exports = router;