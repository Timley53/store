"strict mode";
const menuBar = document.querySelector(".menu");
const faBars = document.querySelector(".fa-bars");
const navLists = document.querySelector(".nav-lists");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

// //
let clickProducts;

let cartlist = [];

cartlist = JSON.parse(localStorage.getItem("cartlist"));
if (!cartlist) {
  cartlist = [];
}

console.log(cartlist);
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
///

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
    if (
      e.target.classList.contains("product-card") ||
      e.target.classList.contains("categories-container") ||
      e.target.classList.contains("products") ||
      e.target.classList.contains("category-display")
    ) {
      return;
    }

    if (e.target.closest(".cart")?.classList.contains("cart")) {
      // console.log(e.target);
      const cartItemNo = {
        id: e.target.closest(".product-card").getAttribute("data-id"),
        quantity: 1,

        price: +e.target
          .closest(".product-card")
          .querySelector(".price")
          .textContent.slice(1, length - 3)
          .replace(",", ""),
      };
      console.log(cartlist);
      cartlist.push(cartItemNo);
      localStorage.setItem("cartlist", JSON.stringify(cartlist));
      console.log(cartlist);
      return;
    }

    // if () {
    //   return;
    // }

    if (
      e.target?.closest(".product-card")?.classList?.contains("product-card")
    ) {
      clickProducts = e.target.closest(".product-card").getAttribute("data-id");

      localStorage.setItem("productid", JSON.stringify(clickProducts));

      window.location = "product.html";
    }
  });
}

async function getCartProduct(no) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${no}`);
    if (!res.ok) {
      throw new Error(`Something went wrong${(await res).status}, try again`);
    }

    const cartProduct = await res.json();

    await cartlist.push(cartProduct);
  } catch (err) {
  } finally {
    // console.log(await cartlist);
  }
}

console.log("timmy,t".replace(",", "").replace("+", ""));
