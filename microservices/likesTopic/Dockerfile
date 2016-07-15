#Pull the latest node image
FROM quizrtsocial/base-image


# Create app directory
RUN mkdir -p /usr/src/like-topic
WORKDIR /usr/src/like-topic

# Copy and install dependencies
COPY package.json /usr/src/like-topic
RUN npm install --production

# Bundle app source
COPY likesTopicPlugin.js /usr/src/like-topic
COPY likeTopicService.js /usr/src/like-topic

CMD npm start
