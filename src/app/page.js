'use client'

import {useEffect, useState} from "react"
import {ScaleLoader} from "react-spinners";
import {MODEL} from "@/pages/api/chat-handler";

export default function Landing() {
	const [input, setInput] = useState("")
	const [result, setResult] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [displayEnv, setDisplayEnv] = useState(false)

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.metaKey || e.ctrlKey) {
				setDisplayEnv(true)
			}
		}
		const handleKeyUp = (e) => {
			setDisplayEnv(false)
		}
		document.addEventListener("keydown", handleKeyDown)
		document.addEventListener("keyup", handleKeyUp)
		return () => {
			document.removeEventListener("keydown", handleKeyDown)
			document.removeEventListener("keyup", handleKeyUp)
		}
	}, []);

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
			.catch((e) => console.error(e))
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
		<div className="flex flex-col h-full bg-gray-100 px-4">
			<div className="grow">
				<h1 className="text-2xl self-center my-10">ChatGPT Integration</h1>
				{displayEnv &&
					<div className="absolute right-0 top-0 m-1 text-[12px] text-gray-400">
						<p>Environment: {process.env.NODE_ENV}</p>
						<p>Model: {MODEL}</p>
					</div>
				}
				<label className="flex flex-col">
					Enter a prompt
					<input
						value={input}
						onChange={handleInputChange}
						className="rounded py-1 pl-[.5px] mt-4 flex-1 w-[80%]"
						placeholder="How many Earths can fit inside the Sun?"/>
				</label>
				<div className="flex gap-4 my-4">
					<Button text="Submit Query" styles="bg-[#328abf] text-white hover:bg-[#66a3c7]"
							onClick={handleSubmission}/>
					{result &&
						<Button text="Clear" styles="bg-white text-black hover:bg-gray-200" onClick={clearData}/>}
				< /div>
				{result && <q>{result}</q>}
			</div>
			<p className="text-[12px] text-gray-400">⌘ or Ctrl for dev info</p>
		</div>
	);
}
const btnProps = {
	text: "",
	onClick: () => {
	},
	styles: ""
}
const Button = ({styles, onClick, text} = btnProps) => {
	return (
		<button className={`rounded px-3 py-2 max-w-fit bg-blue-500 ${styles}`}
				onClick={onClick}>{text}</button>
	)
}
