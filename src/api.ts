'use strict';

import * as express from 'express';
import * as JSONFILE from 'jsonfile';

const FS = require('fs');
const router = express.Router();
const DATAPATH = process.env.DATA_PATH || './data'
/* ** ** ** **
 * FUNCTIONS
 */

/*
 * getEntries(res: any, jsonname: string)
 * @DESC: Gives a all entries
 */
function getEntries(res: any, jsonname: string) {
  try {
    let readStream = FS.createReadStream(DATAPATH + '/' + jsonname + '.json', 'utf8');
    readStream.on('data', function(data: any) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.json(JSON.parse(data));
    });
  } catch (err) {
    console.log({ routes: 'Error - getEntries()', error: err });
    res.sendStatus(400);
  }
}

/*
 * getEntry (res: any, jsonname: string, id: string)
 * @DESC: Gives a singleentry
 */
function getEntry(res: any, jsonname: string, id: string) {
  try {
    let readStream = FS.createReadStream(ENV.getDataPath() + '/' + jsonname + '.json', 'utf8');
    readStream.on('data', function(data: any) {
      var dobj = JSON.parse(data); //console.log(data);
      for (var i in dobj.data) {
        let obj = dobj.data[i];
        if (obj.id === id) {
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          res.json({ data: obj });
          return;
        }
      }
      res.sendStatus(400);
    });
  } catch (err) {
    console.log({ routes: 'API - getEntries()', error: err });
    res.sendStatus(400);
  }
}

/*
 * getEntryByName (res: any, jsonname: string, name: string)
 * @DESC: Gives a singleentry
 */
function getEntryByName(res: any, jsonname: string, name: string) {
  try {
    let readStream = FS.createReadStream(ENV.getDataPath() + '/' + jsonname + '.json', 'utf8');
    readStream.on('data', function(data: any) {
      var dobj = JSON.parse(data); //console.log(data);
      for (var i in dobj.data) {
        let obj = dobj.data[i];
        if (obj.name === name) {
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          res.json({ data: obj });
          return;
        }
      }
      res.sendStatus(400);
    });
  } catch (err) {
    console.log({ routes: 'API - getEntries()', error: err });
    res.sendStatus(400);
  }
}

/* ** ** ** **
 * ROUTES
 */

/*
 * Products
 */
// --> GET
router.get('/', function(req, res, next) {
  getEntries(res, 'all');
});
router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  getEntryByName(res, 'all', id);
});


export = router;
