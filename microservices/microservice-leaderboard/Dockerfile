#Pull the latest node image
FROM quizrtsocial/base-image


# Create app directory
RUN mkdir -p /usr/src/leaderboard
WORKDIR /usr/src/leaderboard

# Copy and install dependencies
COPY package.json /usr/src/leaderboard
RUN npm install --production

# Bundle app source
COPY leaderboard-microservice.js /usr/src/leaderboard
COPY leaderboard-plugin.js /usr/src/leaderboard
COPY leaderboard.schema.js /usr/src/leaderboard

CMD ["npm", "start", "--production"]
