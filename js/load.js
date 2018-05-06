$(function(){

	function render_normal(images,tmdb,titles,likes){
		html = '<div class="row ml-4 pl-5">';
		for(i = 0; i < images.length; i++){
			color = likes[i] !=true ? 'grey':'#F0437F';
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
		//console.log($(".container-fluid"));
		$(".container-fluid").html(html);
	}




	userId = localStorage.getItem('userId');
	if (userId == null){
		window.location = "404.html";
	}
	var fileName = location.href.split("/").slice(-1); 
	name = fileName[0].split(".")[0];
	if (name == "index"){
		/*
		images = ['http://image.tmdb.org/t/p/w780/uMZqKhT4YA6mqo2yczoznv7IDmv.jpg',
		 'http://image.tmdb.org/t/p/w780/vgpXmVaVyUL7GGiDeiK1mKEKzcX.jpg',
		 'http://image.tmdb.org/t/p/w780/6ksm1sjKMFLbO7UY2i6G1ju9SML.jpg',
		 'http://image.tmdb.org/t/p/w780/eT79mN6LqeDXeLiKwDGmW9Py9Xc.jpg',
		 'http://image.tmdb.org/t/p/w780/e64sOI48hQXyru7naBFyssKFxVd.jpg',
		 'http://image.tmdb.org/t/p/w780/zMyfPUelumio3tiDKPffaUpsQTD.jpg',
		 'http://image.tmdb.org/t/p/w780/jQh15y5YB7bWz1NtffNZmRw0s9D.jpg',
		 'http://image.tmdb.org/t/p/w780/sGO5Qa55p7wTu7FJcX4H4xIVKvS.jpg',
		 'http://image.tmdb.org/t/p/w780/eoWvKD60lT95Ss1MYNgVExpo5iU.jpg',
		 'http://image.tmdb.org/t/p/w780/trtANqAEy9dxRCeIe7YEDVeGkLw.jpg',
		 'http://image.tmdb.org/t/p/w780/lymPNGLZgPHuqM29rKMGV46ANij.jpg',
		 'http://image.tmdb.org/t/p/w780/xve4cgfYItnOhtzLYoTwTVy5FGr.jpg'];
		tmdbids = [862, 8844, 15602, 31357, 11862, 949, 11860, 45325, 9091, 710, 9087, 12110]
		titles = ['Toy Story (1995)',
			 'Jumanji (1995)',
			 'Grumpier Old Men (1995)',
			 'Waiting to Exhale (1995)',
			 'Father of the Bride Part II (1995)',
			 'Heat (1995)',
			 'Sabrina (1995)',
			 'Tom and Huck (1995)',
			 'Sudden Death (1995)',
			 'GoldenEye (1995)',
			 'American President, The (1995)',
			 'Dracula: Dead and Loving It (1995)'];
		likes = [true,true,true,true,true,true,true,true,true,true,true,true]*/
		$(".result").html('<div style="height:300px"></div><div class="loader"></div>');
		$.post("https://myi5wf5oi6.execute-api.us-east-1.amazonaws.com/beta/gethotmovie",JSON.stringify({'userId':userId}),function(data){
			//console.log(data)
			data = JSON.parse(data)
			//console.log(data["images"])
			images = data["images"];
			tmdbids = data["tmdbids"];
			titles = data["titles"];
			likes = data["likes"];
			//console.log(images);
			render_normal(images,tmdbids,titles,likes);
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
                });


                
                function like_event(userId,movieId){
                    url = "https://myi5wf5oi6.execute-api.us-east-1.amazonaws.com/beta/like"
                    $.post(url,JSON.stringify({"userId":userId,"movieId":movieId}),function(data){
                        console.log(data);
                    });
                }	

		})
		//render_normal(images,tmdbids,titles,likes);

	}



});