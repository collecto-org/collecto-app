import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="w-full border-b border-gray-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logos/collecto.png" alt="logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-darkblue">collecto</span>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-4">
          <NavLink
            to="/login"
            className="bg-coral text-cream font-semibold px-4 py-2 rounded-md hover:opacity-90"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="bg-coral text-cream font-semibold px-4 py-2 rounded-md hover:opacity-90"
          >
            Sign up
          </NavLink>
          <button className="text-3xl font-light leading-none">☰</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
