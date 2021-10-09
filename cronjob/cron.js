const CronJob = require('cron').CronJob;
const job = new CronJob('*/2 * * * *', () => {
  console.log('You will see this message every 2 minutes');
}, null, true, 'America/Los_Angeles');
job.start();