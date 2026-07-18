import { useState, useEffect } from "react";

const Toast = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  const styles = {
    success: "bg-green-500 border-green-700",
    error: "bg-red-500 border-red-700",
    info: "bg-blue-500 border-blue-700",
  };

  useEffect(() => {
    // Set a timer to hide the toast after 30 seconds (30000 milliseconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 30000);

    // Clean up the timer if the component unmounts before 30s
    return () => clearTimeout(timer);
  }, []);

  // If the timer finished, don't render anything
  if (!isVisible) return null;

  return (
    <div
      className={`text-white px-4 py-3 rounded-lg shadow-lg border-l-4 mb-3 ${styles[type]}`}
    >
      <p className="font-semibold">
        {type === "success" && "Success"}
        {type === "error" && "Error"}
        {type === "info" && "Info"}
      </p>

      <p>{message}</p>
    </div>
  );
};

export default Toast;