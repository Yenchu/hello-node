/* Notify class names */
var NotifyType = {INFO:'alert-info', SUCCESS:'alert-success', WARNING:'alert-warning', ERROR:'alert-danger'};
function notify(message, type, order) {
	type = type || 'alert-info';
	order = order || 0;
	var notify = '<div class="alert '
		+ type 
		+ ' alert-dismissable" style="z-index:1051;position:fixed;"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
		+ message
		+ '</div>';
	var $notify = $(notify).appendTo(document.body);
	var x = $(window).width() / 2 - $notify.outerWidth() / 2,  y = (20 * (order + 1)) + ($notify.outerHeight() * order);
	$notify.css({top:y+"px", left:x+"px"});
	setTimeout(function() {$notify.fadeOut(2000, 'swing', function(){$(this).remove();});}, 5000);
}

function info(message, order) {
	notify(message, NotifyType.INFO, order);
}

function success(message, order) {
	notify(message, NotifyType.SUCCESS, order);
}

function warn(message, order) {
	notify(message, NotifyType.WARNING, order);
}

function error(message, order) {
	notify(message, NotifyType.ERROR, order);
}