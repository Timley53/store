"strict mode";
const menuBar = document.querySelector(".menu");
const faBars = document.querySelector(".fa-bars");
const navLists = document.querySelector(".nav-lists");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

// //
let clickProducts;

//
//
menuBar.addEventListener("click", function () {
  navLists.classList.toggle("translate");
  faBars.classList.toggle("fa-xmark");
  overlay.classList.toggle("none");
  body.classList.toggle("body-100");
});
// /

// ////

// ///////////////

const formatted = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;

function displayProducts(product, element) {
  const html = `
        <div class="product-card" data-id = "${product.id}">
            <div class="product-image">
              <img src=${product.images[0]} />
            </div>

            <div class="product-brand">${product.brand}</div>
            <a href="./product.html" class="product-name"
              >${product.title}</a
            >
            <div class="ratings">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
              ><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
              ><i class="fa-solid fa-star"></i>
            </div>
            <div class="price">${formatted(product.price)}</div>
            <button class="cart" data-id = "${product.id}">
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        
        `;

  element.insertAdjacentHTML("afterbegin", html);
  //   console.log(product);
}

function clickEachProducts(element) {
  element?.addEventListener("click", function (e) {
    if (e.target.closest(".cart")?.classList.contains("cart")) {
      console.log(e.target);
      return;
    }
    if (
      e.target?.closest(".product-card").classList?.contains("product-card")
    ) {
      clickProducts = e.target.closest(".product-card").getAttribute("data-id");

      localStorage.setItem("productid", JSON.stringify(clickProducts));

      window.location = "product.html";
    }
  });
}
