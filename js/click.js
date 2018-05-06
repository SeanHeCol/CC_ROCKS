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
    id = localStorage.getItem("userId");
    if (id == null){
        window.location = "404.html";
    }
	$(".outLink").click(function(event){
		event.preventDefault();
		console.log(1);
		obj = {"id":1,"mid":2}
        item = $($(this).get(0));
        id = localStorage.getItem("userId");
        mid = item.attr("href").split("/");
        mid = mid[mid.length-1];
        obj = {"id":id,"mid":mid}
		$.post("https://myi5wf5oi6.execute-api.us-east-1.amazonaws.com/beta/click",JSON.stringify(obj),function(data){
			console.log(item);
            console.log(event);
            window.location = item.attr('href');
		})
	});
});