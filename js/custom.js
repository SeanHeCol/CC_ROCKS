
(function($) {
    //'use strict';
    function like_event(userId,movieId){
        url = "https://myi5wf5oi6.execute-api.us-east-1.amazonaws.com/beta/like"
        $.post(url,JSON.stringify({"userId":userId,"movieId":movieId}),function(data){
            console.log(data);
        });
    }
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
    var urlParams = new URLSearchParams(window.location.search);
    code = urlParams.get("code")
    CD = localStorage.getItem('CD');
    userId = localStorage.getItem('userId');
    
    
    if(code == null && userId == null){
        window.location.href = "./404.html";
    }
    //var apigClient = apigClientFactory.newClient(CD);
    requestbody = "grant_type=authorization_code&code="+code+"&redirect_uri=https://s3.amazonaws.com/movie-recommendation/index.html"
    $.ajax({
            url:"https://chatbox.auth.us-east-1.amazoncognito.com/oauth2/token",
            type:"POST",
            beforeSend: function(xhr){
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Authorization', "Basic " + btoa('650eoec1rb2bl5lcl4vqcv8eq5' + ":" + 'dn384mh8mnivssh7hdf8c9dr52dsqru64f3ac4t92hmekh7do41'));
            },
            data:
                "grant_type=authorization_code&client_id=650eoec1rb2bl5lcl4vqcv8eq5&code="+code+"&redirect_uri=https://s3.amazonaws.com/movie-recommendation/index.html"
            ,
            success:function(data){
                access_token = data['access_token']
                id_token = data['id_token']
                refresh_token = data['refresh_token']

                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-east-1:790d8088-a03e-420d-8c5e-bb6023cb77d5',
                    Logins: {
                        'cognito-idp.us-east-1.amazonaws.com/us-east-1_T1C0zKpXq': id_token
                    }
                },{

                       region: 'us-east-1',
                       httpOptions: {
                         timeout: 500
                    }
                });
                AWS.config.credentials.refresh(function(error){
                var credentials = AWS.config.credentials['data']['Credentials'];
                userId = AWS.config.credentials['data']['IdentityId'];
                localStorage.setItem('userId',userId);
                CD = {
                    accessKey: credentials['AccessKeyId'],
                    secretKey: credentials['SecretKey'],
                    sessionToken: credentials['SessionToken'],
                    region: 'us-east-1'
                }
                localStorage.setItem('CD',CD);
                var apigClient = apigClientFactory.newClient(CD);


                //console.log(credentials)
                //apigClient.movierecPost({},{"message":"hi, jason", "userID":userID},{});
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
                // if (userId == null){
                //  window.location = "404.html";
                // }
                var fileName = location.href.split("/").slice(-1); 
                name = fileName[0].split(".")[0];
                if (name == "index"){
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
            },
            error:function(data){
                 
                 userId = localStorage.getItem('userId');
                 if (userId != null){
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

                 }else{
                    window.location.href = "./404.html";
                 }

            }

            
    });
    // Main Navigation
    
})(jQuery);
