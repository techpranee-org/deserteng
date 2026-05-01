$(document).ready(function () {
    console.log('form ready')
    var form = jQuery('#myForm'); // contact form
    var submit = jQuery('.submit-btn'); // submit button
    var alert = jQuery('.alert-msg'); // alert div for show alert message
    console.log('submit fn invoked');
    // form submit event
    form.on('submit', function (e) {
        console.log('form submitted')
        e.preventDefault(); // prevent default form submit

        $.ajax({
            url: '/applynow', // form action url
            type: 'POST', // form submit method get/post
            dataType: 'html', // request type html/json/xml
            data: form, // serialize form data
            // beforeSend: function () {
            // 	alert.fadeOut();
            // 	submit.html('Sending....'); // change submit button text
            // },
            success: function (data) {
                console.log('got success')
                alert.html(data).fadeIn(); // fade in response data
                form.trigger('reset'); // reset form
                submit.attr('style', 'display: none !important'); // reset submit button text
            },
            error: function (e) {
                console.log('got error')
                console.log(e);
            },
        });
    });
});