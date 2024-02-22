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

	const handleSubmission = () => {
		setIsLoading(true)
		fetch('/api/chat-handler/', {
			method: 'POST', body: JSON.stringify({
				input
			}), headers: {
				'Content-Type': 'application/json', Accept: 'application/json',
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

	return (
		<div className="w-full h-full">
			<div className="flex flex-col h-full bg-gray-100 dark:bg-gray-800 dark:text-zinc-300 px-4 relative">
				<div className="flex">
					<h1 className="text-2xl self-center mx-auto my-12">ChatGPT Integration</h1>
				</div>
				<DevInfo shouldDisplay={displayEnv}/>
				<label className="flex flex-col">
					Enter a prompt
					<input
						value={input}
						onChange={handleInputChange}
						className="rounded py-1 pl-[.5px] mt-4 flex-1 w-ful md:w-[80%] dark:text-black"
						placeholder="How many Earths can fit inside the Sun?"/>
				</label>
				<div className="flex gap-4 my-4">
					<Button text="Submit Query"
							onClick={handleSubmission}
							disabled={!input.trim()}
							className="text-white"
					/>
					{result &&
						<Button text="Clear" className="text-black bg-white" onClick={clearData}/>}
				< /div>
				{result && <q>{result}</q>}
				<p className="text-[12px] text-gray-400 mt-auto">⌘ or Ctrl for dev info</p>
			</div>
			<Loader isLoading={isLoading}/>
		</div>
	);
}

const btnProps = {
	text: "", onClick: () => {
	}, styles: ""
}
const Button = ({onClick, text, className = "", disabled = false} = btnProps) => {
	return (
		<button className={`
				rounded px-3 py-2 max-w-fit 
				${disabled ? 'bg-gray-300 text-gray-500' : 'bg-[#2d8ff7] will-change-transform active:scale-95 duration-200'} 
				${className}
			`}
				onClick={onClick}
				disabled={disabled}
		>
			{text}
		</button>
	)
}

const Loader = ({isLoading}) => {
	return (isLoading ? (<div className="w-full h-full fixed top-0 left-0 bg-black/20 flex">
		<div className="self-center mx-auto">
			<ScaleLoader
				color="#328abf"
			/>
		</div>
	</div>) : <></>)
}

const DevInfo = ({shouldDisplay}) => {
	return (shouldDisplay ? <div
		className="absolute right-0 top-0 m-1 text-[12px] text-gray-400 border-solid border-[.50px] p-0.5 border-gray-400 rounded">
		<p>Environment: {process.env.NODE_ENV}</p>
		<p>Model: {MODEL}</p>
	</div> : <></>)
}