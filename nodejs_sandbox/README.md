My NodeJS sandbox
=================

Actions:

 * install locally with `npm install`
 * then start server with `grunt exec:run`
 * compile with `grunt lint min`
 * generate documentation with `grunt doccoh`
 * run tests with `grunt test`
 
 
Credentials that can't be saved to files stored in git should be managed as environment
variables.  

When running locally on the developers laptop etc:

```
echo AWS_TOKEN=xxx-xxxx-xxx-xxxx > .env 
echo AWS_SECRET=xxx-xxxx-xxx-xxxx >> .env 

# Run with foreman and the env variables are set
foreman
``` 

For deployment on Heroku:

``
heroku config:set AWS_TOKEN=xxx-xxxx-xxx-xxxx
heroku config:set AWS_SECRET=xxx-xxxx-xxx-xxxx
```
 
 
 
Also the node environment should be set:
 
 * `heroku config:set NODE_ENV=development`
 * `heroku config:set NODE_ENV=qa`
 * `heroku config:set NODE_ENV=production` 


Configuration that depends on development/qa/production is placed in config.js

