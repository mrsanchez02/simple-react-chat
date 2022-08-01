import io from "socket.io-client";
import { useEffect, useState } from "react";
import "./App.css";

const socket = io("https://simple-react-chat-zae.herokuapp.com/:4000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      body: "Bienvenidos! Welcome! Benvenue!",
      from: "InteliBot",
    },
  ]);

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
      console.log(message);
    };

    //Suscribe.
    socket.on("message", receiveMessage);

    //UnSuscribe.
    return () => socket.off("message", receiveMessage);
  }, [messages]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    socket.emit("message", message);
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
  };

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10 rounded-sm">
        <h1 className="text-2xl font-bold my-2">Simple React Chat</h1>
        <input
          className="border-2 border-zinc-500 text-black w-full"
          type="text"
          onChange={handleChange}
          value={message}
        />
        <ul className="h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`p-2 my-2 table text-sm rounded-md bg-sky-700 ${
                message.from === "Me" ? "bg-sky-700 ml-auto" : "bg-black"
              }`}
            >
              <p>
                <span>From:{message.from}</span> - {message.body}
              </p>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
