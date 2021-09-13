window.splashScreen = (() => {
	return {
		n: () => {

		},
		r: () => {
			c.save();
			c.translate(450, 500);
			c.scale(1, -1);
			c.font = '100px Courier New';
			c.textAlign = 'left';
			c.fillStyle = "white";
			c.fillText('Mars:', 0, 0);
			c.translate(0, 60);
			c.font = '48px Courier New';
			c.fillText('Short Adventure', 0, 0);
			c.restore();
		}
	};
})();
