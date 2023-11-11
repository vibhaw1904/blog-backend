const  express=require('express');
const { registerUser, loginUser, getMe, logout } = require('../controllers/UserController');
const { protect } = require('../middlewares/authMiddlewares');
const router=express.Router();

router.post('/',registerUser)
router.post('/login',loginUser)
router.post('/logout',logout)
router.get('/me',protect,getMe)



module.exports=router