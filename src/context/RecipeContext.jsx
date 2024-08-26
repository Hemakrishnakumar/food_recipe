import { createContext, useContext, useEffect, useState } from "react";

const FoodRecipeContext = createContext();

const RecipeContext = ({ children }) => {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    if (!searchParam) return;
    fetchRecipes();
    async function fetchRecipes() {
      setIsLoading(true);
      setRecipeList([]);
      try {
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok)
          throw new Error("something went wrong while fetching the movies");
        const data = await res.json();
        if (data.results > 0) {
          setRecipeList(data.data?.recipes);
          setSearchParam("");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    return function () {
      controller.abort();
    };
  }, [searchParam]);

  async function getRecipeDetails(id) {
    setIsLoading(true);
    setRecipeDetails(null);
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await res.json();
      if (data?.data?.recipe) {
        setRecipeDetails(data.data.recipe);
      }
    } catch (err) {
      console.log("There is an error ", err);
    } finally {
      setIsLoading(false);
    }
  }

  function addToFavorites(item) {
    setFavorites([...favorites, item]);
  }

  function deleteFromFavorites(id) {
    const newArr = favorites.filter((item) => item.id !== id);
    setFavorites(newArr);
  }

  return (
    <FoodRecipeContext.Provider
      value={{
        recipeList,
        searchParam,
        loading,
        setSearchParam,
        getRecipeDetails,
        recipeDetails,
        favorites,
        addToFavorites,
        deleteFromFavorites,
      }}
    >
      {children}
    </FoodRecipeContext.Provider>
  );
};

function useRecipeContext() {
  const context = useContext(FoodRecipeContext);
  if (!context)
    console.log("you are trying to access the context outside the provider");
  return context;
}

export { RecipeContext, useRecipeContext };
