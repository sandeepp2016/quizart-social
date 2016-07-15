FROM quizrtsocial/base-image
WORKDIR /usr/src/service

COPY package.json /usr/src/service
RUN npm install --production

COPY topic-microservice.js /usr/src/service
COPY topic-plugin.js /usr/src/service
COPY topic.schema.js /usr/src/service

CMD ["npm","start","--production"]
