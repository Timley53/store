"strict mode";
const cartDiv = document.querySelector(".cart-table");
const cartQuantityValue = document.querySelector(".cart-quantity-value");
const cartTotalValue = document.querySelector(".cart-total-value");

cartlist = JSON.parse(localStorage.getItem("cartlist"));
console.log(cartlist);

if (cartlist > 1) {
  cartlist.sort((a, b) => {
    return +a.id - +b.id;
  });
  localStorage.setItem("cartlist", JSON.stringify(cartlist));

  cartlist = JSON.parse(localStorage.getItem("cartlist"));
}

// console.log(cartlist);
let productCartlists;

let totalCart = 0;

class CartApp extends StoreApp {
  cartList;
  cartTotal;
  constructor() {
    super();
    // this.cartList = this.cart.map((crt) => {
    //   crt.id = crt.productsId;
    //   return;
    // });
    // this.getCartProduct();
    this.getAllCart();
    this.gotoProductFromCart();
    this.cartTotalcalculated();
    console.log(this.cart);
    // console.log(this.cartList);
  }

  getCartProduct() {
    this.cartList = this.allProducts.filter((alP) => {
      let quat;
      const val = this.cart.some((cartIt) => {
        if (alP.id === cartIt.productsId) {
          quat = cartIt.quantity;
          return;
        }
      });
      if (val) {
        alP.quantity = quat;
        return;
      }
    });

    console.log(this.cartList);
  }

  gotoProductFromCart() {
    const app = this;

    cartDiv.addEventListener("click", function (e) {
      if (e.target?.classList?.contains("cart-item-name")) {
        app.clickedProductsId = e.target
          .closest(".table-row")
          .getAttribute("data-id");

        app.clickedProductQantity = +e.target
          .closest(".table-row")
          .querySelector(".cart-price-input").value;
        console.log(
          e.target.closest(".table-row").querySelector(".cart-item-quantity")
            .Value
        );

        app.fromCart = true;
        app.justSave(memory);
        ///////////

        //////////////

        window.location = "product.html";
      }

      //delete cart item

      if (e.target?.closest(".delete")?.classList?.contains("delete")) {
        console.log(e.target);
        const id = +e.target.closest(".table-row").getAttribute("data-id");
        console.log(id);

        app.cart = app.cart.filter((cart) => {
          console.log(cart);
          return +cart.id !== id;
        });
        app.cartTotalcalculated();
        app.justSave(memory);
        console.log(app.cart);
        e.target?.closest(".table-row")?.classList?.add("none");
      }
    });
  }

  cartTotalcalculated() {
    this.cartTotal = this.cart.reduce(
      (acc, cur) => {
        acc.cartPriceTotal += cur.price * cur.quantity;

        acc.cartQuantityTotal += cur.quantity;

        return acc;
      },
      {
        cartPriceTotal: 0,
        cartQuantityTotal: 0,
      }
    );

    cartQuantityValue.textContent = this.cartTotal.cartQuantityTotal;

    cartTotalValue.textContent = formatted(this.cartTotal.cartPriceTotal);

    console.log(this.cartTotal);
  }

  displayCart(products) {
    const html = `
      <div class="table-row" data-id =  "${products.id}">
          <div class="product-delete col">
            <button class="delete"><i class="fa-solid fa-xmark"></i></button>
          </div>
          
          <div class="cart-item-name col">
        ${products.title}
          </div>

          <div class="cart-item-price col">${products.price}</div>

          <div class="cart-item-quantity col">
            <input
              type="number"
              name="quantity"
              id="cart-price-input"
              class="cart-price-input"
              value="${products.quantity}"
              min="1"
            />
          </div>


          <div class="cart-item-subtotal col">${formatted(
            products.quantity * products.price
          )}</div>
        </div>`;

    cartDiv.insertAdjacentHTML("beforeend", html);
  }

  async getAllCart() {
    console.log(this.cart);
    try {
      const res = await fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 10,
          products: this.cart,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();

      console.log(data);

      data.products.forEach((prd) => {
        this.displayCart(prd);
      });

      if (this.cart && this.cart.length < 1) {
        throw new Error("Cart is empty");

        return;
      }
    } catch (err) {
      cartDiv.textContent = err.message + "😓😥" + "Try again";
    } finally {
    }
  }
}

const cartPage = new CartApp();

console.log(cartPage);

////

////////////////

/////////////////////

//////////////////////////

