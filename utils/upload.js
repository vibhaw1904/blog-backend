const multer = require('multer');
const path=require('path')
// const {GridFsStorage} = require('multer-gridfs-storage');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
            cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.filename + "_" +Date.now()+ path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
})
module.exports = multer(upload);
