FROM quizrtsocial/base-image
WORKDIR /usr/src/service

COPY package.json /usr/src/service
RUN npm install --production

COPY timeline-microservice.js /usr/src/service
COPY timeline-plugin.js /usr/src/service
COPY twitter.auth.schema.js /usr/src/service

CMD ["npm","start","--production"]
