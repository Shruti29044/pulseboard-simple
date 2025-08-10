module.exports = {
 apps: [
   {
     name: "pulseboard-backend",
     script: "src/index.js",
     instances: "max",       // use all CPU cores
     exec_mode: "cluster",   // zero-downtime reloads
     env: {
       PORT: process.env.PORT || 8080,
       NODE_ENV: process.env.NODE_ENV || "production"
     },
     watch: false,           // set true for local dev with `npm run pm2:dev`
     max_restarts: 10,
     kill_timeout: 5000
   }
 ]
}
