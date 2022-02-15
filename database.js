const mongoose = require('mongoose');

// const url = 'mongodb://localhost:27017/e-commerce';
// module.exports = mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: true,
// });

module.exports = mongoose.connect('mongodb://localhost:27017/e-commerce');
