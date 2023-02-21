import Sharp from "sharp";

try {
	const width = 360;
	const height = 203;
	const label = "سلام Text";

	const svg = `
		<svg width="${width}" height="${height}" viewBox="0 0 ${height} ${height + 2}">
			<style>
				.name {
					direction: rtl;
					font: 500 30px "Vazirmatn";
				}
			</style>

			<text class="name" x="50%" y="50%" text-anchor="middle" dy="0.5em" fill="#000">${label}</text>
		</svg>`;

	const svg_buffer = Buffer.from(svg);

	console.time("Sharp");

	Sharp("a.png")
		.composite([{
			input: svg_buffer,
			top: 0,
			left: 0,
		}])
		.png()
		.toFile("b.png")
		/*.toBuffer()
		.then((result) => {
			console.log(`data:image/png;base64,${result.toString("base64")}`);
		});*/

	console.timeEnd("Sharp");

} catch (err) {
	console.log(err);
}
