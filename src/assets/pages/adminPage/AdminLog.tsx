import React, { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../features/Admin/adminSlice";
import { useNavigate } from "react-router-dom"; 

const AdminLog = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resultAction: any = await dispatch(loginAdmin({ name, password }));
      if (loginAdmin.fulfilled.match(resultAction)) {
        navigate("/admin/home");
      } else {
        return <span>{resultAction}</span>
      }
    } catch (error) {
      return <span>sss</span>
    }
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col bg-[#f6f6f7] shadow-sm py-6 px-6 rounded-lg justify-center gap-3"
      >
        <input
          className="w-full outline-red-500 text-red-600 font-semibold placeholder:text-red-600 p-3 rounded-[10px]"
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="w-[300px] relative">
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
          className="bg-blue-600 w-full p-2 rounded-[8px] text-white"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default AdminLog;
