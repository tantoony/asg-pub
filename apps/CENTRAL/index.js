const pm2 = require('pm2')

pm2.connect(function () {
    /*
  pm2.sendDataToProcessId({
    id   : 1,
    type : 'process:msg',
    data : {
      some : 'data'
    },
    topic: true
  }, function(err, res) {

  })
  */
})

pm2.launchBus(function (err, pm2_bus) {
    pm2_bus.on('process:msg', function (packet) {
        console.log(packet)
    })
})
