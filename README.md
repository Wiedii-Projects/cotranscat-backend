# About the project
Base node JS project created by the Lions team that mainly implements general functionality with the purpose that it can be taken as a copy for new node JS back-end projects implementing a connection to mongo DB.

> ***Note**: Prototype based on javascript language with folder structure.*

## Implemented modules

+ Authentication
    - Login
    - Change password
    - Validate email
    - Create code
    - Validate code
    - Login with google account
+ User
    - Create user
    - Update user values
    - Get information about a specific user
    - Get all users
    - Delete a certain user (Implements **JWT** reading in the **http request header**)

## Thematic implemented

- Encryption library - `bcryptjs ^2.4.3`
- Load environment variables - `dotenv ^16.0.0`
- Application performance monitoring - `elastic-apm-node ^3.31.0`
- Node.js web application infrastructure - `express ^4.17.3`
- Set of middleware for express.js that wraps the validation functions - `express-validator ^6.14.0`
- Library for google authentication - `google-auth-library ^7.14.1`
- JWT manager - `jsonwebtoken ^8.5.1`
- Library for the connection between MongoDB - `mongoose ^6.2.8`
- Monitor script for use during development - `nodemon ^2.0.15`
- SMS message sending manager - `twilio ^3.77.1`

-------------

# Table of contents

