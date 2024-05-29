import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function User_input({
  f_size,
  f_setsize,
  f_streak,
  f_setstreak,
}) {
  const [size, setSize] = useState("");
  const [streak, setStreak] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (size !== "" && streak !== "" && size > 0) {
      if (streak <= size && streak >= 1) {
        toast.success("Lets Gooo !!!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        f_setsize(size);
        f_setstreak(streak);
        setTimeout(() => {
          navigate("/game");
        }, 2000);
      } else {
        toast.warn("Streak should be less than size !!!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }

  return (
    <>
      <div className="backgroundd bg-cover bg-opacity-50">
        <div className="w-full h-[100vh] mob:h-[90vh] flex items-center xs:px-0 xs:items-end xs:pb-[180px] relative">
          <div className="w-[380px] z-10 bg-black/70 mob:bg-none mx-auto lg:w-[430px] rounded-md px-8 pt-16 pb-20 xs:pt-9 shadow-[B6C4B6] shadow-sm border-stone-900 text-white">
            <p className="font-semibold text-4xl text-center text-[#696a9d] stroke-white dd">
              TicTacToe
            </p>
            <form className="mt-[40px]" onSubmit={handleSubmit}>
              <h1 className="mb-2 ml-1">Enter Grid Size</h1>
              <input
                className="w-full h-[8vh] xs:h-[6.5vh] rounded-sm bg-[#333333] border-b-[3px] border-gray-300 focus:border-[#4ababa] focus:outline-none p-2"
                type="text"
                value={size}
                placeholder="ex- 3"
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    setSize(e.target.value);
                  }
                }}
              />
              <div className="relative">
                <h1 className="mb-2 ml-1 mt-[25px]">
                  Consecutive Win Streak's
                </h1>
                <input
                  className="w-full h-[8vh] xs:h-[6.5vh] rounded-sm bg-[#333333] border-b-[3px] border-t-0 border-l-0 border-r-0 outline-none focus:ring-0 border-gray-300 focus:border-[#4ababa] ppp p-2"
                  type="text"
                  value={streak}
                  placeholder="Less than grid size"
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) {
                      setStreak(e.target.value);
                    }
                  }}
                />
              </div>
              <button
                className="w-full h-[7vh] bg-cyan-800 hover:bg-cyan-400 hover:duration-300 rounded-sm mb-4 text-xl font-medium mt-[25px]"
                onClick={handleSubmit}
              >
                Play
              </button>
            </form>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </div>
    </>
  );
}
