const bcrypt = require("bcrypt")

module.exports={

    attributes:{
        firstName:{
            type:"String",
            required:true
        },
        lastName:{
            type:"String",
            required:true
        },
        email:{
            type:"String",
            required:true
        },
        password:{
            type:"String",
            required:true
        }
    },
  
    beforeCreate: function (values, next) {
         bcrypt.hash(values.password,12,(err,hash)=>{
             if(err){
                return err;
             }
             else{
                 console.log("THe hash is ",hash)
             values.password=hash;
             next();
             }
         })
          
     }
    
    
}