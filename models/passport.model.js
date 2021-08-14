const LocalStrategy=require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github').Strategy
const userModel = require('./user.model')
const bcrypt = require('bcrypt')

module.exports=function(passport){

    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    },
        async function(email, password, done) {
            const user = await userModel.findOne({ 'email': email })
            console.log(user)
            if(!user){
                return done(null,false,{message:"No user with Email"})
            }try{
                if(await bcrypt.compare(password, user.password)){
                    return done(null,user,{message:"Login Successfully"} )
                }
                return done(null, false, {message:"Password Incorrect"})
            }catch(e){
                return done(e)
            }
        }
    ))

    passport.serializeUser((user, done)=>{
        done(null,user.id)
    })

    passport.deserializeUser(async(id, done)=>{
        try {
            const user= await userModel.findById(id)
            return done(null, user)
        } catch (e) {
            console.log(e)
            return done(e)
        }
    })

    passport.use(new GitHubStrategy({
        clientID: "18c16e51d8759d134338",
        clientSecret: "7ef8b02d72cacef0c1af804150adcb807c787ddc",
        callbackURL: "http://localhost:3000/user/github/callback"
      },
      async function(accessToken, refreshToken, profile, done) {
       console.log(profile)
       try {
           const user=await userModel.findOne({email:profile._json.email})
           if(user) return done(null,user)
           const newUser=new userModel({
               name:profile._json.login,
               email:profile._json.url,
               password:"" 
           }) 
           await newUser.save()
           return done(null, newUser)
        } catch (e) {
           console.log(e)
           return done(e)
       }

      }
    ))

    passport.use(new GoogleStrategy({
        clientID: "908526408780-nqijd9g42r3ihllm37rvqsajib29i4rv.apps.googleusercontent.com",
        clientSecret: "haN9k2p6_7TjJwTnAluly9s_",
        callbackURL: "http://localhost:3000/user/google/callback"
      },
    async function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        try {
            const user=await userModel.findOne({email:profile._json.email})
            if(user) return done(null,user)
            const newUser=new userModel({
                id:profile._json.sub,
                name:profile._json.name,
                email:profile._json.email,
                password:""
            })
            await newUser.save()
            return done(null,newUser)
        } catch (e) {
            console.log(e)
            return done(e)
        }
    }
    ))


}