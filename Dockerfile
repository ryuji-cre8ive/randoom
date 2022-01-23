FROM node:12-alpine

ENV HOST 0.0.0.0

RUN mkdir -p /app
COPY ./src /app
WORKDIR /app

ARG ENV
ENV ENV $ENV

RUN yarn && yarn build

EXPOSE 3000

CMD ["yarn", "start"]
