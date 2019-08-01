const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const port = 3030;

// more options here for cors package
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// not sure if next is needed
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.get('/api', (req, res) => {
  console.log('at api endpoint');
  return res.status(200).send('api queried');
});

app.get('*', (req, res) => {
  res.status(404).send('Path does not exist.');
});

app.listen(port, () => console.log(`Listening on port ${port}.`));
