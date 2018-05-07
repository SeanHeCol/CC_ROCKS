$(function(){
	var urlParams = new URLSearchParams(window.location.search);
	movieId = urlParams.get("movieId")
	console.log(movieId)
	// Here we ought to send get request with parameter of movie id. 
	// the url should be getMoiveInfo?movieId={movieId}
	$.post("https://myi5wf5oi6.execute-api.us-east-1.amazonaws.com/beta/getmoiveinfobyid",JSON.stringify({"movieId":movieId}),function(data){
		//console.log(data['genres']);
		genres = data['genres'];
		console.log(data);
		$(".genre").html(genres);
		$(".entry-content").html(data['overview']);
		$(".rDate").html(data["release_date"]);
		$(".ratings").html(data["ratings"]);
		$(".poster").attr("src",data["image"]);
		$(".movie-title").html(data["title"])
	});





});