const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// localhost is running on 3000
const port = 3030;

// more options here for cors package: https://www.npmjs.com/package/cors
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// not sure if next is needed
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// do we need a default route? not sure
app.use('/static', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../index.html')));

app.get('/api', (req, res) => {
  console.log('at api endpoint');
  return res.status(200).json({ msg: 'api queried' });
});

// 404 check. our server should only be making calls to '/api'
app.get('*', (req, res) => {
  res.status(404).send('Path does not exist.');
});

app.listen(port, () => console.log(`Listening on port ${port}.`));
