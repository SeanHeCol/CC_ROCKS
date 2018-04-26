$(function(){
	$(".outLink").click(function(event){
		event.preventDefault();
		console.log(1);
		obj = {"id":1,"mid":2}
		$.post("https://myi5wf5oi6.execute-api.us-east-1.amazonaws.com/beta/click",JSON.stringify(obj),function(data){
			console.log(data);
		})
	});
});