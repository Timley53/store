"Strict mode";

const menuBar = document.querySelector(".menu");
const faBars = document.querySelector(".fa-bars");
const navLists = document.querySelector(".nav-lists");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

const iMgcont = document.querySelector(".js");
const featured = document.querySelector(".featured");
const failedFetch = document.querySelector(".failed-fetch");
const awaitProduct = document.querySelectorAll(".await-product");
const newArrivals = document.querySelector(".new-arrivals");
const cartAdded = document.querySelector(".cart-added");

menuBar.addEventListener("click", function () {
  navLists.classList.toggle("translate");
  faBars.classList.toggle("fa-xmark");
  overlay.classList.toggle("none");
  body.classList.toggle("body-100");
});

let memory;
let checkTImer;

//functions
const checkID = (pr, productsId) => pr.id === productsId;

////
const formatted = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;
////////////

function addCartSucces() {
  if (checkTImer) clearTimeout(checkTImer);

  cartAdded.classList.add("cart-translate");

  checkTImer = setTimeout(() => {
    cartAdded.classList.remove("cart-translate");
  }, 1500);

  // checkTImer();
}

/////

///////////

//////////////

/////////////////////
//////////////////////
class StoreApp {
  cart = [];
  allProducts = [];
  clickedProductsId;
  clickedProductQantity;
  fromCart = false;
  //   loggedIn = false;

  //   #credentials = {
  //     username: "",
  //     password: "",
  //   };

  constructor() {
    this.getAllPRoducts();
    this.clickedProduct(featured);
    this.clickedProduct(newArrivals);

    this.getSaved(memory);
  }

  displayProducts(product, element) {
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

  addToCart(productsid, price, quantity = 1) {
    console.log(productsid);
    const check = this.cart.some((cartItem) => checkID(cartItem, productsid));
    console.log(check);

    if (check) {
      this.cart.forEach((pr) => {
        if (pr.id === productsid) {
          pr.quantity += quantity;
        }
        // if (checkID(pr, id)) {
        //   pr.quantity += 1;
        // }
        return;
      });
      console.log(this.cart);
      addCartSucces();
      this.justSave(memory);

      return;
    }

    this.cart.push({
      id: productsid,
      quantity: quantity,
      price: price, /// remove $ and .00
    });
    addCartSucces();
    console.log(this.cart);

    this.justSave(memory);
  }

  clickedProduct(element) {
    const ObjThis = this;
    element?.addEventListener("click", function (e) {
      if (
        e.target.classList.contains("product-card") ||
        e.target.classList.contains("categories-container") ||
        e.target.classList.contains("products") ||
        e.target.classList.contains("category-display")
      ) {
        return;
      }

      //   console.log(element);

      if (e.target.closest(".cart")?.classList.contains("cart")) {
        ObjThis.addToCart(
          +e.target.closest(".product-card").getAttribute("data-id"),

          +e.target
            .closest(".product-card")
            .querySelector(".price")
            .textContent.slice(1, length - 3)
            .replace(",", "")
        );
        ObjThis.justSave(memory);
        // ///////////////

        //////////////

        return;
      }

      // if () {
      //   return;
      // }

      if (
        e.target?.closest(".product-card")?.classList?.contains("product-card")
      ) {
        ObjThis.clickedProductsId = e.target
          .closest(".product-card")
          .getAttribute("data-id");

        ObjThis.justSave(memory);
        ////////////

        // localStorage.setItem("productid", JSON.stringify(memory));

        //////////////

        window.location = "product.html";
      }
    });
    // this.justSave(memory);
  }

  // ///////////////find product and display on page

  findProducts(finder) {
    const product = this.allProducts.find((pr) => pr.id === finder);

    return product;
  }

  async getAllPRoducts() {
    try {
      const res = await fetch(
        "https://dummyjson.com/products?limit=100&skip=0"
      );

      if (!res.ok) {
        throw new Error(`Something went wrong ${res.status} 😌😓`);
      }

      const data = await res.json();
      this.allProducts = data.products;
      this.justSave(memory);
      // console.log(memory.allProducts);

      // this.allProducts.slice(0, 6).forEach((pr) => {
      //   this.displayProducts(pr, featured);
      // });

      // this.allProducts.slice(20, 26).forEach((pr) => {
      //   this.displayProducts(pr, newArrivals);
      // });

      // console.log(this.allProducts);
    } catch (err) {
      console.log(err);
      failedFetch.textContent = `${err}, reload`;
      failedFetch?.classList.remove("none");
    } finally {
      // awaitProduct?.classList.remove("none");

      awaitProduct.forEach((awp) => awp.classList.add("none"));
      //   console.log(this.allProducts);
    }
  }

  //////display other products in the category

  otherCategories(product, Data, element) {
    const categories = Data.allProducts.filter((pr) => {
      return product.category === pr.category;
    });
    // clickedProductsId;
    categories.forEach((pr) => {
      this.displayProducts(pr, element);
    });
  }

  justSave(varElement) {
    memory = {
      cart:
        this.cart.length > 0
          ? this.cart.sort((a, b) => {
              return +a.id - +b.id;
            })
          : [],
      allProducts: this.allProducts,
      clickedProductsId: +this.clickedProductsId,
      clickedProductQantity: this.clickedProductQantity,
      fromCart: this.fromCart,
    };
    console.log(memory);

    localStorage.setItem(`memory`, JSON.stringify(memory));
  }

  getSaved(varElement) {
    memory = JSON.parse(localStorage.getItem(`memory`));
    if (!memory) return;

    console.log(memory);

    this.cart = memory.cart;
    this.allProducts = memory.allProducts;
    this.clickedProductsId = memory.clickedProductsId;
    this.clickedProductQantity = memory.clickedProductQantity;
    this.fromCart = memory.fromCart;
    // this.justSave(memory)
    console.log(memory);
  }

  createAccount(username, password) {}
}

const obj = new StoreApp();

console.log(memory);

///

/////////////

////////////////////
/*
function clickedProduct(element) {
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
      this.addToCart(
        e.target.closest(".product-card").getAttribute("data-id"),
        1,

        +e.target
          .closest(".product-card")
          .querySelector(".price")
          .textContent.slice(1, length - 3)
          .replace(",", "")
      );
      this.saveAll(memory);

      return;
    }

    // if () {
    //   return;
    // }

    if (
      e.target?.closest(".product-card")?.classList?.contains("product-card")
    ) {
      this.clickedProduct = e.target
        .closest(".product-card")
        .getAttribute("data-id");

      this.saveAll(memory);

      window.location = "product.html";
    }
  });
}

// const formatted = Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
// }).format;
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

*/

function diplayHomeProducts() {
  obj.allProducts.slice(0, 6).forEach((pr) => {
    obj.displayProducts(pr, featured);
  });

  obj.allProducts.slice(20, 26).forEach((pr) => {
    obj.displayProducts(pr, newArrivals);
  });
}
