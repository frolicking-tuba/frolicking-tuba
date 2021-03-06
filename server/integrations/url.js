const request = require('request');
const config = require('../../env/config.json');
const Url = require('../models/url');

module.exports.postToUrl = (params, body) => new Promise((resolve, reject) => {
  if (params.type !== 'url') {
    resolve();

    return;
  }

  const options = {
    url: params.output_meta,
    method: 'POST',
    body,
    json: true
  };

  request(options, (err) => {
    if (err) {
      reject(err);
    }

    resolve();
  });
});

module.exports.urlList = (req, res) => {
  if (!req.session.user) {
    res.status(400).json({ error: config.messages.not_logged_in });

    return;
  }

  Url.findAll({ where: { userId: req.session.user.id } })
    .then((urls) => {
      res.status(200).json(urls);
    });
};

module.exports.urlSelect = (req, res) => {
  if (!req.session.user) {
    res.status(400).json({ error: config.messages.not_logged_in });

    return;
  }

  Url.findOrCreate({
    where: {
      userId: req.session.user.id,
      url: req.body.url
    }
  })
  .spread((integration, created) => {
    if (created) {
      res.status(200).json({ status: 'created new url' });
    } else {
      res.status(200).json({ status: 'url already exists' });
    }
  })
  .catch((err) => {
    res.send(err);
  });
};
