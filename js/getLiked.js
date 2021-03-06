$(function(){
	function render(images,tmdb,titles,likes){

		
		html = '<div class="row"><div class="col"><ul class="breadcrumbs flex align-items-center"><li><a href="index.html">Home</a></li><li>liked</li></ul></div></div>'
		html += '<div class="row pl-5">';
		for(i = 0; i < images.length; i++){
			color = likes[i] !=true ? 'grey':'#F0437F'
			console.log(color)
			html+= '<div class=".col-3 .col-md-3 col-lg-3 pl-2 pr-2 pt-2 pb-2">'+
                '<div class="portfolio-content">'+
                    '<figure>'+
                        '<img src="'+images[i]+'" alt="">'+
                    '</figure>'+

                    '<div class="entry-content flex flex-column align-items-center justify-content-center">'+
                        '<h3><a class ="outLink" href="https://www.themoviedb.org/movie/' + tmdb[i]+'">'+titles[i]+'</a></h3>'+

                        '<ul class="flex flex-wrap justify-content-center">'+
                            '<li><a href="#">'+titles[i]+'</a></li>'+
                            '<li><a href="#">Tree</a></li>'+
                        '</ul>'+
                        
                        '<a href="#"><span style="font-size:3em; color:'+ color +'" class="glyphicon glyphicon-heart"></span></a>' +
                    	'<a href="review.html?movieId='+ tmdb[i] +'"><span style="font-size:3em; color:grey" class="glyphicon glyphicon-pencil"></span></a>'+
                    '</div><!-- .entry-content -->'+
                '</div><!-- .portfolio-content -->'+
            '</div><!-- .col -->'	
		}
		html += '</div>';
		$(".container-fluid").html(html);
		$(".glyphicon-heart").click(function(event){
			event.preventDefault();
			//movieId = 
			url = $(this).parent().parent().find("h3 a").attr("href");
			movieId = url.split("\/").slice(-1)[0] 
			console.log(userId,movieId);
			console.log($(this).parent());
			if ($(this).css("color") == "rgb(128, 128, 128)"){
				$(this).css("color","#F0437F");
				like_event(userId,movieId);

			}else{
				$(this).css("color","rgb(128, 128, 128)");
				like_event(userId,movieId);
			}
			idx = tmdbids.indexOf(movieId);
			tmdbids.splice(idx, 1);
			images.splice(idx,1);
			titles.splice(idx,1);
			likes.splice(idx,1);
			render(images,tmdbids,titles,likes);
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
	}
	userId = localStorage.getItem('userId');
	if (userId == null){
		window.location = "404.html";
	}
	url = "https://myi5wf5oi6.execute-api.us-east-1.amazonaws.com/beta/getliked"
	$.post(url, JSON.stringify({"userId":userId}),function(data){
		//console.log(data);
		obj = JSON.parse(data);
		images = obj["images"]
		tmdbids = obj["tmdbids"]
		titles = obj["titles"]
		likes = obj['likes'] 
		render(obj["images"],obj["tmdbids"],obj["titles"],obj["likes"]);



	});

	function like_event(userId,movieId){
		url = "https://myi5wf5oi6.execute-api.us-east-1.amazonaws.com/beta/like"
		$.post(url,JSON.stringify({"userId":userId,"movieId":movieId}),function(data){
			console.log(data);

		});
	}



})