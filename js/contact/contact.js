$(document).ready(function() {

    // add overflow hidden to  body
    var body = $('body');
    body.addClass('noScroll');

    // close warning message
    $('.close-warning').click(function() {
        $('section.warning').css("display", "none");
        body.removeClass('noScroll');
    });

    // close cookies
    var closeCookies = $('.close-cookies');
    var cookiesBar = $('.cookies-bar');
    closeCookies.click(function() {
        cookiesBar.css('display', 'none');
    });

    // form
    var form = $('#contact-form');

    form.validate({
        rules: {
            name: {
                required: {
                    depends:function() {
                        $(this).val($.trim($(this).val()));
                        return true;
                    }
                },
                minlength: 3
            },
            email: {
                required: {
                    depends:function() {
                        $(this).val($.trim($(this).val()));
                        return true;
                    }
                },
                email: true
            },
            message: {
                required: true
            }
        },

        messages: {
            name: {
                required: "Numele este obligatoriu.",
                minlength: "Numele trebuie să conțină minim 3 litere."
            },
            email: {
                required: "Email-ul este obligatoriu.",
                email: "Exemplu: 'nume.prenume@gmail.com'"
            },
            message: "Mesajul este obligatoriu.",
        },
        errorElement : 'div',
        submitHandler: function(form) {
			showLoader();
			
            var url = 'http://api.tshstables.ro/api/mail/send';

            var formData = {
                name: $('#name').val(),
                email: $('#email').val(),
                message: $('#message').val()
            };

            // process the form
            $.ajax({
                type:     'POST',
                contentType: 'application/json',
                dataType: 'json',
                url:      url,
                processData: false,
                data:  JSON.stringify(formData),
                error: function(jqXHR, textStatus, errorThrown) {
                    $('#name').val("");
                    $('#email').val("");
                    $('#message').val("");
					
					$('#form-container').addClass('hidden');
					$('#error-message').removeClass('hidden');
					
					hideLoader();
                },

                success: function() {
                    $('#name').val("");
                    $('#email').val("");
                    $('#message').val("");

					$('#form-container').addClass('hidden');
					$('#success-message').removeClass('hidden');
					
					hideLoader();
                }
            });

            return false;
        }
    });
});

function showLoader() {
	$('body').append('<div class="page-transition-wrap"><div class="css3-spinner"><div class="css3-spinner-bounce1"></div><div class="css3-spinner-bounce2"></div><div class="css3-spinner-bounce3"></div></div></div>');
}

function hideLoader() {
	$('.page-transition-wrap').remove();
}