
// Constants
const { redisConnectionInstanceBullMq } = require("../../constants/core/core-configurations.const");

// Constants - Jobs
const salesConstJobs = require("../../jobs/sales/sales.const.jobs");

// Libraries
const { Worker, QueueEvents } = require("bullmq");

const { INVOICE_SYNCHRONIZATION_QUEUE } = salesConstJobs.invoiceSynchronization

module.exports = {
    salesMonitorJobs: () => {
        new Worker(INVOICE_SYNCHRONIZATION_QUEUE, async (job) => {
            console.log(
                `Processing job ${job.id} with data ${JSON.stringify(job.data, null, 4)}`
            );
        }, { connection: redisConnectionInstanceBullMq });


        const events = new QueueEvents(INVOICE_SYNCHRONIZATION_QUEUE, { connection: redisConnectionInstanceBullMq });

        events.on("completed", (job) => {
            console.log(`Job ${job.jobId} has been completed`);
        });

        events.on("failed", (job, err) => {
            console.log(`Job ${job.jobId} has failed with error ${err.message}`);
        });
    }
}