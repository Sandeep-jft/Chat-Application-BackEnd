
const passport = require("passport");
const jwt = require("jsonwebtoken");

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
        if(createUser){
            return res.json({mesage:"user has been created successfully",status:true,data:createUser})
        }

    },
    Login:async (req,res)=>{
        const {email,password} = req.allParams();
        console.log("Login user is ",email,password);

        passport.authenticate('local',{session:false}, function(err, user, info) {
            if (err || !user) { 
                console.log("Erro is ",err); 
                return; 
            }

             req.logIn(user, function(err) {
              if (err) { 
                  console.log("Error is ",err);
                 return ; 
            }
              
              console.log("The user is ",user,"req obj is ",req.user)
              let token = jwt.sign({ id: req.user.id }, "jtrlkgsjflgiosgtiwrtit894r98498t984", { expiresIn: "1h" });
              return res.json({ details: req.user, token });

            });
          })(req, res);
       
    }
}
