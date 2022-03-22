const { connect, connection } = require('mongoose');
// When Heroku application, add Atlas connection string as a Config Var
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/SocialMediaApiDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
