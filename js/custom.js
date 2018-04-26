
(function($) {
    //'use strict';
    var urlParams = new URLSearchParams(window.location.search);
    code = urlParams.get("code")
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
                userID = AWS.config.credentials['data']['IdentityId'];
                localStorage.setItem('UserId',UserId);
                CD = {
                    accessKey: credentials['AccessKeyId'],
                    secretKey: credentials['SecretKey'],
                    sessionToken: credentials['SessionToken'],
                    region: 'us-east-1'
                }
                localStorage.setItem('CD',CD);
                var apigClient = apigClientFactory.newClient(CD);
                //console.log(credentials)
                apigClient.movierecPost({},{"message":"hi, jason", "userID":userID},{});
                
            });
            },
            error:function(data){
                window.location.href = "./404.html";
            }

            
    });
    // Main Navigation
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
})(jQuery);
