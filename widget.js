declare ("widget.base", {
	init: function () {
		
	},
	draw: function () {
		
	},
	blit: function (context) {
		
	},
	choose: function () {
		// annotate the event with a choice --
		//   sprite + x + y
		//   a tool
		//   a color
		//   a palette 
		//   a compound
	}
});

declare ("widget.colorPicker", {
	init: function () {
		// this.element = 
	},
	draw: function () {
		
	},
	blit: function (context) {
		
	}
});

declare ("widget.viewer", {
	base: widget.base,
	init: function (original) {
		this.original = original;
	},
	draw: function () {
		this.sprite = this.original;
	}
})

declare ("widget.palette", {
	base: widget.base,
	init: function () {
		this.sprite = new art.sprite();
		this.boxSize = 32; // including gap
		
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
	}
});

declare ("widget.zoom", {
	base: widget.base,
	init: function (original) {
		this.sprite = new art.sprite();
		this.zoom = 8;

		this.original = original;
	},
	command: function (event) {
		var x = event.x / this.zoom;
		var y = event.y / this.zoom;
		this.original.context.getImageData(x, y, 1, 1);
		data.data[0] = 255;
		data.data[1] = 255;
		data.data[2] = 255;
		data.data[3] = 255;
		this.original.context.putImageData(data, x, y);
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
	}
});


function randomColor() {
	return [~~ (Math.random() * 256), ~~ (Math.random() * 256), ~~ (Math.random() * 256)];
}
function encodeColor(color) {
	return "rgb(" + color.join(",") + ")";
}

