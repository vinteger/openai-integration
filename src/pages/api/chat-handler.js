import OpenAI from "openai";

export const MODEL = "gpt-3.5-turbo-0125";

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const {input} = req.body
			const chatGptResponse = await queryChatGPT(input)
			res.status(200).json(chatGptResponse)

		} catch (e) {
			res.status(500).json(`Something went wrong, ${e.message}`)
		}
	} else {
		res.status(405).json("Method not allowed")
	}
}

const queryChatGPT = async (input) => {
	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY
	});

	const response = await openai.chat.completions.create({
		messages: [{
			role: "system", content: input
		}], model: MODEL
	});
	return response.choices[0].message.content;
}
