import express from "express";
import bodyParser from "body-parser";
import Sharp from "sharp";
import cors from "cors";

const app = express();
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies
app.use(cors());

app.set("port", process.env.PORT || 8081);

app.post("/api", async (req, res) => {
	try {
		const width = 360;
		const height = 203;
		console.log(req.body);
		const label = req.body.CourseName;

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
			.composite([
				{
					input: svg_buffer,
					top: 0,
					left: 0,
				},
			])
			.png()
			.toBuffer()
			.then((result) => {
				const svg_res = `data:image/png;base64,${result.toString("base64")}`;

				res.writeHead(200, {
					"Content-Type": "image/png",
					"Content-Length": svg_res.length,
				});
				res.end(svg_res);

				console.timeEnd("Sharp");
			});

	} catch (err) {
		processErrorResponse(res, 500, err);
	}
});

function processErrorResponse(res, statusCode, message) {
	console.log(`${statusCode} ${message}`);
	res.status(statusCode).send({
		error: {
			status: statusCode,
			message: message,
		},
	});
}

app.listen(app.get("port"), () => {
	console.log("Express is running on port", app.get("port"));
});

export default app;
