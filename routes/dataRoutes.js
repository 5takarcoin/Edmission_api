const { Router } = require('express');
const dataController = require("../controllers/dataController")

const router = Router();

router.get('/users', dataController.get_users);
router.get('/users/:username', dataController.get_user);
router.post('/unis', () => {});
router.get('/unis/:id', () => {});

module.exports = router;