import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecipeContext } from "../../context/RecipeContext";
import Spinner from "../../components/Spinner";

const Details = () => {
  const { id } = useParams();
  let {
    loading,
    getRecipeDetails,
    addToFavorites,
    favorites,
    deleteFromFavorites,
    recipeDetails,
  } = useRecipeContext();
  const isFavorite = favorites?.some((item) => item.id === id);

  useEffect(() => {
    getRecipeDetails(id);
  }, [id]);

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
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner />
      </div>
    );

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
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
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-orange-600 text-white"
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black mb-5">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetails?.ingredients.map((item) => (
              <li key={item.description}>
                <span className="text-2xl text-black">
                  {item.quantity} {item.unit}
                </span>
                <span className="text-2xl text-black">
                  {" "}
                  {item.description[0].toUpperCase() +
                    item.description.slice(1)}
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
