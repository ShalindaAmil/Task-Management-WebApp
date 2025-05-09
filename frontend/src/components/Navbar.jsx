import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Task Manager
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/tasks" className="text-gray-600 hover:text-gray-900">
                Tasks
              </Link>
              <span className="text-gray-600">Hello, {user.name}</span>
              <button
                onClick={logout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}