var $body = $(document);
$body.bind('scroll', function() {
  // "Disable" the horizontal scroll.
  if ($body.scrollLeft() !== 0) {
    $body.scrollLeft(0);
  }
});

particlesJS.load('particles-js', 'scripts/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

$("#blog-button").click(function() {
  window.location.href = "http://dustinmalik.com/blog";
});


var intro = $("#header-text").blast({
  delimiter: 'character'
});

intro.each(function(i) {
  // initialize position
  $(this).css({
    position: 'relative',
    right: 0,
    bottom: 0,
    opacity:0
  })

    // Delay: we don't want to animate
    // characters simultaneously
    .delay(i * 30)

    // Animate to the right
    .velocity({ right: '0px', bottom: '0px', opacity: '1' , easing: "easeInSine"}, 275);
});


$("#twitter").mouseenter(function(){
  $(".twittersvg").velocity({fill: "#D55B43"}, { duration: 250, queue: false });
});

$("#twitter").mouseleave(function(){
  $(".twittersvg").velocity({fill: "#D8E4B8"}, { duration: 250, queue: false });
});

$("#twitter").click(function(){
  window.location.href = "https://twitter.com/dustinmalik";
});


$("#linkedin").mouseenter(function(){
  $(".linkedinsvg").velocity({fill: "#D55B43"}, { duration: 250, queue: false });
});

$("#linkedin").mouseleave(function(){
  $(".linkedinsvg").velocity({fill: "#D8E4B8"}, { duration: 250, queue: false });
});

$("#linkedin").click(function(){
  window.location.href = "https://www.linkedin.com/in/dustinmalik";
});

$('.ui.form')
  .form({
    fields: {
      name: {
        identifier  : 'q1_name',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your name'
          }
        ]
      },
      email: {
        identifier  : 'q3_email',
        rules: [
          {
            type   : 'email',
            prompt : 'Please enter a valid email address'
          }
        ]
      },
      subject: {
        identifier  : 'q4_subject',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a subject'
          }
        ]
      },
      message: {
        identifier  : 'q5_message',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a message'
          }
        ]
      }
    }
  });