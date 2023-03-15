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

    
+ It requires the assignment of values for the mysql DB connection keys.
    - `DB_NAME_SERVER`
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

+ **Step 1.** To compile the project with `Docker` we must take into account the 'enviroment'. That is, we must write the environment we want to compile in the file en`docker-compose.yml` the `APP_ENV` property (see example below)

```Docker
    docker-cotranstcat-backend.com:
    build: .
    ports:
      - 80:8000 
    environment:
      APP_ENV: local
    volumes:
      - ./src:/usr/src
```

+ **Step 2.** we want to compile, below are the required commands `on a terminal located in the root folder of the Cotranscat back-end project`.

``` console
docker-compose up -d --build --remove-orphans
```

> ***Note**: the steps contained in `step 3` will only be performed once at the start of the database configuration for the Cotranscat back-end project container.*

+ **Step 3.** Access the docker dashboard and select the terminal of the sub-container "mysql database service" which is located inside the Cotranscat back-end project container. 
    
    >**Within the `Docker terminal` run the following:**

    - **Step 3.1.** Activate the terminal bash shell

    ``` console
    bash
    ```

    - **Step 3.2.** Access the mysql server as an 'admin' user. For this it is recommended to take into account the credentials set in `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` that are inside the `docker-compose.yml` file.

    ``` console
    mysql -u "MONGO_INITDB_ROOT_USERNAME" -p "MONGO_INITDB_ROOT_PASSWORD" 127.0.0.1 --authenticationDatabase "admin"
    ```

    > ****Note***: the flag '--authenticationDatabase' refers to a role, i.e., considering the above command, the mysql database server is accessed with the role of 'admin'.*

    - **Step 3.3.** Create the database with the following command
    > ***Note**: For this point it is recommended to take into account the values stored in the .env that you want to execute (DB_DATABASE).*

    ```console
    use DB_DATABASE
    ```
    
    - **Step 3.4.** Insert the following documents on the **collection role**, in order to make the creation of the DB effective.
    
    ```console
    db.role.insert([ { "role": "ADMIN_ROLE" }, { "role": "USER_ROLE" }])
    ```
    
    - **Step 3.5.** Create the user with permissions to the database from the previous step.

    > ***Note**: For this point it is recommended to take into account the values stored in the .env that you want to execute (DB_USERNAME, DB_PASSWORD and DB_DATABASE).*

    ```console
    db.createUser(
      {
        user: "DB_USERNAME",
        pwd: "DB_PASSWORD",   
        roles:
          [
            { role: "dbOwner", db: "DB_DATABASE" }
          ]
      }
    )
    ```
    - **Step 3.6.** After the previous steps have been performed, the following command must be executed `on a terminal located in the root folder of the Cotranscat back-end project`, in order to compile the new changes in the database server.

    ```console
    docker-compose up -d --build
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