$(function() {
	var W = null;
	$('#start-testing').click(function() {
		W = window.open("child.html", "Display", "height=500,width=500");
	});

	$('#card-list li h2').click(function() {
		console.log('showing card');
		if(W !== null) { 
			console.log('W not null');
			W.showCard( $(this).closest('li').find('.card').clone() );
		}
	})
});