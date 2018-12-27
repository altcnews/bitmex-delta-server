FROM mhart/alpine-node:11.6.0

RUN mkdir /app /app/lib /app/nodejs
WORKDIR /app

COPY package.json /app
RUN npm install

# TODO: healthcheck

COPY nodejs /app/nodejs
COPY lib /app/lib
COPY index.js /app

COPY config.js /app

CMD ["node", "index.js"]
