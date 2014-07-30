declare ("widget.palette", {
	init: function () {
		this.sprite = new art.sprite();
		this.boxSize = 32; // including gap

		this.element = this.sprite.canvas;
		
		this.colors = [
			[0, 0, 0],
			[255, 0, 0],
			[0, 255, 0],
			[255, 255, 0],
			[0, 0, 255],
			[255, 0, 255],
			[0, 255, 255],
			[255, 255, 255],
			[255, 255, 255]
		];
	},
	draw: function () {
		var w = 16, h = 4;
		this.sprite.resize(w * this.boxSize, h * this.boxSize, false);

		var context = this.sprite.context;

		for (var i = 0; i < this.colors.length; i++) {
			var x = (i % w), y = (i - x) / w;
			var x1 = x * this.boxSize, y1 = y * this.boxSize;
			context.fillStyle = encodeColor(this.colors[i]);
			context.beginPath();
			context.strokeStyle = "#000";
			context.lineWidth = .5;
			context.rect(x1 + 1, y1 + 1, this.boxSize - 1, this.boxSize - 1);
			context.fill();
			context.stroke();
		}
	},
	blit: function (context) {
		var x = 0, y = 0;
		context.drawImage(this.sprite.canvas, x, y);
	}
});

declare ("widget.zoom", {
	init: function () {
		this.sprite = new art.sprite();
		this.zoom = 8;

		var self = this;
		this.original = new art.sprite(32, 32);
		for (var i=0; i < 19; i++) {
			this.original.context.strokeStyle = encodeColor(randomColor());
			this.original.context.lineWidth = 1.5;
			this.original.context.beginPath();
			this.original.context.moveTo(Math.random() * 32, Math.random() * 32);
			this.original.context.lineTo(Math.random() * 32, Math.random() * 32);
			this.original.context.stroke();
		}
	},
	draw: function () {
		if (this.original && this.original.canvas) {
			this.sprite.resize(
				this.original.width * this.zoom,
				this.original.height * this.zoom
			);
			var
				x, y, x1, y1,
				data = this.original.context.getImageData(0, 0, this.original.width, this.original.height), pixels = data.data, idx;

			for (y = 0; y < data.height; y++) {
				for (x = 0; x < data.width; x++) {
					idx = 4 * (x + y * data.width);
					x1 = x * this.zoom;
					y1 = y * this.zoom;
					this.sprite.context.fillStyle = "rgb(" + pixels[idx] + "," + pixels[idx + 1] + "," + pixels[idx + 2] + ")";

					this.sprite.context.beginPath();
					this.sprite.context.rect(x1, y1, this.zoom -.25, this.zoom -.25);
					this.sprite.context.fill();
				}
			}
		} else {
			this.sprite.resize(1, 1, false);
		}
	},
	blit: function (context) {
		var x = 0, y = 64;
		context.drawImage(this.sprite.canvas, x, y);
		context.drawImage(this.original.canvas, x, y);
	}
});


function randomColor() {
	return [~~ (Math.random() * 256), ~~ (Math.random() * 256), ~~ (Math.random() * 256)];
}
function encodeColor(color) {
	return "rgb(" + color.join(",") + ")";
}
