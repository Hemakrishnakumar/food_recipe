import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecipeContext } from "../../context/RecipeContext";

const Details = () => {
  const { id, recipeDetails } = useParams();
  const { getRecipeDetails, addToFavorites, favorites, deleteFromFavorites } =
    useRecipeContext();
  const isFavorite = favorites?.some((item) => item.id === id);

  useEffect(() => {
    getRecipeDetails(id);
  }, [id, getRecipeDetails]);

  function handleSave() {
    if (isFavorite) deleteFromFavorites(id);
    else {
      const item = {
        id: recipeDetails.id,
        title: recipeDetails.title,
        image_url: recipeDetails.image_url,
        publisher: recipeDetails.publisher,
      };
      addToFavorites(item);
    }
  }
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap:10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetails?.image_url}
            alt="recipe-item"
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700">
          {recipeDetails?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetails?.title}
        </h3>
        <div>
          <button
            onClick={handleSave}
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
          >
            {isFavorite ? "Remove from favorites" : "Save as favorite"}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetails?.ingredients.map((item) => (
              <li key={item}>
                <span className="text-2xl font-semibold text-black">
                  {item.quantity} {item.unit}
                </span>
                <span className="text-2xl font-semibold text-black">
                  {item.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
