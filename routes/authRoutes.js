const { Router } = require('express');
const authController = require("../controllers/authController");
const upload = require('../middleware/multerMiddleware');

const router = Router();

// router.get('/signup', authController.signup_get );
router.post('/signup', upload.single('image'), authController.signup_post);
router.post('/login', authController.login_post);
router.put('/login', authController.login_get );
router.get('/logout', authController.logout_get);

router.get('/currUser', authController.current_user);

module.exports = router;