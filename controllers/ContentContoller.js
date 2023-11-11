const asyncHandler=require('express-async-handler')
const Content=require('../models/ContentModel')
const User=require('../models/UserModel')


//@desc getContents
//@route GET/api/contents
//@access private
const getContents = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    // Assuming your 'Content' model is associated with a 'User' model
    const contents = await Content.find({ user: userId });

    if (!contents || contents.length === 0) {
      return res.status(404).json({ message: 'No contents found for this user' });
    }

    res.status(200).json(contents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





const getAllContents = asyncHandler(async (req, res) => {
  let username = req.body.username;
  let category = req.body.category;

  try {
    let contents;

    if (username) {
      contents = await Content.find({ username: username });
    } else if (category) {
      contents = await Content.find({ categories: category });
    } else {
      contents = await Content.find({});
    }

    if (!contents || contents.length === 0) {
      return res.status(404).json({ message: 'No contents found' });
    }

    console.log(contents);
    res.status(200).json(contents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



//@desc setContents
//@route POST/api/contents
//@access private

const setContents = asyncHandler(async (req, res) => {
  console.log(req.file,req.body);
  try {
      // const contents = await Content.create(req.body); // Create and save in one step

      // res.status(200).json({ message: 'Post saved successfully', contents }); // Sending contents in the response


      const {username,title,description}=req.body;
      const contents=await Content.create({
        username,
        title,
        description,
        user: req.user.id,
        picture:req.file?req.file.filename:null,
      })
      res.status(201).json({message:'succesfully saved',contents})
  } catch (error) {
      res.status(500).json(error);
  }
});

const updateContents=asyncHandler( async(req,res)=>{
    const contents=Content.findById(req.params.id);
  const user=await User.findById(req.user.id);
  if(!user){
    res.status(401)
    throw new Error('user not found')
  }
  if(contents.user.toString()!==user.id){
    res.status(401)
    throw new Error('not Authrized')
  }
    if(!contents){
        res.status(400)
        throw new Error('no goals found')
        
    }
    const updateContents=await Content.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })


    res.status(200).json(updateContents )
})
//@desc deleteGoals
//@route delte/api/goals
//@access private
const deleteContents=asyncHandler( async(req,res)=>{
    // res.status(200).json({message:`delete goals ${req.params.id}`})
    const contents=await Content.findByIdAndDelete(req.params.id);
    if(!contents){
        res.status(400)
        throw new Error('invalid id')
    }
    // await goals.delete()
    const user=await User.findById(req.user.id);
  if(!user){
    res.status(401)
    throw new Error('user not found')
  }
  if(contents.user.toString()!==user.id){
    res.status(401)
    throw new Error('not Authrized')
  }

    
    return res.json({ id:req.params.id });
})

const getBlogbyId = asyncHandler(async(req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Content.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(201).json(blog);
  } catch (err) {
    console.error(err); // Corrected this line to log the error
    res.status(500).json({ message: 'Internal server error', err });
  }
});

module.exports={
    getContents,setContents,updateContents,deleteContents,getAllContents,getBlogbyId
}
