var GuestController = {
	
	init: function () {
		GuestController.setForm();
		GuestController.showList();
	},
	
	setForm: function () {
		var form = document.querySelector('form');
		form.addEventListener('submit', function(event) {
			GuestController.addGuest(form);
			//it is to avoid form submition
			event.preventDefault();
		});
	},
	
	addGuest: function(form) {
		var guest = {
			name: form.name.value,
			email: form.email.value
		};
		GuestService.add(guest);
		GuestController.addToHTML(guest);
	},
	
	showList: function () {
		GuestService.getList(function(list) {
			list.forEach(function(guest) {
				GuestController.addToHTML(guest);
			});	
		});
	},
	
	addToHTML: function (guest) {
		var
			guestList = document.getElementById('guestList'),
			dl = document.createElement('dl'),
			dt = GuestController.createDT(guest),
			ddName = GuestController.createDD(guest.name, 'name'),
			ddEmail = GuestController.createDD(guest.email, 'email');
		
		dl.appendChild(dt);
		dl.appendChild(ddName);
		dl.appendChild(ddEmail);
		
		guestList.appendChild(dl);
	},
	
	createImage: function(imageLocation) {
		var img = document.createElement('img');
		img.src = imageLocation;
		return img;
	},
	
	createDT: function(guest) {
		var 
			dt = document.createElement('dt'),
			img = GuestController.createImage('http://www.gravatar.com/avatar/hash-md5');
		
		dt.appendChild(img);
		dt.className = "photo";
		
		return dt;
	},
	
	createDD: function(value, className) {
		var dd = document.createElement('dd');
		
		dd.innerHTML = value;
		dd.className = className;
		
		return dd;
	}

};

//initialization
GuestController.init();
