const mongoose=require('mongoose')
const ContentSchema=mongoose.Schema({
    username: {
        type:String,
        ref: "User",
        required: true,
      }
      ,
    title:{
        type:String,
        required:[true,'please add a text value'],
        unique:true
    }
        
    ,
    description:{
        type:String,
        required:[true,'please add a text value']
    },
    picture:
    {
        type:String,
        required:false
    },
    categories: {
        type: Array,
        required: false   
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
   
    createdDate: {
        type: Date
    }


    },
    {
        timeStamps:true,
    }
) 
module.exports=mongoose.model('Content',ContentSchema)