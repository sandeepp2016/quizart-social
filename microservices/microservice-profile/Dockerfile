FROM quizrtsocial/base-image
WORKDIR /usr/src/service

COPY package.json /usr/src/service
RUN npm install --production

COPY profile-microservice.js /usr/src/service
COPY profile-plugin.js /usr/src/service
COPY profile.schema.js /usr/src/service

CMD ["npm","start","--production"]
