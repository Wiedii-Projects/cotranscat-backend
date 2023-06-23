// Constants
const salesConstJobs = require("../../jobs/sales/sales.const.jobs");

// Constants - Jobs
const { redisConnectionInstanceBullMq } = require("../../constants/core/core-configurations.const");
const { INVOICE_SYNCHRONIZATION_QUEUE } = salesConstJobs.invoiceSynchronization

// Libraries
const { Queue } = require("bullmq");

module.exports = {
    invoiceSynchronizationJobsQueue: new Queue(
        INVOICE_SYNCHRONIZATION_QUEUE,
        { connection: redisConnectionInstanceBullMq }
    )
}