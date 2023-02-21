// import $ from "jquery";
import Jimp from "jimp/browser/lib/jimp";
declare global {
	interface Window {
		Jimp: Jimp
	}
}

let FontUrl = "assets/font/a.fnt",
	ImageUrl = "assets/a.png",
	JimpReadImage = window.Jimp.read({ url: ImageUrl }),
	JimpLoadFont = window.Jimp.loadFont(FontUrl),
	Result = <img src="" id="Result" />;

async function Create() {
	return Promise.all([JimpReadImage, JimpLoadFont])
		.then(([image, font]) => {
			image.print(
				font,
				10,
				10,
				{
					text: "Hello world!",
					alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
					alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
				},
				500,
				200,
			)
			.getBase64("image/png", (err, res) => {
				(Result as HTMLImageElement).src = res;
			})
		})
		.catch((error) => {
			console.log(`Error loading image -> ${error}`);
		});
}

let InitialBody = (
	<div>
		<div className="InputBox">
			<label htmlFor="InputText" className="InputLabel">
				Course Name
			</label>
			<input type="text" className="InputText" id="InputText" />
		</div>

		<button type="button" id="Create" onClick={Create}>
			Create
		</button>

		<div class="image-container">
			{Result}
		</div>
	</div>
);

document.body.appendChild(InitialBody);
