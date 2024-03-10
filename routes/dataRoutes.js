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
router.post('/unis/add', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
  ]), dataController.add_uni);
router.get('/unis/:id/reviews', dataController.get_all_reviews);
router.post('/unis/:id/review', dataController.add_review);
router.get('/unis/:id', dataController.get_uni);
router.put('/unis/:id', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
  ]), dataController.update_uni);

module.exports = router;