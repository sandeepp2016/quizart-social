const connection = mongoose.createConnection(options.mongoUrl);

 connection.on('connected', function() {
   console.log('Mongoose connection open to: ' + options.mongoUrl);
 });

 connection.on('error', function() {
   console.error('Mongoose connection error: ' + options.mongoUrl);
 });

 process.on('SIGINT', function() {
   mongoose.connection.close(function() {
     console.log('Mongoose connection disconnected due to app SIGINT.');
   });
 });
