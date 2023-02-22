// import $ from "jquery";
let Result_Image = <img id="Result" />,
	CourseName_Input = <input type="text" className="InputText" id="InputText" />;

function Create() {
	let Data = new FormData();
	Data.append("CourseName", (CourseName_Input as HTMLInputElement).textContent);

	fetch(import.meta.env.VITE_API_URL, {
		method: "post",
		body: Data,
	})
		.then((res) => res.text())
		.then((text) => {
			(Result_Image as HTMLImageElement).src = text;
		});
}

let InitialBody = (
	<div>
		<div className="InputBox">
			<label htmlFor="InputText" className="InputLabel">
				Course Name
			</label>
			{CourseName_Input}
		</div>

		<button type="button" id="Create" onClick={Create}>
			Create
		</button>

		<div class="image-container">{Result_Image}</div>
	</div>
);

document.body.appendChild(InitialBody);
