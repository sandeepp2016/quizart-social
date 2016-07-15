#Pull the latest node image
FROM quizrtsocial/base-image


# Create app directory
RUN mkdir -p /usr/src/del-topic
WORKDIR /usr/src/del-topic

# Copy and install dependencies
COPY package.json /usr/src/del-topic
RUN npm install --production

# Bundle app source
COPY delTopicPlugin.js /usr/src/del-topic
COPY delTopicService.js /usr/src/del-topic

CMD npm start
