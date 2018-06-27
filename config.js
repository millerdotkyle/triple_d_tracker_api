exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/tripple_d_tracker';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/tripple_d_tracker_test';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'jellopudding';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';