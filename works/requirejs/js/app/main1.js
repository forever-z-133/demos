define(function (require) {
    var $ = require('jquery'),
        lib = require('./lib'),
        controller = require('./controller/c1'),
        model = require('./model/m1');

    controller.setModel(model);
    $(function () {
        controller.render(lib.getBody());
    });
});
