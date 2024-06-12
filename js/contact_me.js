$(function() {
    // Initialize form validation and submission handling
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            // Disable the submit button and show "Sending..." text
            var submitButton = document.getElementById('form-submit');
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            // Send email using EmailJS
            var templateParams = {
                name: name,
                email: email,
                message: message
            };

            emailjs.send('service_nsciq7k', 'template_rptep0g', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    // Reset the submit button
                    submitButton.disabled = false;
                    submitButton.textContent = "Send Message";

                    // Clear all fields
                    $('#contactForm').trigger("reset");
                }, function(error) {
                    console.log('FAILED...', error);
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');

                    // Reset the submit button
                    submitButton.disabled = false;
                    submitButton.textContent = "Send Message";

                    // Clear all fields
                    $('#contactForm').trigger("reset");
                });

            // Prevent default submit behavior
            event.preventDefault();
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    // Handle tab switching for form validation
    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });

    // Clear success message on focusing name input
    $('#name').focus(function() {
        $('#success').html('');
    });

    // Alternative approach to prevent default form submission
    document.getElementById('contact').addEventListener('submit', function(event) {
        event.preventDefault();
    });
});
