## Pipeline Status

[![pipeline status](https://gitlab.wiedii.co/lions/prototype-backend-node-mongodb/badges/develop/pipeline.svg)](https://gitlab.wiedii.co/lions/prototype-backend-node-mongodb/-/commits/develop)

## Latest release

[![Latest Release](https://gitlab.wiedii.co/lions/prototype-backend-node-mongodb/-/badges/release.svg)](https://gitlab.wiedii.co/lions/prototype-backend-node-mongodb/-/releases)

## Set .env files

+ .env => Local environment, should be ignored.
+ develop.env
+ qa.env
+ staging.env
+ production.env

## How to use develop

+ docker build . -t node_prototype:develop

+ docker run -itd -e NODE_ENV=develop -p 81:8000 node_prototype:develop

## How to use otherEnvironment

+ docker build . -t node_prototype:otherEnvironment

+ docker run -itd -e NODE_ENV=nameEnvironment -p numberPortVariant:8000 node_prototype:otherEnvironment

## see all "docker" containers
docker ps

## view log records of a specific container
docker logs -f idContainer