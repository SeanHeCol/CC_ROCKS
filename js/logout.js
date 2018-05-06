$(function(){
	$(".logout").click(function(event){
		event.preventDefault();
		localStorage.clear();
		window.location = "intro.html";
	});
});