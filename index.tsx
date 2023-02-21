// import $ from "jquery";
let Result = <img id="Result" />;

async function Create() {

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
