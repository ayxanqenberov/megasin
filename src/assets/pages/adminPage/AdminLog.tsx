import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../features/Admin/adminSlice";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const AdminLog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const { isLoading } = useSelector((state) => state.admin);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginAdmin({ username, password }))
      navigate(`/admin/home`);
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-[350px] space-y-4"
      >
        <h2 className="text-center text-red-600 text-2xl font-bold">Admin Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          className="w-full outline-red-500 text-red-600 font-semibold placeholder:text-red-600 p-3 rounded-[10px] border border-red-300"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div className="relative">
          <input
            className="w-full outline-red-500 text-red-600 font-semibold placeholder:text-red-600 p-3 rounded-[10px] border border-red-300"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {showPassword ? (
            <VscEye
              onClick={toggleShowPassword}
              className="cursor-pointer text-red-600 absolute right-3 top-1/2 transform -translate-y-1/2"
            />
          ) : (
            <VscEyeClosed
              onClick={toggleShowPassword}
              className="cursor-pointer text-red-600 absolute right-3 top-1/2 transform -translate-y-1/2"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-[10px] hover:bg-red-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLog;
