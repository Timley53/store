"strict mode";

const header = document.querySelector(".header");
const smartphones = document.querySelector(".smartphones");
const tops = document.querySelector(".tops");
const laptops = document.querySelector(".laptops");
const fragrances = document.querySelector(".fragrances");
const skincare = document.querySelector(".skincare");
const groceries = document.querySelector(".groceries");
const homeDecoration = document.querySelector(".home-decoration");
const furniture = document.querySelector(".furniture");
const womensDresses = document.querySelector(".womens-dresses");
const womensShoes = document.querySelector(".womens-shoes");
const mensShoes = document.querySelector(".mens-shoes");
const mensShirt = document.querySelector(".mens-shirt");
const mensWatches = document.querySelector(".mens-watches");
const womensWatches = document.querySelector(".womens-watches");
const womensBags = document.querySelector(".womens-bags");
const womensJewellery = document.querySelector(".womens-jewellery");
const sunglasses = document.querySelector(".sunglasses");
const automotive = document.querySelector(".automotive");
const motorcycle = document.querySelector(".motorcycle");
const lighting = document.querySelector(".lighting");
const categoriesContainer = document.querySelectorAll(".categories-container");
const categoriesoverlay = document.querySelectorAll(".categories-overlay");
const searchInput = document.querySelector(".search-input");
const searchResults = document.querySelector(".search-results");
const searchResultBox = document.querySelector(".search-result-box");
const searchBtn = document.querySelector(".search-btn");
const resultFound = document.querySelector(".result-found");

let allProducts;

//

////////

//
const linksBtn = document.querySelector(".links");
const categoriesCrumbs = document.querySelector(".categories-crumbs");

linksBtn.addEventListener("click", function () {
  categoriesCrumbs.classList.toggle("crumbs-translate");
});

async function loadProducts(element, divBox) {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/category/${element}`
    );
    if (!res.ok) {
      throw new Error(`Something went wrong ${res.status}`);
    }
    const data = await res.json();
    // console.log(data);
    data.products.forEach((product) => {
      displayProducts(product, divBox);
    });
    // displayProducts(product, element);
  } catch (err) {
    header.textContent = err;
    header.style.textAlign = "center";
  } finally {
    categoriesoverlay.forEach((over) => {
      over.classList.add("none");
    });
  }
}

loadProducts("tops", tops);
loadProducts("smartphones", smartphones);
loadProducts("fragrances", fragrances);
loadProducts("laptops", laptops);
loadProducts("skincare", skincare);
loadProducts("groceries", groceries);
loadProducts("furniture", furniture);
loadProducts("sunglasses", sunglasses);
loadProducts("automotive", automotive);
loadProducts("motorcycle", motorcycle);
loadProducts("lighting", lighting);
loadProducts("home-decoration", homeDecoration);
loadProducts("womens-dresses", womensDresses);
loadProducts("womens-shoes", womensShoes);
loadProducts("mens-shoes", mensShoes);
loadProducts("mens-watches", mensWatches);
loadProducts("mens-shirts", mensShirt);
loadProducts("womens-watches", womensWatches);
loadProducts("womens-bags", womensBags);
loadProducts("womens-jewellery", womensJewellery);

categoriesContainer.forEach((cont) => {
  clickEachProducts(cont);
});
// [
//   ("fragrances",
//   "skincare",
//   "groceries",
//   "home-decoration",
//   "furniture",
//   "womens-dresses",
//   "womens-shoes",
//   "mens-shoes",
//   "mens-watches",
//   "womens-watches",
//   "womens-bags",
//   "womens-jewellery",
//   "sunglasses",
//   "automotive",
//   "motorcycle",
//   "lighting")
// ];
// fetch("https://dummyjson.com/products/category/mens-shirts")
//   .then((res) => res.json())
//   .then(console.log);
// fetch("https://dummyjson.com/products/categories")
//   .then((res) => res.json())
//   .then(console.log);
// //////////////////

// fetch("https://dummyjson.com/products")
//   .then((res) => res.json())
//   .then(console.log);

searchBtn.addEventListener("click", function (e) {
  if (!searchInput.value) return;
  if (searchInput.value) {
    console.log(allProducts);

    const searchList = allProducts.filter((pr) => {
      return searchIt(
        searchInput.value.toLocaleLowerCase(),
        pr.title.toLocaleLowerCase(),
        pr.brand.toLocaleLowerCase()
      );
    });

    if (searchList.length < 1) {
      resultFound.textContent = `${searchList.length} results found`;
      searchResultBox.classList.remove("none");
    } else {
      resultFound.textContent = `${searchList.length} results found`;
      console.log(searchList);
      searchResults.textContent = "";
      searchList.forEach((pr) => {
        displayProducts(pr, searchResults);
      });
      clickEachProducts(searchResults);
    }
    searchResultBox.classList.remove("none");
  }
});

async function getAll() {
  try {
    console.log("waiting");
    const res = await fetch("https://dummyjson.com/products");

    const data = await res.json();
    allProducts = await data.products;
  } catch (err) {
  } finally {
    console.log("done");
  }
}

getAll();

function searchIt(input, description, brands) {
  const eve = input.split(" ").some((st) => {
    return description.includes(st) || brands.includes(st);
  });
  return eve;
}

console.log("tiMMy".toLocaleLowerCase());
