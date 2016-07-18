#Pull the latest node image
FROM quizrtsocial/base-image


# Create app directory
RUN mkdir -p /usr/src/tournament
WORKDIR /usr/src/tournament

# Copy and install dependencies
COPY package.json /usr/src/tournament
RUN npm install --production

# Bundle app source
COPY tournament-microservice.js /usr/src/tournament
COPY tournament-plugin.js /usr/src/tournament
COPY tournament.schema.js /usr/src/tournament

CMD ["npm", "start"]
