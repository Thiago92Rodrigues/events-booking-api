const morgan = require('morgan');

const logger = morgan(function (tokens, req, res) {
  return [
    '[',
    tokens.method(req, res),
    ']',
    '"',
    tokens.url(req, res),
    '"',
    tokens.date(req, res, 'web'),

    'STATUS:',
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    'response time:',
    tokens['response-time'](req, res),
    'ms'
  ].join(' ');
});

module.exports.logger = logger;
