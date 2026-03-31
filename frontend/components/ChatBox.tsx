import { useState } from "react";

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const ask = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();

      setMessages([
        ...messages,
        { role: "user", text: question },
        { role: "bot", text: data.answer },
      ]);

      setQuestion("");
    } catch (err) {
      console.error("CHAT ERROR:", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow text-gray-900">
      <h3>Ask Questions</h3>

      <div className="space-y-2 mb-2">
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role}:</b> {m.text}
          </div>
        ))}
      </div>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border rounded border-gray-700 py-2 px-2"
      />
      <button onClick={ask} className="border rounded border-gray-700 py-2 px-2">Ask</button>
    </div>
  );
}