var GuestService = {

	list: [],
	
	add: function(guest) {
		GuestService.list.push(guest);
		GuestService.saveToLocalStorage();
	},
	
	remove: function(guest) {
		//TODO to implemented
	},
	
	getList: function(callback) {
		$.ajax({
			type: 'GET',
			url: 'api/guests',
			dataType: 'json',
			success: function(list) {
				callback(list);
			}
		});
	},
	
	saveToLocalStorage: function () {
		var listJson = JSON.stringify(GuestService.list);
		window.localStorage.setItem('guestlist', listJson);
	},
	
	retrieveFromLocalStorage: function () {
		var listJson = window.localStorage.getItem('guestlist');
		if(listJson) {
			GuestService.list = JSON.parse(listJson);
		}
	}
}