#Pull the latest node image
FROM quizrtsocial/base-image


# Create app directory
RUN mkdir -p /usr/src/tournament-section
WORKDIR /usr/src/tournament-section

# Copy and install dependencies
COPY package.json /usr/src/tournament-section
RUN npm install --production

# Bundle app source
COPY randTournamentsPlugin.js /usr/src/tournament-section
COPY tournamentService.js /usr/src/tournament-section

CMD npm start
