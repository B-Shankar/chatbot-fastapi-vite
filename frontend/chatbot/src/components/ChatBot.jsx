import { useState } from "react";
import { SendHorizontal } from 'lucide-react';
import botLogo from "../assets/logo.png"; // adjust path as needed

const ChatBot = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);

	const appendMessage = (text, sender) => {
		setMessages((prev) => [...prev, { text, sender }]);
	};

	const sendMessage = async () => {
		const message = input.trim();
		if (!message) return;

		appendMessage(message, "user");
		setInput("");
		setLoading(true);

		try {
			const res = await fetch("http://127.0.0.1:8000/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message }),
			});

			if (!res.ok) throw new Error("Network error");
			const data = await res.json();

			appendMessage(data.reply, "bot");
		} catch (err) {
			appendMessage("Error: Could not reach the server.", "bot");
		} finally {
			setLoading(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") sendMessage();
	};

	return (
		<div className="flex justify-center items-center h-screen bg-[#eef2f6]">
			<div className="flex flex-col bg-white w-[400px] h-[600px] rounded-xl shadow-md overflow-hidden">
				{/* Header */}
				<header className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gray-50">
					<img
						src={botLogo}
						alt="Bot Logo"
						className="w-8 h-8 rounded-full"
					/>
					<h3 className="font-semibold text-lg">My ChatBot</h3>
				</header>

				{/* Chatbox */}
				<div className="flex flex-col flex-grow p-4 space-y-3 overflow-y-auto bg-[#f0f2f5]">
					{messages.map((msg, index) => (
						<div
							key={index}
							className={`flex max-w-[80%] ${
								msg.sender === "user" ? "self-end" : "self-start"
							}`}
						>
							{msg.sender === "bot" && (
								<img
									src={botLogo}
									alt="Bot"
									className="w-7 h-7 rounded-full mr-2 flex-shrink-0 self-end"
								/>
							)}
							<span
								className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
									msg.sender === "user"
										? "bg-blue-500 text-white rounded-br-sm"
										: "bg-gray-200 text-gray-800 rounded-bl-sm"
								}`}
							>
                {msg.text}
              </span>
						</div>
					))}
				</div>

				{/* Input Area */}
				<div className="flex items-center p-3 border-t border-gray-200 bg-white">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder="Type a message..."
						className="flex-grow px-4 py-2 bg-gray-100 rounded-full outline-none text-sm focus:bg-gray-200"
					/>
					<button
						onClick={sendMessage}
						disabled={loading}
						className={`ml-2 p-2 rounded-full ${
							loading ? "text-gray-400" : "text-blue-500 hover:text-blue-700"
						}`}
					>
						<SendHorizontal className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatBot;
