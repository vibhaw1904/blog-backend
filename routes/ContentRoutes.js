const express=require('express');
const Content=require('../models/ContentModel')
const { protect } = require('../middlewares/authMiddlewares');
const { getContents, setContents, updateContents, deleteContents, getAllContents, getBlogbyId } = require('../controllers/ContentContoller');
const { route } = require('./UserRoutes');
// const { uploadImage, getImage } = require('../controllers/ImageController');
const router=express.Router();

const upload=require('../utils/upload');
const { newComment, getComment, deleteComment } = require('../controllers/CommentController');
router.get('/mypost/:id', protect, getContents);
router.get('/',protect,getAllContents);
router.get('/:id',protect, getBlogbyId);
// router.post('/',protect, setContents);
router.put('/update/:id',protect,updateContents);
router.delete('/delete/:id',protect,deleteContents)
router.post('/comments/new', protect, newComment);
router.get('/comments/:postId', getComment);
router.delete('/delete/comments/:id', protect, deleteComment);

router.post('/', upload.single('file'),protect,setContents, (req, res) => {
    // Handle the case when a file is uploaded
    if (req.file) {
        console.log(req.body)
        console.log(res.data)
    } else {
        // Handle the case when no file is uploaded
        // Access form data through req.body and save content without an image
    }
});


// router.get('/file/:filename', getImage);


module.exports=router;