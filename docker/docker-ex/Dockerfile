FROM ubuntu


RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_24.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

WORKDIR /app

COPY package.json package.json
COPY server.js server.js

RUN npm install

ENTRYPOINT [ "node", "server.js" ]