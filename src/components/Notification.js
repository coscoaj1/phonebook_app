import "../index.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className="error absolute top-16 left-[50%] transform -translate-x-[50%] text-black">
      {message}
    </div>
  );
};

export default Notification;
