import express from "express";
import bodyParser from "body-parser";
import Jimp from "jimp";

const app = express();
app.use(bodyParser.json());

app.set("port", process.env.PORT || 8081);

app.get("/api/skills", (req, res) => {
	try {
		Jimp.read("lenna.png", (err, lenna) => {
			if (err) throw err;
			lenna
				.resize(256, 256) // resize
				.quality(60) // set JPEG quality
				.greyscale() // set greyscale
				.write("lena-small-bw.jpg"); // save
		  });
		var errMessage = `${err}`;
		processErrorResponse(res, 500, errMessage);
	}
});

app.get("/api/primarySkill/:skillName", (req, res) => {
	const { skillName } = req.params;
	try {
		const primarySkill = skillsData.allSkills.find((x) => x.primary_term.toLowerCase() === skillName.toLowerCase());
		if (!primarySkill) {
			throw `Primary skill ${skillName} was not found`;
		}
		let associated_terms_sorted = primarySkill.associated_terms.sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio));
		primarySkill.associated_terms = associated_terms_sorted;
		res.send(primarySkill);
	} catch (err) {
		var errMessage = `${err}`;
		processErrorResponse(res, 500, errMessage);
	}
});

app.get("/api/terms", (req, res) => {
	try {
		let transformedSkills = [];
		Object.keys(termsData.allTerms).forEach((primarySkill) => {
			//console.log(`/api/terms: primarySkill = ${primarySkill} termsData.allTerms[primarySkill] = ${JSON.stringify(termsData.allTerms[primarySkill])}`);
			primarySkill.totalCount = termsData.allTerms[primarySkill].categories.length;
			let categories_sorted = termsData.allTerms[primarySkill].categories.sort((a, b) => parseInt(b.filesAndPhrases.length) - parseInt(a.filesAndPhrases.length));
			termsData.allTerms[primarySkill].categories = categories_sorted;
			termsData.allTerms[primarySkill].showSecondary = false;
			transformedSkills.push({ primary_term: primarySkill, categories: termsData.allTerms[primarySkill].categories });
		});
		res.send({ primary_skills: transformedSkills });
	} catch (err) {
		var errMessage = `${err}`;
		processErrorResponse(res, 500, errMessage);
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
	console.log("Express app vercel-express-react-demo is running on port", app.get("port"));
});

export default app;
