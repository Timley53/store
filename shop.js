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
const searchSpiner = document.querySelector(".search-spiner");

// console.log(obj.allProducts);
//

////////

//
const linksBtn = document.querySelector(".links");
const categoriesCrumbs = document.querySelector(".categories-crumbs");

linksBtn.addEventListener("click", function () {
  categoriesCrumbs.classList.toggle("crumbs-translate");
});

async function loadProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=100&skip=0");
    if (!res.ok) {
      throw new Error(`Something went wrong ${res.status}`);
    }
    const data = await res.json();
    console.log(data);

    findEachCate(data.products, "tops", tops);
    findEachCate(data.products, "smartphones", smartphones);
    findEachCate(data.products, "fragrances", fragrances);
    findEachCate(data.products, "fragrances", fragrances);
    findEachCate(data.products, "laptops", laptops);
    findEachCate(data.products, "skincare", skincare);
    findEachCate(data.products, "groceries", groceries);
    findEachCate(data.products, "furniture", furniture);
    findEachCate(data.products, "sunglasses", sunglasses);
    findEachCate(data.products, "automotive", automotive);
    findEachCate(data.products, "motorcycle", motorcycle);
    findEachCate(data.products, "lighting", lighting);
    findEachCate(data.products, "home-decoration", homeDecoration);
    findEachCate(data.products, "womens-dresses", womensDresses);
    findEachCate(data.products, "womens-shoes", womensShoes);
    findEachCate(data.products, "mens-shoes", mensShoes);
    findEachCate(data.products, "mens-watches", mensWatches);
    findEachCate(data.products, "mens-shirts", mensShirt);
    findEachCate(data.products, "womens-watches", womensWatches);
    findEachCate(data.products, "womens-bags", womensBags);
    findEachCate(data.products, "womens-jewellery", womensJewellery);

    // displayProducts(product, element);
  } catch (err) {
    header.textContent = `${err}, reload`;
    header.style.textAlign = "center";
  } finally {
    categoriesoverlay.forEach((over) => {
      over.classList.add("none");
    });
  }
}

function findEachCate(arr, categoryStr, divBox) {
  const filtedArr = arr.filter((pr) => pr.category === categoryStr);

  filtedArr.forEach((pr) => {
    obj.displayProducts(pr, divBox);
  });
}

loadProducts();

// loadProducts("tops", tops);
// loadProducts("smartphones", smartphones);
// loadProducts("fragrances", fragrances);
// loadProducts("laptops", laptops);
// loadProducts("skincare", skincare);
// loadProducts("groceries", groceries);
// loadProducts("furniture", furniture);
// loadProducts("sunglasses", sunglasses);
// loadProducts("automotive", automotive);
// loadProducts("motorcycle", motorcycle);
// loadProducts("lighting", lighting);
// loadProducts("home-decoration", homeDecoration);
// loadProducts("womens-dresses", womensDresses);
// loadProducts("womens-shoes", womensShoes);
// loadProducts("mens-shoes", mensShoes);
// loadProducts("mens-watches", mensWatches);
// loadProducts("mens-shirts", mensShirt);
// loadProducts("womens-watches", womensWatches);
// loadProducts("womens-bags", womensBags);
// loadProducts("womens-jewellery", womensJewellery);

categoriesContainer.forEach((cont) => {
  obj.clickedProduct(cont);
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
    SearchProducts(searchInput.value);
    obj.clickedProduct(searchResults);
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

async function SearchProducts(searchIpunt) {
  try {
    searchSpiner.classList.remove("none");
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${searchIpunt}`
    );
    if (!res.ok) {
      throw new Error(`Something went wrong`);
    }

    const data = await res.json();
    console.log(data);
    if (data.products.length < 1) {
      throw new Error(`No result found`);
    }

    resultFound.textContent = `${data.products.length} results found`;

    data.products.forEach((result) => {
      obj.displayProducts(result, searchResults);
    });
  } catch (err) {
    searchResultBox.textContent = err.message;
  } finally {
    searchResultBox.classList.remove("none");
    searchSpiner.classList.add("none");
  }
}
