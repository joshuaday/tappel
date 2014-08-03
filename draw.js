(function ($) {
	var sprites = { };
	var scenes = { };

	var test = testSprite(32);

	var widgets = [
		{x: 50, y: 0, w: new widget.palette()},
		{x: 0, y: 0, w: new widget.viewer(test)},
		{x: 0, y: 50, w: new widget.zoom(test)}
	]
	var host, canvas, context;

	var held = false;
	function up(e) {
		e.preventDefault();
		held = false;
	}

	function wheel(e) {
		e.preventDefault();
		// e.wheelDelta;
	}

	function down(e) {
		e.preventDefault();
		held = true;
		move(e);
	}

	function cancel(e) {
		e.preventDefault();
	}

	var oldx, oldy;
	function move(e) {
		e.preventDefault();
		var x = e.offsetX;
		var y = e.offsetY;
		if (held) {
			// find a widget
			for (var i = 0; i < widgets.length; i++) {
				var widget = widgets[i];
				if (widget.command) {
					
				}
			}
			
/*
			context.fillStyle = "#FFFFFF";
			context.strokeStyle = "rgba(255, 255, 128, 1)";
			context.lineWidth = 5;
			if (oldx && oldy) {
				//context.beginPath();
				//context.moveTo(oldx, oldy);
				//context.lineTo(x, y);
				//context.stroke();

				// context.clearRect(0, 0, width, height)
				
			} else {
				// context.fillRect(x,y,1,1);
			}
			oldx = x; oldy = y;
*/
		}
	}

	// hidden = document.createElement(canvas); 
	// hidden.width = 64
	// hidden.height = 64
	// context.drawImage(hidden, x, y)

	function animate() {
		requestAnimationFrame(animationFrame);
	}

	function testSprite(s) {
		var original = new art.sprite(s, s);
		for (var i=0; i < 19; i++) {
			original.context.strokeStyle = encodeColor(randomColor());
			original.context.lineWidth = 1.5;
			original.context.beginPath();
			original.context.moveTo(Math.random() * s, Math.random() * s);
			original.context.lineTo(Math.random() * s, Math.random() * s);
			original.context.stroke();
		}
		return original;
	}

	function animationFrame(timestamp) {
		for (var i = 0; i < widgets.length; i++) {
			var
				placement = widgets[i],
				widget = placement.w,
				x1 = placement.x, y1 = placement.y;
			widget.draw();
			if (widget.sprite) {
				context.drawImage(widget.sprite.canvas, x1, y1);
			}
			if (widget.element) {
				$(widget.element)
					.css("position", "absolute")
					.css("left", x1)
					.css("left", y1)
				host.append(widget.element);
			}
		}

		// requestAnimationFrame(animationFrame);
	}

	function init() {
		host = $("#host");
		var width = host.width(), height = host.height();

		canvas = document.createElement("CANVAS");
		canvas.width = width; canvas.height = height;

		context = canvas.getContext('2d');
		context.rect(0, 0, width, height);

		host.append(canvas);

		/* // Loop over each pixel and invert the color.
		var x = 0, y = 0;
		var imgd = context.getImageData(x, y, width, height);
		var pix = imgd.data;

		for (var i = 0, n = pix.length; i < n; i += 4) {
	var r, g, b;
		    pix[i  ] = Math.floor(255 * r);
		    pix[i+1] = Math.floor(255 * g);
		    pix[i+2] = Math.floor(255 * b);
			pix[i+3] = 255;
		    // i+3 is alpha (the fourth element)
		}
		context.putImageData(imgd, x, y);

*/ 

		// Draw the ImageData at the given (x,y) coordinates.


		host.on("mousemove", move);
		host.on("mousedown", down);
		host.on("mouseup", up);
		host.on("mousewheel", wheel);

		host.on("contextmenu", cancel);

		animate();
	}

	$(init);
})(jQuery);

