
import passport, { serializeUser, deserializeUser, use } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User, { findById, findOne, create } from '../models/User';

serializeUser((user, done) => {
  done(null, user.id);
});

deserializeUser(async (id, done) => {
  try {
    const user = await findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails?.[0]?.value || `${profile.id}@google.com`,
            name: profile.displayName || 'Google User',
            avatar: profile.photos?.[0]?.value || ''
          });
        }

        done(null, user);
      } catch (err) {
        done(err, undefined);
      }
    }
  )
);

export default passport;