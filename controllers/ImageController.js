// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');
// const conn = mongoose.connection;
// const url = 'http://localhost:3000';

// let gfs;

// conn.once('open', () => {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('fs');
// });

// const uploadImage = (req, res) => {
//     if (!req.file) {
//         return res.json(404).json('file not found');
//     }
//     const imageUrl = `${url}/file/${req.file.filename}`;
//     res.status(200).json(imageUrl);
// };

// const getImage = async (req, res) => {
//     try {
//         const file = await gfs.files.findOne({ filename: req.params.filename });
//         const readStream = gfs.createReadStream(file.filename);
//         readStream.pipe(res);
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// };

// module.exports = {
//     uploadImage,
//     getImage
// };
