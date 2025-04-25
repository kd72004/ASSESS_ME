import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FiTrash } from "react-icons/fi";

const SDiscussion = () => {
  const { examId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const token = sessionStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?._id;
  const name = decodedToken?.name;

  // Fetch discussions
  const fetchDiscussions = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/discussion/${examId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setMessages(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, [examId]);

  // Send message handler
  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/discussion/create",
        {
          examId,
          studentId: userId,
          text: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setMessage(""); // Clear input
        fetchDiscussions(); // Refresh discussions
      } else {
        console.error("Failed to send message:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


  const handleDelete = async (messageId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`http://localhost:3000/discussion/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.success) {
        fetchDiscussions(); // Refresh list
      } else {
        console.error("Failed to delete message:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
  
  return (
    <div className="relative p-6 w-[1300px] ml-[230px] bg-[#f8f9fc] min-h-screen overflow-y-auto pb-32">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Discussion for Exam</h2>
      <p className="text-gray-600">
        You are now viewing the discussion for <strong>Exam ID:</strong> {examId}
      </p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-orange-600 mb-4">Exam Discussion</h3>

        <div className="space-y-4">
          {messages.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
              <div>
                <p className="text-sm text-gray-500">{item?.studentId?.name || "Unknown"}</p>
                <p className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg mt-1">{item.text}</p>
              </div>
              {/* Delete icon shown only if current user is message owner */}
              {item?.studentId?._id === userId && (
                <button
                  onClick={() => handleDelete(item._id)}
                  className="absolute right-2 top-0 text-red-500 hover:text-red-700"
                  title="Delete message"
                >
                  <FiTrash />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sticky input box */}
      <div className="fixed bottom-0 left-[230px] w-[1300px] bg-white px-6 py-4 border-t flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border border-amber-200 text-black px-4 py-2 rounded focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={message.trim() === ""}
          className={`px-4 py-2 rounded text-white ${
            message.trim() === "" ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SDiscussion;
