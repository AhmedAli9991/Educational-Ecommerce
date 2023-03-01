var winston = require('winston')
var expressWinston = require('express-winston');

const router = require("express").Router();


router.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  
  format: winston.format.combine(
    winston.format.colorize(),winston.format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    winston.format.json(),winston.format.printf((info) => ` ${info.level}: response status : ${info.message} response time : [${info.timestamp}] `)
    ,),
  meta: false, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  requestFilter: (req, propName)=> {
    if(propName !== "headers") return req[propName];
  
    const { cookie, ...rest } = req.headers;
  
    return rest;
  },
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));



module.exports = router