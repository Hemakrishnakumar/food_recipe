import { NavLink } from "react-router-dom";
import { useRecipeContext } from "../context/RecipeContext";

const Navbar = () => {
  const { searchParam, setSearchParam } = useRecipeContext();
  return (
    <nav className="flex justify-between items-center py-8 container mx-auto  lg:flex-grow gap-5 lg:gap-0">
      <h2 className="text-2xl font-semibold">
        <NavLink className="text-black hover:text-gray-700 duration-300" to="/">
          <span className="text-orange-600">FoodR</span>ecipe
        </NavLink>
      </h2>
      <form>
        <input
          onChange={(e) => setSearchParam(e.target.value.trim())}
          type="text"
          value={searchParam}
          name="search"
          placeholder="Search items.."
          className="bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200"
        />
      </form>
      <ul className="flex gap-5">
        <li>
          <NavLink
            to="/"
            className="text-black hover:text-orange-500 duration-300"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-black hover:text-orange-500 duration-300"
            to="/favorites"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
