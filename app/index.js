// Load environment variables
require('dotenv').config();

// Initialize Database
require('./database');
/** Initialize global variables*/

// Initialize Server
require('./server');



//Initialize cron
// const cronJobs = require('./config/cron');
// cronJobs.default.init();
