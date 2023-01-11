"strict mode";
// const iMgcont = document.querySelector(".js");
// const featured = document.querySelector(".featured");
// const failedFetch = document.querySelector(".failed-fetch");
// const newArrivals = document.querySelector(".new-arrivals");
// const awaitProduct = document.querySelector(".await-product");
// Important😡😡😡😡😡
/*



*/

// menu display

// fetch("https://dummyjson.com/auth/login", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     username: "kminchelle",
//     password: "0lelplR",
//     // expiresInMins: 60, // optional
//   }),
// })
//   .then((res) => {
//     console.log(res);
//     if (!res.ok) {
//       throw new Error(`${res.status}`);
//     }

//     return res.json();
//   })
//   .then((json) => {
//     console.log(json);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// fetch("https://dummyjson.com/products")
//   .then((res) => res.json())
//   .then(console.log);

//
//
async function getHomeProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    if (!res.ok) {
      throw new Error(`Something went wrong ${res.status} 😌😓`);
    }
    const parsedFetch = await res.json();

    console.log(parsedFetch);

    const Products6 = await parsedFetch.products.slice(0, 6);

    const ProductsBack6 = await parsedFetch.products.slice(20, 26);
    //
    //
    Products6.forEach((product) => {
      obj.displayProducts(product, featured);
    });
    ProductsBack6.forEach((product) => {
      obj.displayProducts(product, newArrivals);
    });

    console.log(Products6);
    console.log(ProductsBack6);
  } catch (err) {
    console.log(err);
    failedFetch.textContent = `${err}, reload`;
    failedFetch?.classList.remove("none");
  } finally {
    // awaitProduct?.classList.add("none");
  }
}

// diplayHomeProducts();
getHomeProducts(); ///Important😡😡😡😡😡

// featured?.addEventListener("click", function (e) {
//   if (e.target.closest(".cart")?.classList.contains("cart")) {
//     console.log(e.target);
//     return;
//   }
//   if (e.target?.closest(".product-card").classList?.contains("product-card")) {
//     clickProducts = e.target.closest(".product-card").getAttribute("data-id");

//     localStorage.setItem("productid", JSON.stringify(clickProducts));

//     window.location = "product.html";
//   }
//   //   if()
// });

// clickEachProducts(featured); Important😡😡😡😡😡

// clickEachProducts(newArrivals); Important😡😡😡😡😡

// (e.target.classList.contains("product-card") &&
//   !e.target.classList.contains(".cart")) ||
// (e.target.closest(".product-card").classList.contains("product-card") &&
//   !e.target.classList.contains(".cart"))
