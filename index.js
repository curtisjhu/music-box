var song;
var fft;
var radius;

function preload() {
	song = loadSound("assets/Little Dipper.mp3");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	fft = new p5.FFT();
	song.connect(fft);

	textAlign(CENTER);
	sel = createSelect();
	sel.position(10, 10);
	sel.option('Little Dipper.mp3');
	sel.option('Berlin.mp3');
	sel.option('Cereal Killa.mp3');
	sel.option('New Shoes.mp3');
	sel.option('On My Way.mp3');
	sel.option('Pokemon.mp3');
	sel.changed(mySelectEvent);
	radius = width/3;
}

function draw() {
	var wave = fft.waveform();
	var spectrum = fft.analyze();
	translate(width/2, height/2);

	noStroke();
	for (var i = 0; i < spectrum.length; i++) {
		var x = map(i, 0, spectrum.length-1, -width/2, width/2);

		var s = spectrum[i]/255;
		var mx = map(x, -width/2, width/2, 0, 1);
		fill(s * 244, 200 * mx, 140);
		rect(x, -height/2, 1, height);
	}

	stroke(255);
	fill(0);
	for (var angle = 0; angle < TWO_PI; angle += 0.001) {
		var index = floor(map(angle, 0, TWO_PI, 0, wave.length-1));

		var r = wave[index] * 200;
		rotate(angle);
		rect(radius, 0, r, 1);
	}

	text("This animation is created by ")
}

function mouseClicked() {
	if (song.isPlaying())
		song.pause();
	else
		song.play();
}

function mySelectEvent() {
	let item = sel.value();
	song.pause();
	song = loadSound(`assets/${item}`)
  }