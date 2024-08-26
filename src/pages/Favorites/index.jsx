import RecipeItem from "../../components/RecipeItem";
import { useRecipeContext } from "../../context/RecipeContext";

const Favorites = () => {
  const { favorites } = useRecipeContext();
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favorites.length ? (
        favorites.map((item) => <RecipeItem item={item} key={item.id} />)
      ) : (
        <h1 className="lg:text-4xl text-xl text-center text-black font-extrabold">
          No favorites found.
        </h1>
      )}
    </div>
  );
};

export default Favorites;
