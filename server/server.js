const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
console.log('app assigned');

// localhost is running on 3000
const port = 8080;
console.log('port assigned');


// not sure if next is needed
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// do we need a default route? not sure
app.use(express.static('build'));
app.get('/api', (req, res) => {
  console.log('at api endpoint');
  return res.status(200).json({ msg: 'api queried' });
});
// app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../build/index.html')));

app.listen(port, () => console.log(`Listening on port ${port}.`));
