const express = require('express');

// Import Route Files
const appleRoutes = require('./apple.route');
const entryRoutes = require('./entry.route');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

// Add Routes Here
router.use('/apple', appleRoutes);
router.use('/entry', entryRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
