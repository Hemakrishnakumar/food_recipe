import { Link } from "react-router-dom";

const RecipeItem = ({ item }) => {
  return (
    <div className="flex w-80 overflow-hidden p-5 bg-white/75 shadow-xl gap-5 flex-col">
      <div className="h-40 flex justify-center overflow-hidden items-center rounded-xl ">
        <img
          src={item?.image_url}
          alt="recipe item"
          className="block w-full group-hover:scale-105 duration-300"
        />
      </div>
      <div>
        <span className="text-sm text-cyan-700">{item?.publisher}</span>
        <h3 className="font-bold text-2xl truncate text-black">
          {item?.title}
        </h3>
        <Link
          className="text-sm p-3 mt-5 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-md bg-orange-600 text-white"
          to={`/recipe-item/${item?.id}`}
        >
          Recipe Details
        </Link>
      </div>
    </div>
  );
};

export default RecipeItem;
