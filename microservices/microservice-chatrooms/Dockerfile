FROM quizrtsocial/base-image
WORKDIR /usr/src/service
RUN mkdir /data/chathistory -p
COPY package.json /usr/src/service
RUN npm install --production

COPY chatroom-microservice.js /usr/src/service
COPY chatroom-plugin.js /usr/src/service
COPY friends.schema.js /usr/src/service
COPY groups.schema.js /usr/src/service
COPY user.schema.js /usr/src/service

CMD ["npm","start","--production"]
