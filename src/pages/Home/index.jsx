import { useRecipeContext } from "../../context/RecipeContext";
import RecipeItem from "../../components/RecipeItem";

const Home = () => {
  const { loading, recipeList } = useRecipeContext();

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {loading && <h1>Loading...</h1>}
      {!loading &&
        (recipeList.length ? (
          recipeList.map((item) => <RecipeItem item={item} key={item.id} />)
        ) : (
          <div>
            <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
              No results found. try something else
            </p>
          </div>
        ))}
    </div>
  );
};

export default Home;
