const mongoose=require('mongoose');
const user=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    age:{type:String,required:true},
    phone:{type:String,required:true,unique:true},
    gender:{type:String,required:true},
    password:{type:String,required:true},
    token:{type:String}
    
    
},
{collection:"user"}
)
const model=mongoose.model("user",user)
module.exports=model