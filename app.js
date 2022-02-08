require('dotenv').config();

const express = require('express'),
  app = express();

app.get('/', (req, res) => res.send('HI THERE'));

app.listen(process.env.PORT, () =>
  console.log('SERVING YOUR APP ON PORT 3000')
);
