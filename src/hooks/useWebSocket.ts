import { useState, useEffect, useRef, useCallback } from "react";

const MAX_RETRIES = 5;
const RETRY_DELAY = 3000; // 3 seconds

const useWebSocket = (url: string | undefined) => {
  const [lastMessage, setLastMessage] = useState<any>(null);
  const websocket = useRef<WebSocket | null>(null);
  const retryCount = useRef(0);

  const connectWebSocket = useCallback(() => {
    if (!url || websocket.current?.readyState === WebSocket.OPEN) return;

    websocket.current = new WebSocket(url);

    websocket.current.onopen = () => {
      console.log("WebSocket connection established");
      retryCount.current = 0;
    };

    websocket.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLastMessage(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    websocket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    websocket.current.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
      if (!event.wasClean && retryCount.current < MAX_RETRIES) {
        retryCount.current++;
        setTimeout(connectWebSocket, RETRY_DELAY);
      }
    };
  }, [url]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, [connectWebSocket]);

  return { lastMessage };
};

export default useWebSocket;
