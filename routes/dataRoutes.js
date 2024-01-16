const { Router } = require('express');
const dataController = require("../controllers/dataController");
const { checkAdmin } = require('../middleware/authMiddleware');

const router = Router();

router.get('/users', dataController.get_users);
router.get('/users/:username', dataController.get_user);
router.get('/unis',  dataController.get_unis);
router.post('/unis/add', checkAdmin, dataController.add_uni);
router.get('/unis/:id', dataController.get_uni);

module.exports = router;