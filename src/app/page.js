'use client'

import {useEffect, useState} from "react";
import {ScaleLoader} from "react-spinners";

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

	const clearData = () => {
		setResult("")
		setInput("")
	}

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-full">
				<ScaleLoader color="#328abf"/>
			</div>
		)
	}

	return (
		<div className="flex flex-col h-full bg-gray-100 px-4 gap-4">
			<h1 className="text-2xl self-center py-5">ChatGPT Integration</h1>
			<p className="absolute right-0 top-0 m-1 text-[12px] text-gray-400">{process.env.NODE_ENV}</p>
			<label className="flex flex-col">
				Enter a prompt
				<input
					value={input}
					onChange={handleInputChange}
					onSubmit={handleSubmission}
					className="rounded py-1 pl-[.5px] mt-4 flex-1 w-[80%]"
					placeholder="How many Earths can fit inside the Sun?"/>
			</label>
			<div className="flex gap-4">
				<button
					className="bg-[#328abf] rounded px-3 py-2 max-w-fit text-white hover:bg-[#66a3c7]"
					onClick={handleSubmission}>
					Submit query
				</button>
				{result && (
					<button
						className="bg-[#fff] rounded px-3 py-2 max-w-fit text-black hover:bg-gray-200"
						onClick={clearData}>
						Clear
					</button>
				)}
			< /div>
			{result && <q>{result}</q>
			}
		</div>
	);
}
