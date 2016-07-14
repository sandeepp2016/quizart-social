var seneca = require('seneca')();

seneca.use('first-plugin');

seneca.listen(8085);
