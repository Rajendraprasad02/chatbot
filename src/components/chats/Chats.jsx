import React, { useEffect, useState } from "react";

const Chats = () => {
  const [chatData, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = "http://57.159.8.173:9900";

  // ✅ Fetch all chat sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${url}/sessions`);
        const data = await res.json();
        setSessions(data);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCost = (cost) => {
    return cost ? `$${cost.toFixed(5)}` : "$0.00000";
  };

  const formatINR = (usd) => {
    // Assuming 1 USD = 83 INR (you can update this rate as needed)
    const exchangeRate = 83;
    const inr = usd * exchangeRate;
    return `₹${inr.toFixed(2)}`;
  };

  // Calculate total cost for a conversation
  const calculateTotalCost = (conversation) => {
    if (!conversation) return 0;
    return conversation.reduce((total, message) => {
      return total + (message.usage?.estimated_cost_usd || 0);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading chat sessions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Chat Sessions</h1>

        <div className="space-y-6">
          {chatData.map((chat) => {
            const totalCostUSD = calculateTotalCost(chat.conversation);
            const totalCostINR = totalCostUSD * 83; // Using fixed exchange rate

            return (
              <div
                key={chat.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
              >
                {/* Chat Header */}
                <div className="bg-gray-800 text-white px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h2 className="text-xl font-semibold">{chat.name}</h2>
                      <p className="text-gray-300 text-sm mt-1">
                        {chat.email} • {chat.whatsapp} •{" "}
                        {chat.service || "No service specified"}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 text-sm text-gray-300">
                      <p>Created: {formatDate(chat.created_at)}</p>
                      <p>Updated: {formatDate(chat.updated_at)}</p>
                    </div>
                  </div>

                  {/* Cost Display - Highlighted */}
                  <div className="mt-3 p-3 bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-center sm:text-left">
                        <span className="text-white font-semibold">
                          Total Conversation Cost:
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-2 sm:mt-0">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">
                            {formatCost(totalCostUSD)}
                          </div>
                          <div className="text-green-200 text-sm">USD</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">
                            {formatINR(totalCostUSD)}
                          </div>
                          <div className="text-green-200 text-sm">INR</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Messages - Scrollable */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Conversation ({chat.conversation_count} messages)
                  </h3>
                  <div
                    className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                    style={{ maxHeight: "24rem" }}
                  >
                    {chat?.conversation?.map((message, index) => {
                      const messageCostUSD =
                        message.usage?.estimated_cost_usd || 0;
                      const messageCostINR = messageCostUSD * 83;

                      return (
                        <div key={index} className="space-y-3">
                          {/* User Message */}
                          <div className="flex justify-end">
                            <div className="bg-blue-100 rounded-lg p-4 max-w-3/4">
                              <p className="text-gray-800 font-medium">
                                {message.user}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(message.userTimestamp)}
                              </p>
                            </div>
                          </div>

                          {/* Bot Response */}
                          <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-lg p-4 max-w-3/4">
                              <p className="text-gray-800 whitespace-pre-line">
                                {message.bot}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(message.botTimestamp)}
                              </p>
                              {message.usage && (
                                <div className="mt-2 text-xs text-gray-600 bg-gray-200 rounded p-2">
                                  <div className="grid grid-cols-2 gap-2 mb-2">
                                    <div>
                                      <p className="font-semibold">Tokens:</p>
                                      <p>Input: {message.usage.input_tokens}</p>
                                      <p>
                                        Output: {message.usage.output_tokens}
                                      </p>
                                      <p>Total: {message.usage.total_tokens}</p>
                                    </div>
                                    <div>
                                      <p className="font-semibold">Cost:</p>
                                      <p className="text-green-600 font-bold">
                                        {formatCost(messageCostUSD)}
                                      </p>
                                      <p className="text-green-600 font-bold">
                                        {formatINR(messageCostUSD)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chat Footer */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span className="font-mono text-xs">
                      Session ID: {chat.id}
                    </span>
                    <span className="font-semibold">
                      {chat.conversation_count} messages
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {chatData.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No chat sessions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
