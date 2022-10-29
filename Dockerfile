FROM node:14.4.0-alpine

ARG _NODE_ENV

WORKDIR /app

# タイムゾーンを東京に固定したい場合はこれを記述【★】
# RUN apk --no-cache add tzdata && \
#   cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
#   apk del tzdata

ENV NODE_ENV ${_NODE_ENV}
ENV LANG C.UTF-8
ENV PORT 3000
ENV HOST 0.0.0.0

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

CMD [ "npm", "run", "start" ]