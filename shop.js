"strict mode";

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
    const data = await res.json();
    // console.log(data);
    data.products.forEach((product) => {
      displayProducts(product, divBox);
    });
    // displayProducts(product, element);
  } catch (err) {
  } finally {
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
fetch("https://dummyjson.com/products/category/mens-shirts")
  .then((res) => res.json())
  .then(console.log);
fetch("https://dummyjson.com/products/categories")
  .then((res) => res.json())
  .then(console.log);
