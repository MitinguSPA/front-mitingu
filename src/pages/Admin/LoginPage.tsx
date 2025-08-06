import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "../../components/UI/Input";
import { useAuth } from "../../store/AuthStore";
import Button from "../../components/UI/Button";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor ingresa nombre de usuario y contraseña");
      return;
    }

    const success = await login(username, password); // espera login real
    if (success) {
      navigate("/admin");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Acceso al panel de administración
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>

          <div>
            <Button type="submit" fullWidth>
              Iniciar Sesión
            </Button>
          </div>
        </form>

        {/* <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            Para el demo, usa:{" "}
            <span className="font-semibold">admin@test.com / admin123</span>
          </p>
        </div> */}
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            Para el demo, usa:{" "}
            <button
              type="button"
              onClick={() => {
                setUsername("admin@test.com");
                setPassword("admin123");
              }}
              className="font-semibold text-blue-600 hover:underline"
            >
              admin@test.com / admin123
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
