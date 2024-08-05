document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event triggered");

  const transactionDetails = document.querySelector(".transaction-details");
  const payButton = document.getElementById("pay-button");
  const invoice = document.getElementById("invoice");
  const invoiceContent = document.querySelector(".invoice-content");

  // Load cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  console.log("Cart items loaded:", cartItems);

  // Display transaction details
  let subtotal = 0;
  cartItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("transaction-item");
    itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: ${item.price}</p>
            <p>Subtotal: IDR ${
              parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity
            }</p>
        `;
    transactionDetails.appendChild(itemElement);
    subtotal +=
      parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity;
  });

  const subtotalElement = document.createElement("p");
  subtotalElement.innerHTML = `Total: IDR ${subtotal.toLocaleString("id-ID")}`;
  transactionDetails.appendChild(subtotalElement);

  // Handle pay button click
  payButton.addEventListener("click", function () {
    console.log("Pay button clicked");

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const country = document.getElementById("country").value;
    const province = document.getElementById("province").value;
    const zipcode = document.getElementById("zipcode").value;
    const paymentMethod = document.getElementById("payment-method").value;
    const phone = document.getElementById("phone").value;

    console.log("Form data:", {
      name,
      email,
      country,
      province,
      zipcode,
      paymentMethod,
      phone,
    });

    // Generate invoice
    invoiceContent.innerHTML = `
            <h3>Invoice</h3>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Country: ${country}</p>
            <p>Province: ${province}</p>
            <p>Postal Code: ${zipcode}</p>
            <p>Payment Method: ${paymentMethod}</p>
            <p>Phone: ${phone}</p>
            <h3>Products</h3>
        `;
    cartItems.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("invoice-item");
      itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: ${item.price}</p>
                <p>Subtotal: IDR ${
                  parseFloat(item.price.replace(/[^0-9.-]+/g, "")) *
                  item.quantity
                }</p>
            `;
      invoiceContent.appendChild(itemElement);
    });

    invoiceContent.innerHTML += `<p>Total: IDR ${subtotal.toLocaleString(
      "id-ID"
    )}</p>`;
    invoiceContent.innerHTML += `<p>Transaction Successful</p>`;

    // Show invoice
    invoice.style.display = "block";
    console.log("Invoice displayed");

    // Clear cart
    localStorage.removeItem("cartItems");
    console.log("Cart items removed from localStorage");

    // Display success message
    alert("Transaction Successful");
  });
});
