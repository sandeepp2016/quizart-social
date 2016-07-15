FROM quizrtsocial/base-image
WORKDIR /usr/src/service

COPY package.json /usr/src/service
RUN npm install --production

COPY friend-microservice.js /usr/src/service
COPY friend-plugin.js /usr/src/service
COPY friend.schema.js /usr/src/service

CMD ["npm","start","--production"]
