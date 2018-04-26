$(function(){
	UserId = localStorage.getItem('UserId');
	CD =localStorage.getItem("CD")
	if (UserId == null || CD == null){
		window.location.href = "./404.html";
	}
	var apigClient = apigClientFactory.newClient(CD);
	apigClient.movierecPost({},{"userID":userID},{}).then(function(res){
		data = res.data
		console.log(data);
	});
                
            
})