$(function(){
	$( '.hamburger-menu' ).on( 'click', function() {
        $(this).toggleClass('close');
        $('.site-branding').toggleClass('hide');
        $('.site-navigation').toggleClass('show');
        $('.site-header').toggleClass('no-shadow');
    });

    // Scroll to Next Section
    $( '.scroll-down' ).click(function() {
        $( 'html, body' ).animate({
            scrollTop: $( '.scroll-down' ).offset().top + 100
        }, 800 );
    });
	$(".outLink").click(function(event){
		event.preventDefault();
		console.log(1);
		obj = {"id":1,"mid":2}
		$.post("https://myi5wf5oi6.execute-api.us-east-1.amazonaws.com/beta/click",JSON.stringify(obj),function(data){
			console.log(data);
		})
	});
});