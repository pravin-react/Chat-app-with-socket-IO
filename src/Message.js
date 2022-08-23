import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Message({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessageList((list) => [...list, data]);
  //     console.log(socket.id);
  //   });
  // }, [socket]);


  useEffect(() => {
    const eventListener = (data) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", eventListener);
    return () => socket.off("receive_message");
  }, [socket]);


  return (
    <><div className="chat-window ">
              <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
    <div className="container mx-auto w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md">
        <div className="max-w-xl border rounded">
          <div>
            <div className="w-full">
              <div className="relative flex items-center p-3 border-b border-gray-300">
                <img className="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png" alt="username" />
                <span className="block ml-2 font-bold text-gray-600">{username}</span>
                <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                </span>
              </div>
              <div className="relative w-full p-2 overflow-y-auto h-[25rem]">

                <ul className="space-y-2">
                {messageList.map((messageContent, index) => {
                  const visibility = (username === messageContent.author) ? "sendbox" : "recievebox"
                  const aligntime = (username === messageContent.author) ? "time-left" : "time-right"
            return (
              <><li className={username === messageContent.author ? "flex justify-end" : "flex justify-start"}
                key={index}>
                  
                  <div className={["relative max-w-xl px-4 py-2 text-gray-700 rounded shadow ", visibility].join(' ')}>
                    <span className="block">{messageContent.message}<br></br><span class={[" ", aligntime].join(' ')}>{messageContent.time}</span></span>
                  </div>
                </li></>
            );
          })}
                </ul>

              </div>

              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">

                <input type="text" value={currentMessage} onChange={(event) => { setCurrentMessage(event.target.value); } } onKeyPress={(event) => { event.key === "Enter" && sendMessage();
              } }  placeholder="Message"
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message" required />
                <button onClick={sendMessage}>
                  <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div></div></div></>
  );
}

export default Message;