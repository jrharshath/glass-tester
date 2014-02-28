$(function() {
	var W = null;

	$('#start-testing').click(function() {
		var $this = $(this);
		if($this.hasClass('test-running')) { 
			W.close();
		} else {
			W = window.open("child.html", "Display", "height=500,width=500");
			$this.addClass('test-running').text('Stop Testing');
			$('#card-list').addClass('test-running');

			W.onbeforeunload = function() { 
				$('#start-testing').removeClass('test-running').text('Start Testing');
				$('#card-list').removeClass('test-running');
				W = null;
			};
		}
	});

	$('#card-list li h2').click(function() {
		if(W !== null) { 
			var cardclone = $(this).closest('li').clone();
			cardclone.find('h2').remove();
			W.showCard(cardclone);
		}
	})

	$('#card-list li').drags({handle:'h2', cb: function() {
		var $li = $(this).closest('li');
		var id = $li.attr('id');

		var pos = $li.css('top') + "," + $li.css('left');
		$.cookie(id+"_pos", pos);
	}});

	$('#card-list li').each(function(i, li) {
		
		var cookiename = $(li).attr('id') + "_pos";
		var pos = $.cookie(cookiename);

		if(pos !== undefined) {
			var posarr = pos.split(',');
			$(li).css({
				position: 'relative',
				top: posarr[0],
				left: posarr[1],
				'z-index': 'auto'
			});
		}		
	});

	$("#clear-positions").click(function() {
		$('#card-list li').each(function(i, li) {
			$.removeCookie( $(li).attr('id')+"_pos" );
		});

		if(W !== null) {
			W.close();
		}
		window.location.reload();
	});
});