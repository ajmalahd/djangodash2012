function Tutorial (config) {
    var self = this;
    self.id = config.id;
    self.currentStep = config.step;
    self.editor = ace.edit($('.django-ace-widget').get(0).firstChild);
    self.runButton = $('#tutorialRunButton');

    self.runButton.click(function () {
        var code = self.editor.getValue();
        self.sendCode(code);
    });
}

Tutorial.prototype.sendCode = function (code) {
    var self = this;
    $.ajax('/tutorial/' + self.id + '/' + self.currentStep + '/run/', {
        type: "POST",
        data: code,
        dataType: "json",
        success: function (data, textStatus, xhr) {
            console.log('success', arguments);
        },
        failure: function () {
            console.log('failure', arguments);
        }
    });
};