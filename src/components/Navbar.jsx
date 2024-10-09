import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="h-16 flex items-center justify-around bg-gray-900 text-white shadow-lg">
            <NavLink className="text-lg font-semibold hover:text-blue-400 transition" to="/">
                Home
            </NavLink>
            <NavLink className="text-lg font-semibold hover:text-blue-400 transition" to="/pastes">
                Pastes
            </NavLink>
        </div>
    );
};

export default Navbar;
