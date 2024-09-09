import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../models/userSchema.js';
import { checkpwd, hashPwd } from '../middleware/hasher.js';



passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
})

export default passport.use(
  new Strategy({usernameField: "email"}, async (email, password, done) => {
    try {
      const user = await User.findOne({email});
      if (!user) throw new Error("User Not Found");
      if (!checkpwd(user.password, password)) throw new Error("Incorrect password");
      done(null, user)
    } catch(err) {
      done(err, null);
    }
  })
)
