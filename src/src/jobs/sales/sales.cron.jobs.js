// Constants - Jobs
const salesConstJobs = require("./sales.const.jobs");
const { INVOICE_SYNCHRONIZATION_QUEUE } = salesConstJobs.invoiceSynchronization

// Jobs
const { synchronizeInvoicesStatusPendingJob } = require('./sales.jobs');

// Libraries
const cron = require('node-cron');

module.exports = {
    synchronizeInvoicesStatusPendingCron: () => {     
        cron.schedule('* * * * *', () => {
            synchronizeInvoicesStatusPendingJob({
                type: INVOICE_SYNCHRONIZATION_QUEUE,
                options: {}
            });
        })    
     }
}