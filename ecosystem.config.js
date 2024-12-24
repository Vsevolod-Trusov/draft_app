require('dotenv').config({ path: `./.${process.env.NODE_ENV}.env` });

module.exports = {
  apps: [
    {
      name: 'zumi-backend',
      script: 'dist/main.js',
      ignore_watch: ['node_modules', 'log'],
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
    },
  ],
};
