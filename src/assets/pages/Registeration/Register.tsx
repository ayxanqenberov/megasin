import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/Users/userSlice";
import { AppDispatch, RootState } from "../../redux/app/store";
import { useNavigate } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Header from "../../Components/Header/Header";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(registerUser({ email, password, username }));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate(`/profile/${username}`);
    } else {
      console.error("Registration failed:", resultAction.payload || resultAction.error.message);
    }
  };
  
  return (
    <>
      <Header />
      <div className="registerContainer flex flex-col justify-center items-center gap-2 mt-4 h-[450px]">
        <a className="text-2xl font-bold text-[#E91E63] text-center" href="/">
          MEGASIN<span className="text-black">.</span>
        </a>
        <span className="text-3xl font-bold max-sm:text-[20px]">Join the Megasin Community</span>
        <span className="text-gray-500 max-sm:text-[10px]">
          Megasin Community is a community of 2 amazing developers
        </span>
        <form className="flex flex-col gap-2 pt-4" onSubmit={handleRegister}>
          <input
            className="w-[300px] outline-red-500 max-sm:w-[90%] max-sm:mx-auto text-red-600 font-semibold placeholder:text-red-600 p-3 rounded-[10px]"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="w-[300px] outline-red-500 max-sm:w-[90%] max-sm:mx-auto text-red-600 font-semibold placeholder:text-red-600 p-3 rounded-[10px]"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="w-[300px] max-sm:w-[90%] max-sm:mx-auto relative">
            <input
              className="w-full outline-red-500 text-red-600 font-semibold placeholder:text-red-600 p-3 rounded-[10px]"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showPassword ? (
              <VscEye
                onClick={toggleShowPassword}
                className="cursor-pointer text-red-600 absolute right-[4%] top-1/2 transform -translate-y-1/2"
              />
            ) : (
              <VscEyeClosed
                onClick={toggleShowPassword}
                className="cursor-pointer text-red-600 absolute right-[4%] top-1/2 transform -translate-y-1/2"
              />
            )}
          </div>
          <button
            type="submit"
            className={`bg-blue-600 w-full p-2 rounded-[8px] max-sm:w-[90%] max-sm:mx-auto text-white ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Sign up"}
          </button>
          <div className="w-full text-center">
            {isLoading ? (
              "Loading..."
            ) : (
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-blue-600">
                  Log in
                </a>
              </p>
            )}
          </div>
        </form>
        {error && <p className="error text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default Register;
