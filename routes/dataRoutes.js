const { Router } = require('express');
const dataController = require("../controllers/dataController");
const { checkUni } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware');

const router = Router();

router.get('/users', dataController.get_users);
router.get('/users/:username', dataController.get_user);
router.get('/unis',  dataController.get_unis);
router.post('/unis/add', upload.single('image'), dataController.add_uni);
router.get('/unis/:id', dataController.get_uni);

module.exports = router;