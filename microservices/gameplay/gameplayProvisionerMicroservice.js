var seneca = require('seneca');
var provisioner = seneca();
provisioner.use('./gameplayProvisionerPlugin');
provisioner.use('redis-transport');
provisioner.listen({type:'redis',pin:'role:provisioner,action:*'});
