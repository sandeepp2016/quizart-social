var seneca = require('seneca');

var timelinemicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';

timelinemicroservice.use('./timeline-plugin'

});
timelinemicroservice.use('mesh', {auto:true, pin:'role:timelineservice,cmd:*'});
