
const Toast = ({ type, message }) => {
  const styles = {
    success: "bg-green-500 border-green-700",
    error: "bg-red-500 border-red-700",
    info: "bg-blue-500 border-blue-700",
  };

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