"strict mode";
const productImg1 = document.querySelector(".img-1");
const productListImg1 = document.querySelector(".img-list-1");
const productListImg2 = document.querySelector(".img-list-2");
const productListImg3 = document.querySelector(".img-list-3");
const ProductTitle = document.querySelector(".Product-d-title");
const ProductDescription = document.querySelector(".Product-d-description");
const ProductPrice = document.querySelector(".Product-d-price");
const productHeader = document.querySelector(".product-header");
const categoryDisplay = document.querySelector(".category-display");
const rightBtn = document.querySelector(".right-btn");
const leftBtn = document.querySelector(".left-btn");
const failedFetch = document.querySelector(".failed-fetch");
const awaitProduct = document.querySelector(".await-product");
const failedFetch2 = document.querySelector(".failed-fetch2");
const awaitProduct2 = document.querySelector(".await-product2");
const spiner = document.querySelector(".spiner");
const imgList = document.querySelectorAll(".img-lists img");

///////////////////////
/////

///////////////////////////////////

//
let productCategory;
clickProducts = JSON.parse(localStorage.getItem("productid"));

//
//
function displayP(data) {
  productImg1.src = data?.images?.[0];
  productListImg1.src = data?.images?.[0];
  productListImg2.src = data?.images?.[1];
  productListImg3.src = data?.images?.[2];
  ProductTitle.textContent = data?.title;
  ProductDescription.textContent = data?.description;
  ProductPrice.textContent = formatted(data?.price);
}
//
///////
///////////
async function fetchClickedProducts() {
  try {
    const res = await fetch(`https://dummyjson.com/products/${clickProducts}`);
    console.log(res);
    if (!res.ok) {
      throw new Error(`Something went wrong ${res.status}, Reload page`);
    }

    const data = await res.json();
    console.log(data);
    productCategory = data;
    displayP(data);

    //
    const catRes = await fetch(
      `https://dummyjson.com/products/category/${data.category}`
    );
    if (!catRes.ok) {
      throw new Error(`Something went wrong ${catRes.status}`);
    }

    const catData = await catRes.json();

    console.log(catData.products);

    await catData.products.forEach((product) => {
      displayProducts(product, categoryDisplay);

      // rightBtn.addEventListener("click", function () {

      // });
    });

    imgList.forEach((img) => {
      img.addEventListener("click", function () {
        productImg1.src = img.src;
      });

      console.log(img);
    });
  } catch (err) {
    productHeader.textContent = err;
    categoryDisplay.textContent = err;
    categoryDisplay.style.justifyContent = "center";
  } finally {
    awaitProduct.style.opacity = "0";
    awaitProduct2.style.opacity = "0";
    setTimeout(() => {
      awaitProduct.classList.add("none");
      awaitProduct2.classList.add("none");
    }, 900);
  }

  //

  //////
}
fetchClickedProducts();
clickEachProducts(categoryDisplay);

// fetch(`https://dummyjson.com/products/${clickProducts}`)
//   .then((res) => res.json())
//   .then((data) => {
//   });
// console.log(clickProducts);
// console.log(productCategory);
