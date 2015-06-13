var GuestService = {

	list: [],
	
	add: function (guest, callback) {
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: 'api/guest',
			dataType: "json",
			data: JSON.stringify(guest),
			success: function (data) {
				console.log('Guest created successfully');
				callback(data);
			},
			error: function () {
				console.log('Error: ' + textStatus);
				callback(null);
			}
		});
	},
	
	remove: function (id, callback) {
		$.ajax({
			type: 'DELETE',
			url: 'api/guest/' + id,
			success: function (data) {
				console.log('Guest deleted successfully');
				callback(true);
			},
			error: function () {
				console.log('Error to delete guest');
				callback(false);
			}
		});
	},
	
	getList: function(callback) {
		$.ajax({
			type: 'GET',
			url: 'api/guests',
			dataType: "json", // data type of response
			success: function(response) {
				callback(response);
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