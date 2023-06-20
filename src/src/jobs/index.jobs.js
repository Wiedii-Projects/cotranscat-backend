// Crons
const { synchronizeInvoicesStatusPendingCron } = require("./sales/sales.cron.jobs");

// Monitors
const { salesMonitorJobs } = require("./sales/sales.monitor.jobs");

const salesJobsBuilder = () => {
    synchronizeInvoicesStatusPendingCron()
    salesMonitorJobs()
}

module.exports = {
    jobsBuilder: async () => {
        salesJobsBuilder()
    }
}