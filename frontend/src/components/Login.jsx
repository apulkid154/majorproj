import React, { useState } from 'react';
import NavigationBar from './NavigationBar';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [wrong, setWrong] = useState('');
    const [loginChk, setLoginChk] = useState(0);
    const [selectedRole, setSelectedRole] = useState('farmer'); // Default role is set to 'farmer'
    // const history = useHistory(); // Access the history object

    const onLoginSuccess = (role) => {
        switch (role) {
            case 'farmer':
                return '/farmer/all-crops';
            case 'buyer':
                return '/buyer';
            case 'admin':
                return '/admin';
            default:
                return '/'; // Default route
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const destination = onLoginSuccess(selectedRole);
        window.location.href = destination; // Redirect to the appropriate route
    };

    return (
        <>
         <NavigationBar />
        <div className="min-h-screen flex items-center justify-center" style={{ 
            backgroundImage: "url('./farmer.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(20%)"
        }}>
            <div className="max-w-md w-full h-full ml-2 mt-10 space-y-8 bg-white bg-opacity-60 p-8 rounded-md shadow-md">
                <div>
                    <h2 className="mt-7 text-center text-3xl font-extrabold text-gray-900">
                        Welcome to Login
                    </h2>
                    {message && <p className="text-red-500 text-center">{message}</p>}
                    {wrong && <p className="text-red-500 text-center">{wrong}</p>}
                    {loginChk >= 3 && (
                        <p className="text-red-500 text-center">
                            You have tried {loginChk} times already and cannot try more than 5 times.
                            So only {5 - loginChk} times you can try to login.
                            {loginChk >= 5 && 'Please restart your browser'}
                        </p>
                    )}
                </div>
                <form className="mt-8 space-y-6 " onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="sr-only">
                                Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            >
                                <option value="farmer">Farmer</option>
                                <option value="admin">Admin</option>
                                <option value="buyer">Buyer</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-green-700 hover:text-green-900">
                                Forgot your password?
                            </a>
                        </div>
                        <div className="text-sm">
                            <a href="/registration" className="font-medium text-green-700 hover:text-green-900">
                                Don't have an account?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-green-700 disabled:opacity-50"
                            disabled={loginChk >= 5}
                            onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;
