import React, { useState } from "react";
import {useModal} from '../../ui/ModalContext'
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

type UserInfo = {
  email: string;
  password: string;
};

const Login = () => {
  const {close} = useModal()
  const [user, setUser] = useState<UserInfo>({
    email: '',
    password: ''
  });

  const fetchUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Login failed:', data.message || 'User not found');
        toast.error("Login neuspješan");
        return;
      }
      close()
      console.log('Login successful:', data);
      // You can store a token here: localStorage.setItem('token', data.token)

    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUser();
  };

  return (
    <>
      <Toaster></Toaster>
      <h2 className="text-xl font-semibold mb-4">Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email-field">Email</label>
        <input
          type="email"
          id="email-field"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border p-2 mb-3 block w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <label htmlFor="password-field">Password</label>
        <input
          type="password"
          id="password-field"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="border p-2 mb-3 block w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <div className="w-full flex justify-end">
          <button type="submit" className="ml-auto bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
