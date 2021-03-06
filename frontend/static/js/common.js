var getTask = function (task_id, callback) {
    var self = this;
    $.ajax('/task/' + task_id + '/', {
        type: 'GET',
        dataType: "json",
        success: function (data, textStatus, xhr) {
            callback(data);
            if (data.running) {
                setTimeout(function () {
                    getTask(task_id, callback);
                }, 3000);
            }
        }
    });
};


function displayError (e) {
    $('.alert').remove();
    $('#mainContainer').prepend('<div class="row">'
        +'<div id="stepAlert" class="alert alert-block alert-error fade in">'
            +'<button type="button" class="close" data-dismiss="alert">×</button>'
            +'<h4 class="alert-heading">Oh snap! You got an error!</h4>'
            +'<p>' + e + '</p>'
        +'</div>'
    +'</div>');
    $('.alert').alert();
}

jQuery.ajaxSetup({
    error: function (r, s, e) {
        displayError(e);
    }
});

jQuery(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});