function updateCart() {
  productCartlists = cartlist.map((no) => {
    return fetch(`https://dummyjson.com/products/${no}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Something went wrong ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        //   console.log(data);

        return data;
      })
      .catch((err) => {
        cartDiv.textContent = err;
        console.log(err);
      })
      .finally(() => {
        console.log("done");
      });
  });

  productCartlists.forEach((cart) => {
    cart
      .then((res) => {
        totalCart += res.price;
        displayCart(res);
        // console.log(totalCart);
      })
      .catch((err) => {
        cartDiv.textContent += err;
        console.log(err);
      })
      .finally(() => {
        console.log(totalCart);

        // console.log("done");
      });
  });
}
// updateCart();

cartDiv.addEventListener("click", function (e) {
  if (e.target?.classList?.contains("cart-price-input")) {
    console.log(e.target.value);

    const subtotal =
      +e.target.value *
      +e.target.closest(".table-row").querySelector(".cart-item-price")
        .textContent;

    // // //////

    // e.target
    //   .closest(".table-row")
    //   .querySelector(".cart-item-subtotal").textContent = subtotal;

    // console.log(
    //   e.target.closest(".table-row").querySelector(".cart-item-price")
    //     .textContent
    // );

    // e.target
    //   .closest(".cart-table")
    //   .querySelectorAll(".cart-item-subtotal")
    //   .forEach((sub) => {
    //     console.log(sub);
    //   });
    const no = cartlist.findIndex((c, i) => {
      return c.id === e.target.closest(".table-row").getAttribute("data-id");
    });

    cartlist[no].quantity = +e.target.value;

    localStorage.setItem("cartlist", JSON.stringify(cartlist));

    e.target
      .closest(".table-row")
      .querySelector(".cart-item-subtotal").textContent = subtotal;
    console.log(cartlist);
    //
  }

  // if (e.target?.closest(".delete")?.classList?.contains("delete")) {
  //   console.log(e.target);
  //   const id = +e.target.closest(".table-row").getAttribute("data-id");
  //   console.log(id);

  //   cartlist = cartlist.filter((cart) => {
  //     console.log(cart);
  //     return +cart.id !== id;
  //   });
  //   console.log(cartlist);
  //   e.target?.closest(".table-row")?.classList?.add("none");

  //   console.log(cartlist);
  // updateCart();
  // }

  // updateQ_V();
});

// const totalCart = productCartlists.reduce((total, cart) => {
//   const price = cart.then((res) => {
//     return res.price;
//   });

//   return total + price;
// }, 0);

// productCartlists.forEach((element) => {
//   element.then(console.log());
// });
// async function newArr() {
//   const productCartlists = await cartlist.map((no) => {
//     console.log(Fetchit(no));
//   });
// }

// async function Fetchit(no) {
//   try {
//     const res = await fetch(`https://dummyjson.com/products/${no}`);

//     const data = await res.json();
//     return await data;
//   } catch (err) {
//   } finally {
//     // newArr();
//   }
// }
// newArr();
/*


async function getCartlists() {
  if (!cartlist) {
    throw new Error(`You have no item on the cart🛒`);
  }
  try {
    cartlist.forEach((cart) => {
      fetchFxnCart(cart).then((res) => {
        if (!res) {
          throw new Error(`Something went wrong${res.status}, try again`);
        }
        displayCart(res);
      });
      //   console.log(products);
    });
  } catch (err) {
  } finally {
  }
}

async function fetchFxnCart(item) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${item}`);

    if (!res.ok) {
      throw new Error(`Something went wrong${res.status}, try again`);
    }

    const cartProduct = await res.json();
    return cartProduct;
  } catch (err) {
    console.log(err);
    cartDiv.textContent = err;
  } finally {
    // console.log("done");
  }
}
*/

// function updateQ_V() {
//   let totalq = cartlist.reduce((acc, el) => {
//     return (acc += el.quantity);
//   }, 0);
//   cartQuantityValue.textContent = totalq;

//   let total = cartlist.reduce((acc, el) => {
//     let calc = +el.quantity * +el.price;
//     return (acc += calc);
//   }, 0);

//   console.log(total);
//   cartTotalValue.textContent = total;
// }

function displayCart(products) {
  const html = `
      <div class="table-row" data-id = "${products.id}">
          <div class="product-delete col">
            <button class="delete"><i class="fa-solid fa-xmark"></i></button>
          </div>
          
          <div class="cart-item-name col">
           ${products.title}
          </div>

          <div class="cart-item-price col">${products.price}</div>

          <div class="cart-item-quantity col">
            <input
              type="number"
              name="quantity"
              id="cart-price-input"
              class="cart-price-input"
              value="${products.quantity}"
              min="1"
            />
          </div>


          <div class="cart-item-subtotal col">${
            products.quantity * products.price
          }</div>
        </div>
    
    `;

  cartDiv.insertAdjacentHTML("beforeend", html);
}
// getCartlists();

// fetch("https://dummyjson.com/carts/1")
//   .then((res) => res.json())
//   .then(console.log);

// cartDiv.addEventListener("click", function (e) {
//   if (e.target?.closest(".delete")?.classList?.contains("delete")) {
//     console.log(e.target);
//   }
// });

// function updateCart() {
//   fetch("https://dummyjson.com/carts/add", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       userId: 1,
//       products: cartlist,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       if (data.message) {
//         throw new Error("Cart is empty");
//         // return;
//       }

//       if (data.products && data.products.length < 1) {
//         throw new Error("Cart is empty");

//         return;
//       } else {
//         data.products.forEach((cart) => {
//           displayCart(cart);
//         });
//       }
//     })
//     .catch((err) => {
//       cartDiv.textContent = err.message;
//       console.log(err);
//     })
//     .finally(updateQ_V());
// }
// updateCart();
// updateQ_V();

fetch("https://dummyjson.com/carts/add", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userId: 1,
    products: [
      {
        id: 1,
        quantity: 1,
      },
      {
        id: 50,
        quantity: 2,
        Pprice: 1234,
      },
    ],
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
