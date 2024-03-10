const { Router } = require('express');
const dataController = require("../controllers/dataController");
const { checkStu } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware');

const { requireAuth, checkUser } = require("../middleware/authMiddleware")

const router = Router();

const mulF = [{name: 'image'}, {name: 'logo'}]

router.get('/users', dataController.get_users);
router.get('/users/:username', dataController.get_user);
router.get('/unis',  dataController.get_unis);
router.post('/unis/filter',  dataController.get_filtered_unis);
router.post('/unis/add', upload.fields(mulF), dataController.add_uni);
router.get('/unis/:id', dataController.get_uni);
router.put('/unis/:id', upload.fields(mulF), dataController.update_uni);
router.post('/reviews/add', checkStu, dataController.add_review);

module.exports = router;