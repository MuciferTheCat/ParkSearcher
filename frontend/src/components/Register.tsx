import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api/userService";
import { RegisterData } from "../services/types/user";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      if (response.message !== "User registered successfully") {
        throw new Error(response.message || "Registration failed");
      }
      setSuccess("Registration successful! Redirecting to login...");
      setError(null);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setSuccess(null);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="p-4 rounded shadow-sm w-100"
        style={{ maxWidth: "400px" }}
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-center" style={{ color: "#8F95D3" }}>
            Register
          </h2>
          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}
          <label style={{ color: "#58504A" }}>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-control mb-3"
            style={{ borderColor: "#8F95D3" }}
          />
          <label style={{ color: "#58504A" }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control mb-3"
            style={{ borderColor: "#8F95D3" }}
          />
          <label style={{ color: "#58504A" }}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-control mb-3"
          />
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#8F95D3", color: "#FFFFFF" }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
