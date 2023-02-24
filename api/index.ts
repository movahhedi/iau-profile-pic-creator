import express from "express";
import bodyParser from "body-parser";
import Sharp from "sharp";
import cors from "cors";
import CreateSvg from "./create-svg.js";
import { appendFile } from "fs";
import dotenv from "dotenv";

dotenv.config();
const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.set("port", process.env.PORT || 8081);

app.get("/api", async (req, res) => {
	try {
		const data = {
			text_pre: req.query.pre,
			text_main: req.query.main,
			text_post: req.query.post,
			text_desc: req.query.desc,
		};

		const svg = CreateSvg({
			width: 3000,
			height: 3000,
			width_viewBox: 3000,
			height_viewBox: 3000,
			...data,
		});

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
				// const svg_res = `data:image/png;base64,${result.toString("base64")}`;

				res.writeHead(200, {
					"Content-Type": "image/png",
					"Content-Disposition": `attachment; filename="IAU-ProfilePic-${Date.now()}.png"`,
				});
				res.end(result);

				console.timeEnd("Sharp");
			});

		appendFile("log.txt", JSON.stringify(data) + "\r\n", () => undefined);
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
	console.log("iau-profile-pic-creator api is running on port", app.get("port"));
});

export default app;
