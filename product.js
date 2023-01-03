"strict mode";

const productImg1 = document.querySelector(".img-1");
const productListImg1 = document.querySelector(".img-list-1");
const productListImg2 = document.querySelector(".img-list-2");
const productListImg3 = document.querySelector(".img-list-3");
const ProductTitle = document.querySelector(".Product-d-title");
const ProductDescription = document.querySelector(".Product-d-description");
const ProductPrice = document.querySelector(".Product-d-price");
const productHeader = document.querySelector(".product-header");
const imgList = document.querySelectorAll(".img-lists img");
const failedFetch2 = document.querySelector(".failed-fetch2");
const awaitProduct2 = document.querySelector(".await-product2");
const categoryDisplay = document.querySelector(".category-display");
const addProCart = document.querySelector(".cart");
const prQuantity = document.querySelector(".quantity");
const paymentValue = document.querySelector(".payment-value");
const subPurchase = document.querySelector(".sub-purchase");
const email = document.querySelector(".email");
const fullname = document.querySelector(".fullname");
const phoneNumber = document.querySelector(".phoneNumber");
const closeModal = document.querySelector(".close-modal");
const paymentOverlay = document.querySelector(".payment-overlay");
const buyNow = document.querySelector(".buy-now");

function modalOpenClose() {
  paymentOverlay.classList.toggle("none");
}

buyNow.addEventListener("click", function () {
  modalOpenClose();
  paymentValue.textContent = `    $${product.price * +prQuantity.value}`;
});
closeModal.addEventListener("click", function () {
  modalOpenClose();
});

// const awaitProduct = document.querySelector(".await-product");
/*
const rightBtn = document.querySelector(".right-btn");
const leftBtn = document.querySelector(".left-btn");
const failedFetch = document.querySelector(".failed-fetch");
const spiner = document.querySelector(".spiner");

///////////////////////
/////

///////////////////////////////////
console.log(memory);
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

*/

function displayP(data) {
  console.log(data);
  productImg1.src = data?.images?.[0];
  productListImg1.src = data?.images?.[0];
  productListImg2.src = data?.images?.[1];
  productListImg3.src = data?.images?.[2];
  ProductTitle.textContent = data?.title;
  ProductDescription.textContent = data?.description;
  ProductPrice.textContent = formatted(data?.price);
  prQuantity.value = 1;
}

console.log(memory);
const product = obj.findProducts(memory.clickedProductsId);

// product.qantity =

console.log(product);
// console.log(product.price);
displayP(product);
imgList.forEach((img) => {
  img.addEventListener("click", function () {
    productImg1.src = img.src;
  });

  // console.log(img);
});

obj.otherCategories(product, memory, categoryDisplay);

setTimeout(() => {
  awaitProduct.classList.add("none");
  awaitProduct2.classList.add("none");
}, 1500);

obj.clickedProduct(categoryDisplay);

addProCart.addEventListener("click", function (e) {
  obj.addToCart(memory.clickedProductsId, product.price, +prQuantity.value);
  console.log("add");
});
paymentValue.textContent = `    $${product.price * +prQuantity.value}`;
// body - cut;

function randomReference() {
  let length = 10;
  let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

console.log();
subPurchase.addEventListener("click", function (e) {
  // if (!phoneNumber) return;
  // if (!fullname) return;
  // if (!email) return;

  if (!email.value || !phoneNumber.value || !fullname.value) {
    return;
  }

  /*
  //declare callback function
  function paymentCallback(response) {
    console.log(response);
  }

  //sample payment request
  let samplePaymentRequest = {
    merchant_code: "MX007",
    pay_item_id: "101007",
    txn_ref: "sample_txn_ref_123",
    amount: 10000,
    currency: 566, // ISO 4217 numeric code of the currency used
    onComplete: paymentCallback,
    mode: "TEST",
  };

  //call webpayCheckout to initiate the payment
  window.webpayCheckout(samplePaymentRequest);
  */

  ///=========paystack

  // const paymentForm = document.getElementById("paymentForm");

  // paymentForm.addEventListener("submit", payWithPaystack, false);

  function payWithPaystack(e) {
    // e.preventDefault();
    pk_test_ecfaf2b440fe1b7ecb7e1bf7183d69456b489162;

    let handler = PaystackPop.setup({
      key: "pk_test_ecfaf2b440fe1b7ecb7e1bf7183d69456b489162",
      // Replace with your public key
      email: email.value,
      currency: "USD",
      amount: product.price * +prQuantity.value * 100,
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),

      // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function () {
        alert("Window closed.");
      },
      callback: function (response) {
        let message = "Payment complete! Reference: " + response.reference;
        alert(message);
      },
    });

    handler.openIframe();
  }

  //======-----=====flutterwave

  /*
  function makePayment() {
    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-e92beb29b38f7ffe8d6f54ab67b467c9-X",
      tx_ref: `timley-${randomReference()}`,
      amount: product.price * +prQuantity.value,
      currency: "USD",
      payment_options: "card, banktransfer, ussd",
      redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
      meta: {
        consumer_id: 23,
        consumer_mac: "92a3-912ba-1192a",
      },
      customer: {
        email: email.value,
        phone_number: phoneNumber.value,
        name: fullname.value,
      },
      customizations: {
        title: "Timley e-Store",
        description: "Product Purchase Payment",
        logo: "",
      },
    });
  }
  makePayment();

  */
});
