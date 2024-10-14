import React, { useState } from "react";
import axios from "axios";

const UrlChecker: React.FC = () => {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkUrl = async () => {
    if (!url) return;

    setLoading(true);
    setStatus(null);

    try {
      const response = await axios.get(url, { timeout: 5000 });
      console.log("response of URL Check", response);
      if (response.status >= 200 && response.status < 300) {
        setStatus("Live and running");
      } else {
        setStatus(`Responded with status code: ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          setStatus(
            "Request timed out. The site might be down or responding slowly."
          );
        } else if (error.response) {
          setStatus(
            `Error: ${error.response.status} - ${error.response.statusText}`
          );
        } else {
          setStatus(
            "Unable to reach the site. It might be down or CORS could be disabled !"
          );
        }
      } else {
        setStatus("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">URL Checker</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL (e.g., https://www.google.com)"
          className="flex-grow px-3 py-2 border rounded"
        />
        <button
          onClick={checkUrl}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>
      {status && (
        <div
          className={`p-3 rounded ${
            status.includes("Live") ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
};

export default UrlChecker;
