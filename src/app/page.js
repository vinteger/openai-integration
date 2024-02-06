'use client'

import {useState} from "react";

export default function Landing() {
	const [input, setInput] = useState("")
	const [result, setResult] = useState("")
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (e) => {
		setInput(e.target.value)
	}
	const handleSubmission = async () => {
		setIsLoading(true)

		fetch('/api/chat-handler/', {
			method: 'POST',
			body: JSON.stringify({
				input
			}),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setResult(data)
			})
			.finally(() => setIsLoading(false))
	}

	if (isLoading) {
		return (
			<>Loading...</>
		)
	}

	return (
		<div className="flex flex-col h-full bg-gray-100 px-4 gap-4">
			<h1 className="text-2xl self-center py-5">ChatGPT Integration</h1>
			<p className="absolute right-0 top-0 m-1">{process.env.NODE_ENV}</p>
			<label className="flex flex-col">
				How can I be of assistance?
				<input
					value={input}
					onChange={handleInputChange}
					onSubmit={handleSubmission}
					className="rounded p-1 mt-4 flex-1 w-[80%]"
					placeholder="How many Earths can fit inside the Sun?"/>
			</label>
			<button
				className="bg-[#328abf] rounded px-3 py-2 max-w-fit text-white hover:text-gray-700"
				onClick={handleSubmission}>
				Submit query
			</button>
			<p>{result}</p>
		</div>
	);
}
