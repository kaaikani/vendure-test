const express = require('express');
const { createBullBoard } = require('bull-board');
const { BullMQAdapter } = require('bull-board/bullMQAdapter');
const { Queue } = require('bullmq');

const app = express();

// Redis connection config
const redisOptions = { connection: { host: '127.0.0.1', port: 6379 } };

// Initialize job queues
const jobQueues = [
    new Queue('apply-collection-filters', redisOptions),
    new Queue('update-search-index', redisOptions),
    new Queue('send-email', redisOptions),
];

// Create Bull Board with all job queues
const { router } = createBullBoard(jobQueues.map(queue => new BullMQAdapter(queue)));

app.use('/admin/queues', router);

app.listen(3001, () => {
    console.log('Bull Board running on http://localhost:3001/admin/queues');
});
