import { useRecipeContext } from "../../context/RecipeContext";
import RecipeItem from "../../components/RecipeItem";
import Spinner from "../../components/Spinner";

const Home = () => {
  const { loading, recipeList, isSearched } = useRecipeContext();

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {loading && <Spinner />}
      {!loading &&
        (recipeList.length ? (
          recipeList.map((item) => <RecipeItem item={item} key={item.id} />)
        ) : (
          <div>
            <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
              {isSearched
                ? "No results found. try something else"
                : "Search Yummy recipes😋"}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Home;
