import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http';
import cors from 'cors';

const mongoose = require('mongoose');
require('./models');
const schema = require('./schema/schema.js');

// Replace with your Mongo Atlas URI
const MONGO_URI = 'mongodb+srv://kerurevijay:cMTCKBSMTuvGJPo5@lyrical-graphql-cluster.didksql.mongodb.net/?retryWrites=true&w=majority&appName=lyrical-graphql-cluster-prod-1';

if (!MONGO_URI) {
  throw new Error('You must provide a Mongo Atlas URI');
}

mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to Mongo Atlas instance.'))
  .on('error', (error) =>
    console.log('Error connecting to Mongo Atlas:', error)
  );

const app = express();
const httpServer = http.createServer(app);


// Set up Apollo Server
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

app.use(cors({
  origin: 'https://didactic-waddle-j45qx4pq6rq35446-9000.app.github.dev',
  credentials: true,
}));

server.start().then(async () =>{ {
  app.use('/',
    express.json(),
    expressMiddleware(server),
  );
  
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
}});




const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.server.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
