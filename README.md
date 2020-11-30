# scrapeogp

Scrapes OG Tags from Given URl

# Repo Setup

- Install `Node v12.9.1` in your linux.
- Run `npm install` in your terminal after going to the repo directory
- Run `npm run start-dev` in your terminal and visit `http://localhost:3000/`
- You will recieve a status of 200 and message 'I am alive'
- Run `npm test` in your terminal and check logs -> this will trigger the unit test cases

# Lint & Prettify
- Run `npm run lint` to list lint issues
- Run `npm run lint-fix` to fix lint issues.
- Run `npm run prettify` to fix prettier issues.

# Repo Architecture
 - `__tests__` -> will contain unit test cases
 - `graphql` -> will contain resolvers and typedefs
 - `lib` -> will contains files like constant.js
 - `utils` -> will contain utilities like logger, common methods ,etc

# Normal Deploy
- Host it in a server & Run `npm start` which removes the existing build and creates a new build and stores it in build folder and then runs the build/app.js

# local serverless deploy
- Run `npm run local-lambda` this will mimic lambda in local.

# Serverless Deploy
-  Run `npm run deploy-lambda` -> this will deploy the application to your AWS as Lambda. Please check `~/.aws/credentials` whether creds are present.

# Links 
- Github - https://github.com/thalaivar-subu/scrapeogp
- Lambda Url -> https://09t0yxo1kh.execute-api.us-east-1.amazonaws.com/dev/graphql
![alt text](https://ibb.co/fp5tbwM)