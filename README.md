# About the project
Cotranscat Back-end is in charge of serving as API to the Cotranscat project (front-end) on the business model.

-------------

# Table of contents

1. [Env files (project configuration constants)](#envFiles)
2. [Pre-configurations required for project compilation](#preconfigurationsRequiredCompilation)
3. [How to compile the project](#howToCompileTheProject)
    1. [Option to compile the project with docker](#optionToCompileTheProjectWithDocker)
    2. [Option to compile the project with package.json scripts](#optionToCompileTheProjectWithPackagejsonScripts)
-------------

## 1. .env files (project configuration constants) <a id="envFiles"/>

The present project contains .env configuration files, contemplating on a large scale the implementation of different development environments. These are the following:

+ local.env (Local environment, should be ignored on git.)
+ develop.env
+ production.env

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

 
## 3. How to compile the project <a id="howToCompileTheProject"/>

The present project has two ways to be compiled, which are through **Docker** or through the **package.json scripts**.

### 3.1. Option to compile the project with docker <a id="optionToCompileTheProjectWithDocker"/>

To compile the project with `Docker` we must take into account the 'enviroment' we want to compile, below are the required commands

``` console
+ docker build . -t contranscat_backend:[OTHER_ENVIRONMENT]

+ docker run -itd -e NODE_ENV=[NAME_ENVIRONMENT] -p [NUMBER_PORT_VARIANT]:8000 contranscat_backend:[OTHER_ENVIRONMENT]
```

**For example to compile with the develop environment:**

``` console
+ docker build . -t contranscat_backend:develop

+ docker run -itd -e NODE_ENV=develop -p 81:8000 contranscat_backend:develop
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
.../cotranscat - backend/src
```

Execute the following command, taking into account the environment in which we want to compile the project

``` console
npm run NAME_ENVIRONMENT
```

**For example**, in the case of the local environment

``` console
npm run local
```