1. [Env files (project configuration constants)](#envFiles)
2. [Pre-configurations required for project compilation](#preconfigurationsRequiredCompilation)
3. [How to compile the project](#howToCompileTheProject)
    1. [Option to compile the project with docker](#optionToCompileTheProjectWithDocker)
    2. [Option to compile the project with package.json scripts](#optionToCompileTheProjectWithPackagejsonScripts)
4. [Folder structure](#FolderStructure)
5. [Development conventions](#DevelopmentConventions)
    1. [Folder definitions](#FolderDefinitions)
    2. [Naming rules](#NamingRules)
    3. [Process flow order](#ProcessFlowOrder)

-------------

## 1. .env files (project configuration constants) <a id="envFiles"/>

The present project contains .env configuration files, contemplating on a large scale the implementation of different development environments. These are the following:

+ local.env (Local environment, should be ignored.)
+ develop.env
+ production.env

> ***Note**: The local .env file should be in the .gitignore list to prevent such local constants from being tracked by git.*

## 2. Pre-configurations required for project compilation <a id="preconfigurationsRequiredCompilation"/>

Open the environment file (.env) that will compile the project

+ It is required to assign values to the node JS server keys, the`SERVER_PORT` key that by **default** will take the **port 8082** and the `SERVER_HOST` key that by **default** will take the **value 'localhost'**.

    
+ It requires the assignment of values for the mongo DB connection keys.
    - `DB_HOST`
    - `DB_PORT`
    - `DB_DATABASE`
    - `DB_USERNAME`
    - `DB_PASSWORD`

+ Assign a value to the `SECRET_OR_PRIVATE_KEY` key (can be any value - This value will be used for the signature of the JWT - Json Web Token.)

+ It is required to have a [Twilio](https://www.twilio.com/try-twilio?utm_source=google&utm_medium=cpc&utm_term=twilio&utm_campaign=Sitelink_G_S_LATAM_Brand_Twilio_Spanish&cq_plac=&cq_net=g&cq_pos=&cq_med=&cq_plt=gp&gclid=CjwKCAiA2rOeBhAsEiwA2Pl7Q-kWEg4qIJVn6R_KMSvwqy9QYIPz3eOJ5yFO92xgWFQPi3NfKiTQihoCh3AQAvD_BwE) account for sending SMS messages, for which it is required to assign the following keys
    - `TWILIO_ACCOUNT_SID`
    - `TWILIO_AUTH_TOKEN`
    - `TWILIO_NUMBER`



+ The following google keys are optional, but for the case of using the google related endpoints, values are required to be assigned
    - `GOOGLE_CLIENT_ID`
    - `GOOGLE_SECRET_ID`

    > ***Note**: To generate these values, follow the steps to create a project in Google Cloud Platform and create OAuth client ID credentials.*
 
## 3. How to compile the project <a id="howToCompileTheProject"/>

The present project has two ways to be compiled, which are through **Docker** or through the **package.json scripts**.
}
### 3.1. Option to compile the project with docker <a id="optionToCompileTheProjectWithDocker"/>

To compile the project with `Docker` we must take into account the 'enviroment' we want to compile, below are the required commands

``` console
+ docker build . -t node_prototype:[OTHER_ENVIRONMENT]

+ docker run -itd -e NODE_ENV=[NAME_ENVIRONMENT] -p [NUMBER_PORT_VARIANT]:8000 node_prototype:[OTHER_ENVIRONMENT]
```

**For example to compile with the develop environment:**

``` console
+ docker build . -t node_prototype:develop

+ docker run -itd -e NODE_ENV=develop -p 81:8000 node_prototype:develop
```

#### Other commands of interest for compilation with Docker 

+ See all docker containers

``` console
docker ps
```

+ View log records of a specific container

``` console
docker logs -f idContainer
```

+ How to use Docker Compose

``` console
docker-compose up -d --build --remove-orphans
```

### 3.2 Option to compile the project with package.json scripts <a id="optionToCompileTheProjectWithPackagejsonScripts"/>

To perform the compilation with the `packge.json scripts` we must first locate through the terminal on the `'src'` folder of the node JS project

``` console
cd /src
```

To make sure that we are in the specified folder we must execute the command

``` console
pwd
```

And get a result of a 'relative path' as follows

``` console
.../Prototype Backend Node - MongoDB/src
```

Execute the following command, taking into account the environment in which we want to compile the project

``` console
npm run NAME_ENVIRONMENT
```

**For example**, in the case of the local environment

``` console
npm run local
```

## 4. Folder structure <a id="FolderStructure"/>

``` 
src/
|-- constants
| |-- core/ (Group by modules or model).
| | |-- app.const.js
| | |-- some-model1.const.js
| | |-- some-model2.const.js
| |-- errors/
| | |-- errors.const.json
| |-- other-type-or-target/
| | |-- other-type-or-target.const.js
| |-- index.constants.js <- (File export barrel of archives)
|-- controllers
| |-- some-module1.controllers.js
| |-- some-module2.controllers.js
| |-- index.controllers.js <- (File export barrel of archives)
|-- db-connections
| |-- mongoose.loaders.js
|-- helpers
| |-- some-model1.helpers.js
| |-- some-model2.helpers.js
| |-- index.helpers.js <- (File export barrel of archives)
|-- middleware
| |-- checks/
| | |-- some-module1.check.middleware.js
| | |-- some-module2.check.middleware.js
| |-- validators/
| | |-- some-model1.validator.middleware.js
| | |-- some-model2.validator.middleware.js
| |-- index.checks.js <- (File export barrel of archives)
| |-- index.validators.js <- (File export barrel of archives)
|-- models
| |-- aggregates/ - (handler models for specific cases that are not related to the business model of the project). 
| | |-- error
| | | |-- error.model.js
| | |-- server
| | | |-- server.model.js
| |-- some-model1/
| | |-- some-model1.model.js
| | |-- some-model1.query.js
| |-- some-model2/
| | |-- some-model2.model.js
| | |-- some-model2.query.js
| |-- index.models.js <- (File export barrel of archives)
| |-- index.queries.js <- (File export barrel of archives)
|-- routes
| |-- some-module1.routes.js
| |-- some-module1.routes.js
app.js
```

## 5. Development conventions <a id="DevelopmentConventions"/>

### 5.1. Folder definitions <a id="FolderDefinitions"/>

Each folder defined in the node JS base prototype project structure has a purpose, and the following table describes them.

#### Constants

+ It contains all the global constants of the project, such as variables of a certain module or model.
+ Located inside the `src` folder

#### Controllers

+ Contains the files grouped by modules that are responsible for resolving a given http request, in it we can find the implementation of resources such as `query files` or `helper files`.
+ Located inside the `src` folder

#### Db-connections

+ Contains the connection file to the mongo DB database
+ Located inside the `src` folder

#### Helpers

+ Contains all decoupled functions with a specific purpose of solving a certain process, such as creating a JWT, encrypting a value, etc. 
+ Located inside the `src` folder

#### Middleware

+ This folder contains the **logic required to ensure that http requests comply with business rules depending on the request**, validating each parameter received, either by the body of the request or its header. With the aim of authorizing a given access to the system.
+ The validation process flow is divided in two folders (`checks` and `validators`)
+ Located inside the `src` folder

#### Checks

+ Contains a set of validation functions for the business model of the project focused on a given global process flow or specific to an http request.
+ Located inside the `src/middleware` folder

#### Validators

+ Contains a set of very specific functions for the validation of a given field of the http request.
+ This type of functions implement resources such as , in order to solve its objective.
+ This type of functions has the purpose of **ATTACHING new values** to the **object of the 'request'** of the http request, in order to be checked in the check.
+ Located inside the `src/middleware` folder

#### Models

+ It reflects the objects that represent the business model of the project, these objects are represented as collections in mongo DB.
+ Located inside the `src` folder

#### Routes

+ Contains all the 'endPoints' available for a given http request made by an external client of the system.
+ Located inside the `src` folder

### 5.2. Naming rules <a id="NamingRules"/>

The characteristics required for a given file, function and variables in the export barrel file are explicitly explained below.

#### 5.2.1. File Naming Convention

All files must contain the following characteristics
 + Lowercase name
 + If the name consists of several words, it must be separated by a **hyphen** or **dash** (-), **for example:**
    - code-sms.model.js
    - code-sms.query.js
    - code-sms.helpers.js
 + The file name must contain the following structure
    - **filename-file-name**.**file-type**.js, **for example:** 
        - auth.routes.js
        - auth.check.middleware.js
        - auth.validator.middleware.js
        - auth.controllers.js
        - app.const.js
        - code-sms.model.js
        - code-sms.query.js
        - code-sms.helpers.js


#### 5.2.2. Variable naming convention in the barrel export file

***Note**: CamelCase format is required for the name assignment.*

|Folder                 |Example        |Structure        |
|-----------------------|---------------|-----------------|
|Constant               |appConst       |NAME`Const`      |
|Controller             |authController |NAME`Controller` |
|Helper                 |authHelpers    |NAME`Helpers`    |
|Check (middleware)     |authMiddleware |NAME`Middleware` |
|Validator (middleware) |authValidators |NAME`Middleware` |
|Model (model)          |n/a            |n/a              |
|Query (model)          |userQuery      |NAME`Query`      |

#### 5.2.3. Function naming convention

|Folder                 |Example           |Structure            |
|-----------------------|------------------|---------------------|
|Controller             |n/a               |n/a                  |
|Helper                 |generateJWTHelper |NAME_FUNCTION`Helper`| 
|Check (middleware)     |n/a               |n/a                  |
|Validator (middleware) |n/a               |n/a                  |
|Model (model)          |n/a               |n/a                  |
|Query (model)          |getCodeQuery      |NAME_FUNCTION`Query` |

### 5.3. Process flow order <a id="ProcessFlowOrder"/>

The following process flow cases are a basic representation that must be complied with when implementing new functionalities. With the objective of standardizing a decoupled hierarchy with unique responsibilities to each element of the structure.

+ First case - process flow

    Case where the http request is not valid for the checks, so an immediate response to the request is returned from the check.

    ``` 
    Route > Check > Validator > ( Query | Helper)
    ```  

+ Second case - process flow

    Case where the http request is valid for the checks, so an immediate response to the request is returned from the controller.

    ``` 
    Route > Check > Validator > ( Query | Helper) > Controller > (Query | Helper)
    ```
