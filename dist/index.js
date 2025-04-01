"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@vendure/core");
const vendure_config_1 = require("./vendure-config");
(0, core_1.runMigrations)(vendure_config_1.config)
    .then(() => (0, core_1.bootstrap)(vendure_config_1.config))
    .then((app) => {
    const nestApp = app;
    nestApp.set('trust proxy', 1); // Trust AWS ALB as a proxy
    console.log("✅ Express 'trust proxy' setting enabled.");
})
    .catch((err) => {
    console.error(err);
});
