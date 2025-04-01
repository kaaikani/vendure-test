import { bootstrap, runMigrations } from '@vendure/core';
import { config } from './vendure-config';
import { NestExpressApplication } from '@nestjs/platform-express';

runMigrations(config)
  .then(() => bootstrap(config))
  .then((app) => {
    const nestApp = app as NestExpressApplication;
    nestApp.set('trust proxy', 1);  // Trust AWS ALB as a proxy
    console.log("✅ Express 'trust proxy' setting enabled.");
  })
  .catch((err) => {
    console.error(err);
  });
