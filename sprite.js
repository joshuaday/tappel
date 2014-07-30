declare ("art.sprite", {
	init: function (width_or_url, height) {
		this.history = [];
		if (typeof width_or_url === "string") {
			this.load(width_or_url);
		} else {
			this.resize(width_or_url, height);
		}
	},
	resize: function (width, height, keep) {
		var canvas = document.createElement('CANVAS');
		width = width || 32;
		height = height || width;
		if (this.canvas && this.width == width && this.height == height && keep !== false) {
			return;
		}
		this.width = width;
		this.height = height;
		canvas.width = width;
		canvas.height = height;
		var context = canvas.getContext('2d');
		if (this.canvas && keep !== false) {
			context.drawImage(this.canvas, 0, 0);
		}
		this.canvas = canvas;
		this.context = context;
	},
	blit: function (context, x, y) {
		context.drawImage(this.canvas, x, y);
	},
	pushUndo: function () {
		this.history.push(this.canvas.toDataURL());
	},
	popUndo: function () {
		var dataUrl = this.history.pop();
		load(dataUrl);
	},
	load: function(url) {
		var img = document.createElement('IMG'), self = this;
		img.onload = cb;
		img.src = url;

		function cb() {
			self.resize(img.naturalWidth, img.naturalHeight);
			self.context.drawImage(img, 0, 0);
		}
	}
});

