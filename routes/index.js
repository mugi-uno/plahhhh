const router = require('express').Router();
const store = require('../store');

router.get('/api/v1/room/:room', (req, res, next) => {
  res.json(store.findOrCreate(req.params.room).toJS());
});

router.all('/api/*', (req, res, next) => {
  res.status(404).send('Not Found.');
});

router.get('*', (req, res, next) => {
  res.render('index');
});

module.exports = router;
