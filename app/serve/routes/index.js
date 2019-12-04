const express = require('express');
const router = express.Router();

const thrift = require('thrift');
const rpcSetup = require('./gen-nodejs/setup.js');
const rpcTypes = require('./gen-nodejs/module_types.js');

const options = {
  transport: thrift.TBUfferedTransport,
  protocol: thrift.TJSONProtocol,
  headers: {"Connection": "close"},
  https: false
};

let connection = thrift.createHttpConnection('localhost', 2333, options);

let client = thrift.createHttpClient(rpcSetup, connection);
connection.on('error', (err) => {
  console.log(err);
});

// router.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
//   next();
// });

router.post('/setup', (req, res, next) => {
  console.log('ok ok');
  let chunk = new rpcTypes.InitParame({
    'L': req.body.L
  });

  client.init(chunk, (err, ret) => {
    res.json(JSON.stringify({
      'g1': ret.g1,
      'g2': ret.g2,
      'z': ret.z,
      'u1': ret.u1,
      'u2': ret.u2,
      'x1': ret.x1,
      'x2': ret.x2,
      'y1': ret.y1,
      'y2': ret.y2
    }));
  });
  // res.send('This is setup');
});

router.post('/enc', (req, res, next) => {
  let chunk = new rpcTypes.Enc({
    'g1': req.body.g1,
    'g2': req.body.g2,
    'z': req.body.z,
    'u1': req.body.u1,
    'u2': req.body.u2,
    'L': req.body.L,
    'M': req.body.M,
  });

  client.execEnc(chunk, (err, ret) => {
    res.json(JSON.stringify({
      'C1': ret.C1,
      'C2': ret.C2,
      'D1': ret.D1,
      'D2': ret.D2,
      'E': ret.E,
      // 'msg': ret.symkey,
      'C': ret.C,
      'tag': ret.tag,
    }));
  });
  // res.send('Return ctext');
});

router.post('/dec', (req, res, next) => {
  let chunk = new rpcTypes.Dec({
    'x1': req.body.x1,
    'x2': req.body.x2,
    'y1': req.body.y1,
    'y2': req.body.y2,
    'tag': req.body.tag,
    'C1': req.body.C1,
    'C2': req.body.C2,
    'D1': req.body.D1,
    'D2': req.body.D2,
    'E': req.body.E,
    'L': req.body.L,
    'C': req.body.C
  });

  client.execDec(chunk, (err, ret) => {
    res.json(JSON.stringify({
      'M': ret.M
    }))
  });
  // res.send('Return ptext');
});

router.post('/test', (req, res, next) => {
  console.log(req.body);
  res.send('How are you');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;