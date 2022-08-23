import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Message from "./Message";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
        {!showChat ? (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden chat-window">
            <div
              className="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md">
              <h1 className="text-3xl font-semibold text-center text-purple-700">CHAT BOX</h1>

              <form className="mt-6">
                <div>
                  <label for="email" className="block text-sm text-gray-800">Username</label>
                  <input type="email"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(event) => {
                      setUsername(event.target.value);
                    } } />
                  </div>
                <div className="mt-4">
                  <div>
                    <label for="password" className="block text-sm text-gray-800">Room Id</label>
                    <input type="text"
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"  onChange={(event) => {
                        setRoom(event.target.value);
                      } } />
                    </div>
                  <div className="mt-6">
                    <button
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"  onClick={joinRoom}>
                      Join a Room
                    </button>
                  </div>
                </div></form>

            </div>
          </div>
        
      ) : (
        <Message socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;