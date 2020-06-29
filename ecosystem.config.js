module.exports = {
    apps: [
        {
            name: 'app',
            script: './dist/myBlogServer.es5.js',
            watch: './dist/myBlogServer.es5.js',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            },
            instances: 4,
            exec_mode: 'cluster'
        }
    ],

    deploy: {
        production: {
            user: 'SSH_USERNAME',
            host: 'SSH_HOSTMACHINE',
            ref: 'origin/master',
            repo: 'GIT_REPOSITORY',
            path: 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': ''
        }
    }
};
