#Pull the latest node image
FROM quizrtsocial/base-image


# Create app directory
RUN mkdir -p /usr/src/all-tournaments

WORKDIR /usr/src/all-tournaments

# Copy and install dependencies
COPY package.json /usr/src/all-tournaments
RUN npm install --production

# Bundle app source

 COPY allTournamentsPlugin.js /usr/src/all-tournaments

COPY allTournamentsService.js /usr/src/all-tournaments

CMD npm start
