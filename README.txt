READ THIS FILE BEFORE RUNNING APP

Please install all the dependencies first using 'npm i' command.
You can run the lambda function using 'sls offline start' command after you have installed the dependencies.
Before running the app please make sure you have MongoDB installed and mongo server running.

You first need to register a user and then login using user credentials. When you log in a JWT token will be issued which is to be attached by you along all the API headers as 'accesstoken'. The token will be valid for 10 minutes only.
Please refer the models and routes folder for more details


READ BELOW BEFORE USING POSTMAN API COLLECTION

You can find my postman collection here https://documenter.getpostman.com/view/7770893/TVRq36KW

Please provide the unique id's of customer, bank, account or loan wherever required in the API's 
For eg. 'localhost:3000/dev/Account/:accountId/withdraw/:amount' after replacing the accountId and amount the request will look like 'localhost:3000/dev/Account/5f8943dd31064eabbca32636/withdraw/500'

