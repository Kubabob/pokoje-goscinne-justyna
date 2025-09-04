module.exports = {
  apps: [
    {
      name: 'pokoje-justyna.pl',
      script: 'pnpm run',

      // Process management
      instances: 2, // Number of instances (or 'max' for all CPUs)
      exec_mode: 'cluster', // Enable clustering
      autorestart: true,
      watch: false, // Set to true for development (auto-restart on file changes)
      max_memory_restart: '1G', // Restart if memory exceeds 1GB

      // Environment variables
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '0.0.0.0',
        args: 'dev:prod',
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
        HOST: '0.0.0.0',
        args: 'dev',
      },

      // Logging
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: '/var/log/nextjs/err.log',
      out_file: '/var/log/nextjs/out.log',
      combine_logs: true,

      // Control flow
      min_uptime: '10s',
      max_restarts: 10,
      listen_timeout: 8000,
      kill_timeout: 1600,
    },
  ],
}
