const express = require('express');
const Bundler = require('parcel-bundler');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// const bundlerOptions = {
//   outDir: './build', // The out directory to put the build files in, defaults to dist
//   outFile: 'index.html', // The name of the outputFile
//   publicUrl: './', // The url to serve on, defaults to '/'
//   watch: true, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
//   target: 'browser', // Browser/node/electron, defaults to browser
//   bundleNodeModules: false, // By default, package.json dependencies are not included when using 'node' or 'electron' with 'target' option above. Set to true to adds them to the bundle, false by default
//   logLevel: 3, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors
//   hmr: true, // Enable or disable HMR while watching
//   hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
//   autoInstall: false, // Enable or disable auto install of missing dependencies found during bundling
// };

const bundler = new Bundler(path.resolve(__dirname, '../index.html'));
console.log('bundler assigned');
const app = express();
console.log('app assigned');

// localhost is running on 3000
const port = 3030;
console.log('port assigned');

app.use(bundler.middleware());
console.log('using bundler, middleware');

bundler.on('buildEnd', () => {
// more options here for cors package: https://www.npmjs.com/package/cors
  app.use(cors());
  console.log('using cors');
  app.use(bodyParser.urlencoded({ extended: true }));
  console.log('using BP, urlencoded');
  app.use(bodyParser.json());
  console.log('using BP, .json');
  app.get('/api', (req, res) => {
    console.log('at api endpoint');
    return res.status(200).json({ msg: 'api queried' });
  });

  // 404 check. our server should only be making calls to '/api'
  app.get('*', (req, res) => {
    res.status(404).send('Path does not exist.');
  });

  app.listen(port, () => console.log(`Listening on port ${port}.`));
});


// not sure if next is needed
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// do we need a default route? not sure
// app.use('/static', express.static(path.join(__dirname, '../build')));
// app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../build/index.html')));
