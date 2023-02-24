// import $ from "jquery";
import CreateSvg from "../api/create-svg";

const InputBox = (props, children) => (
	<div className="InputBox">
		<label htmlFor="InputText" className="InputLabel form-label">
			{props.Label}
		</label>
		{children}
	</div>
);
const MyInputText = (props) => <input type="text" className="InputText form-control" id="InputText" onInput={Create} value={props.value} />;

let Result_Image = <div id="Result-Svg" class="img-fluid"></div>,
	// Result_Image = <img id="Result" class="img-fluid" />,
	DownloadLink = (
		<a id="DownloadLink" class="btn btn-primary" href="#" download="IAU-ProfilePic.png">
			دانلود
		</a>
	),
	Content_Pre_Input = <MyInputText value="مبانی" />,
	Content_Main_Input = <MyInputText value="کامپیوتر" />,
	Content_Post_Input = <MyInputText value="و برنامه سازی" />,
	Content_Desc_Input = <MyInputText value="استاد رضایی، دوشنبه ساعت 10:15" />;

function Create() {
	const svg = CreateSvg({
		width: "100%",
		height: "100%",
		width_viewBox: 3000,
		height_viewBox: 3000,
		text_pre: (Content_Pre_Input as HTMLInputElement).value,
		text_main: (Content_Main_Input as HTMLInputElement).value,
		text_post: (Content_Post_Input as HTMLInputElement).value,
		text_desc: (Content_Desc_Input as HTMLInputElement).value,
	});

	Result_Image.innerHTML = svg;

	(DownloadLink as HTMLAnchorElement).href =
		import.meta.env.VITE_API_URL +
		"?" +
		new URLSearchParams({
			pre: (Content_Pre_Input as HTMLInputElement).value,
			main: (Content_Main_Input as HTMLInputElement).value,
			post: (Content_Post_Input as HTMLInputElement).value,
			desc: (Content_Desc_Input as HTMLInputElement).value,
		});

	(DownloadLink as HTMLAnchorElement).download = `IAU-${(Content_Main_Input as HTMLInputElement).value}.png`;
}

function ClearInputs() {
	(Content_Pre_Input as HTMLInputElement).value = "";
	(Content_Main_Input as HTMLInputElement).value = "";
	(Content_Post_Input as HTMLInputElement).value = "";
	(Content_Desc_Input as HTMLInputElement).value = "";
	Create();
}

let InitialBody = (
	<div>
		<fieldset>
			<InputBox Label="پیشوند">{Content_Pre_Input}</InputBox>
			<InputBox Label="نام اصلی">{Content_Main_Input}</InputBox>
			<InputBox Label="پسوند">{Content_Post_Input}</InputBox>
			<InputBox Label="توضیحات">{Content_Desc_Input}</InputBox>

			{DownloadLink}

			<button type="button" id="ClearInputs" class="btn btn-danger" onClick={ClearInputs}>
				پاک کردن متن‌ها
			</button>
		</fieldset>

		<div class="container py-4 px-3 mx-auto">{Result_Image}</div>
	</div>
);

document.body.appendChild(InitialBody);

Create();
