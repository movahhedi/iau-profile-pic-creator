export default ({ width, height, width_viewBox = 3000, height_viewBox = 3000, text_pre, text_main, text_post, text_desc }) => `
	<svg width="${width}" height="${height}" viewBox="0 0 ${width_viewBox} ${height_viewBox}">
		<style>
			.svg-content {
				direction: rtl;
				font: 700 400px "Vazirmatn";
			}
			.svg-content.pre {
				font-size: 180px;
			}
			.svg-content.post {
				font-size: 180px;
			}
			.svg-content.main {
				font-size: 400px;
			}
			.svg-content.desc {
				font-weight: 500;
				font-size: 100px;
			}
		</style>

		<text class="svg-content pre" x="50%" y="47%" text-anchor="middle" dy="0.5em" fill="#fff">${text_pre}</text>
		<text class="svg-content main" x="50%" y="59%" text-anchor="middle" dy="0.5em" fill="#fff">${text_main}</text>
		<text class="svg-content post" x="50%" y="75%" text-anchor="middle" dy="0.5em" fill="#fff">${text_post}</text>
		<text class="svg-content desc" x="50%" y="92%" text-anchor="middle" dy="0.5em" fill="#fff">${text_desc}</text>
	</svg>`;
