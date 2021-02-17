FROM node:lts-alpine

ENV APP /app/
WORKDIR $APP

COPY ./package*.json $APP
RUN npm ci --production

COPY . $APP

ENV PORT 3000
EXPOSE $PORT

CMD npm run start
