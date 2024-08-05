//

// Event listener for the checkout button
const ItemDetailButtons = document.querySelectorAll(".item-detail-button");
const ShoppingCart = document.querySelector(".shopping-cart");
const CheckoutButton = document.querySelector("#checkout-button");

const SearchBox = document.querySelector("#search-box");
const SB = document.querySelector("#search-button");
const SC = document.querySelector("#cart-button");
const SearchForm = document.querySelector("#search-form");
const ItemDetailModal = document.querySelector("#item-detail-modal");

document.querySelector("#search-button").onclick = (e) => {
  SearchForm.classList.toggle("active");
  SearchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
document.querySelector("#cart-button").onclick = (e) => {
  ShoppingCart.classList.toggle("active");
  e.preventDefault();
};

// menghilangkan element ketika di click diluar area
document.addEventListener("click", function (e) {
  if (!SB.contains(e.target) && !SearchForm.contains(e.target)) {
    SearchForm.classList.remove("active");
  }
  if (!SC.contains(e.target) && !ShoppingCart.contains(e.target)) {
    ShoppingCart.classList.remove("active");
  }
});

ItemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    ItemDetailModal.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon").onclick = (e) => {
  ItemDetailModal.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === ItemDetailModal) {
    ItemDetailModal.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const cartButtons = document.querySelectorAll(".item-cart-button");
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalPriceElement = document.getElementById("total-price");

  cartButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // Mencegah link default

      // Ambil detail produk
      const mainCard = button.closest(".main-card");
      const productName = mainCard.querySelector("h3").innerText;
      const productPrice = mainCard.querySelector(".main-price span").innerText;
      const productImageSrc = mainCard.querySelector("img").src;

      // Cari item di dalam cart
      let cartItem = Array.from(cartItemsContainer.children).find(
        (item) => item.querySelector("h3").innerText === productName
      );

      if (cartItem) {
        // Tambahkan jumlah jika item sudah ada di cart
        const quantityInput = cartItem.querySelector(".item-quantity");
        quantityInput.value = parseInt(quantityInput.value) + 1;
      } else {
        // Buat elemen item baru di cart jika item belum ada
        cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
          <img src="${productImageSrc}" alt="${productName}">
          <div>
            <h3>${productName}</h3>
            <div class="item-price">${productPrice}</div>
            <div class="quantity-control">
              <button class="decrease-quantity">-</button>
              <input type="number" value="1" min="1" class="item-quantity">
              <button class="increase-quantity">+</button>
            </div>
          </div>
          <span class="remove-item">Remove</span>
        `;
        cartItemsContainer.appendChild(cartItem);

        // Tambahkan event listener untuk tombol hapus
        cartItem
          .querySelector(".remove-item")
          .addEventListener("click", function () {
            cartItem.remove();
            updateCheckoutButtonVisibility();
            updateTotalPrice();
          });

        // Tambahkan event listener untuk tombol pengurangan
        cartItem
          .querySelector(".decrease-quantity")
          .addEventListener("click", function () {
            const quantityInput = cartItem.querySelector(".item-quantity");
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
              quantity--;
              quantityInput.value = quantity;
              updateTotalPrice();
            }
          });

        // Tambahkan event listener untuk tombol penambahan
        cartItem
          .querySelector(".increase-quantity")
          .addEventListener("click", function () {
            const quantityInput = cartItem.querySelector(".item-quantity");
            let quantity = parseInt(quantityInput.value);
            quantity++;
            quantityInput.value = quantity;
            updateTotalPrice();
          });
      }

      // Tampilkan shopping cart
      ShoppingCart.classList.add("active");

      // Periksa jumlah item di keranjang dan tampilkan/ sembunyikan tombol checkout
      updateCheckoutButtonVisibility();
      updateTotalPrice();
    });
  });

  // Function untuk update visibilitas tombol checkout
  function updateCheckoutButtonVisibility() {
    const cartItems = document.querySelectorAll(".cart-item");
    if (cartItems.length > 0) {
      CheckoutButton.style.display = "block";
    } else {
      CheckoutButton.style.display = "none";
    }
  }

  // Function untuk update total harga
  function updateTotalPrice() {
    const cartItems = document.querySelectorAll(".cart-item");
    let total = 0;
    cartItems.forEach((item) => {
      const price = parseFloat(
        item.querySelector(".item-price").innerText.replace(/[^0-9.-]+/g, "")
      );
      const quantity = parseInt(item.querySelector(".item-quantity").value);
      total += price * quantity;
    });
    totalPriceElement.innerText = "IDR ".concat(total.toLocaleString("id-ID"));
  }

  // Event listener untuk tombol checkout
  CheckoutButton.addEventListener("click", function () {
    const cartItems = Array.from(document.querySelectorAll(".cart-item")).map(
      (item) => ({
        name: item.querySelector("h3").innerText,
        price: item.querySelector(".item-price").innerText,
        quantity: item.querySelector(".item-quantity").value,
      })
    );

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.location.href = "HTML/transaction.html"; // isi dengan URL halaman transaksi Anda
  });

  // Inisialisasi visibilitas tombol checkout saat halaman dimuat
  updateCheckoutButtonVisibility();
  updateTotalPrice();
});
