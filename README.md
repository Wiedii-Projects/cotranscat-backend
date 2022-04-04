## Set .env files

+ .env => Local environment, should be ignored.
+ .env.develop
+ .env.qa
+ .env.staging
+ .env.production

## How to use

+ docker build . -t node_prototype

+ docker run -itd -p 80:8082 node_prototype