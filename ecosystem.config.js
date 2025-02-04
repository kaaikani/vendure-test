export const apps = [
  {
    name: "vendure-server",
    script: "./dist/src/index.js", // Path to your built Vendure server file
    exec_mode: "cluster", // Enable cluster mode
    instances: "6", // Maximize the number of instances based on CPU cores
    watch: false, // Disable watching for production
    max_memory_restart: "900M", // Restart the instance if it exceeds 512MB
  },
  {
    name: "vendure-worker",
    script: "./dist/src/index-worker.js", // Path to your built Vendure server file
    exec_mode: "cluster", // Enable cluster mode
    instances: "2", // Maximize the number of instances based on CPU cores
    watch: false, // Disable watching for production
    max_memory_restart: "900M", // Restart the instance if it exceeds 512MB
  },
];