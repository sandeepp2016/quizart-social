#Pull the latest node image
FROM quizrtsocial/base-image


# Create app directory
RUN mkdir -p /usr/src/gameplay
WORKDIR /usr/src/gameplay

# Copy and install dependencies
COPY package.json /usr/src/gameplay
RUN npm install --production

# Bundle app source
COPY gameManagerPlugin.js /usr/src/gameplay
COPY gameplayProvisionerPlugin.js /usr/src/gameplay
COPY gameplayProvisionerMicroservice.js /usr/src/gameplay
COPY userAnalytics.schema.js /usr/src/service

CMD ["npm", "start"]
