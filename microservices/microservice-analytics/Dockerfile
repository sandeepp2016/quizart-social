FROM quizrtsocial/base-image
WORKDIR /usr/src/service

COPY package.json /usr/src/service
RUN npm install --production

COPY analytics-microservice.js /usr/src/service
COPY analytics-plugin.js /usr/src/service
COPY userAnalytics.schema.js /usr/src/service

CMD ["npm","start","--production"]
