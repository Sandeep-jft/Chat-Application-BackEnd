


module.exports={

    signup:async (req,res)=>{

        const userData = req.allParams().data;

        const createUser = await User.create({
             firstName:userData.firstName,
             lastName:userData.lastName,
             email:userData.email,
             password:userData.password
        })

        console.log("The details are ",req.allParams());

    }

}