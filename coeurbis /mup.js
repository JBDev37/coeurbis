module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '151.80.146.217',
      username: 'root',
      // pem: './path/to/pem'
      password: 'mT9nQ5Pm'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'kurbys',
    path: '../kurbys',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://www.kurbys.com',
      MONGO_URL: 'mongodb://151.80.146.217:27017/meteor',
    },

    ssl: { // (optional)
       // Enables let's encrypt (optional)
       autogenerate: {
        email: 'jbroussat@orange.fr',
        // comma separated list of domains
        domains: 'kurbys.com,www.kurbys.com'
      }
     },

    docker: {
      // change to 'kadirahq/meteord' if your app is using Meteor 1.3 or older
      image: 'abernix/meteord:base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.9',
    servers: {
      one: {}
    }
  }
};