First of all, thank you for giving me chance to work on this interview task.

For the stack i have used Express.js with MongoDB. Example stacks were provided,
but the requirement did not stated that I need to used the example stacks only, so I took this desicion and used the technology I am comfortable with. I hope it is not an issue.

## Authorization

I did not implemented authentication but I am mocking authorization to make sure only users with Manager and Admin roles could use these requests. You can find tokens in the config folder. Please use Authorization header "Bearer \*token".

## Set up

Before starting the project, please download neccessary packages with "npm i".
You will need to have MongoDb installed on your device. If you cant connect to database, please create a MongoDb connection and change database Uri link in the config folder.

## Tests

To run tests, please run "npm run test"

## Starting application

To start the application, please run "npm run dev"
