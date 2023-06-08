// Fetch the JSON data
fetch("mock.json")
  .then((response) => response.json())
  .then((data) => {
    // Get the container element where the products will be displayed
    const productsContainer = document.getElementById("products");

    // Clear any existing content in the container
    productsContainer.innerHTML = "";

    // Display the initial products
    displayProducts(data.featuredProducts);

    // Search functionality
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredProducts = data.featuredProducts.filter((product) => {
        const matchesSearchTerm = product.name
          .toLowerCase()
          .includes(searchTerm);
        const matchesSynonyms = product.keywords.some((keyword) => {
          const synonyms = getSynonyms(keyword.toLowerCase());
          return (
            keyword.toLowerCase().includes(searchTerm) ||
            synonyms.includes(searchTerm)
          );
        });
        return matchesSearchTerm || matchesSynonyms;
      });

      displayProducts(filteredProducts);
    });

    // Filter functionality
    const filterSelect = document.getElementById("filterSelect");
    filterSelect.addEventListener("change", function () {
      const filterValue = filterSelect.value;
      let filteredProducts = data.featuredProducts;

      if (filterValue) {
        filteredProducts = data.featuredProducts.filter((product) => {
          switch (filterValue) {
            case "hair":
              return product.id === "1" || product.id === "6";
            case "skin":
              return product.id === "2" || product.id === "5";
            case "headaches":
              return product.id === "3" || product.id === "8";
            case "stomach":
              return product.id === "4" || product.id === "7";
            default:
              return true;
          }
        });
      }

      displayProducts(filteredProducts);
    });

    function displayProducts(products) {
      // Clear any existing content in the container
      productsContainer.innerHTML = "";

      // Iterate over the products data
      products.forEach((product) => {
        // Create HTML elements for each product
        const productDiv = document.createElement("div");
        productDiv.className = "product";

        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.name;

        const productName = document.createElement("h3");
        productName.textContent = product.name;

        const productDescription = document.createElement("p");
        productDescription.textContent = product.description;

        const productPrice = document.createElement("span");
        productPrice.className = "price";
        productPrice.textContent = product.price;

        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.dataset.productId = product.id;

        // Append the elements to the product container
        productDiv.appendChild(productImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productDescription);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(addToCartButton);

        productsContainer.appendChild(productDiv);
      });
    }

    function getSynonyms(keyword) {
      const synonymMappings = {
        hair: ["beautiful", "shiny", "lustrous", "radiant"],
        skin: ["beautiful", "glowing", "radiant"],
        headache: ["migraine", "cephalalgia"],
        "stomach ache": ["stomach", "abdominal pain"],
      };
      return synonymMappings[keyword] || [];
    }

    const cartItemsContainer = document.getElementById("cartItems");
    const checkoutButton = document.getElementById("checkoutButton");
    const totalPriceElement = document.getElementById("totalPrice");
    let cartItems = [];

    // Add to Cart button click event listener
    productsContainer.addEventListener("click", function (event) {
      if (event.target.tagName === "BUTTON") {
        const productId = event.target.dataset.productId;
        const product = data.featuredProducts.find(
          (item) => item.id === productId
        );
        if (product) {
          addToCart(product);
        }
      }
    });

    // Add product to cart
    function addToCart(product) {
      const existingCartItem = cartItems.find((item) => item.id === product.id);

      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        const cartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        };
        cartItems.push(cartItem);
      }

      updateCart();
    }

    // Update the cart display
    function updateCart() {
      cartItemsContainer.innerHTML = "";
      cartItems.forEach((item) => {
        const row = document.createElement("tr");

        const productName = document.createElement("td");
        productName.textContent = item.name;

        const quantity = document.createElement("td");
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = item.quantity;
        quantityInput.min = "1";
        quantityInput.addEventListener("input", function () {
          item.quantity = parseInt(quantityInput.value);
          updateCart();
        });
        quantity.appendChild(quantityInput);

        const price = document.createElement("td");
        price.textContent = item.price;

        const total = document.createElement("td");
        const totalAmount = parseFloat(item.price.slice(1)) * item.quantity;
        total.textContent = "$" + totalAmount.toFixed(2);

        const removeButton = document.createElement("td");
        const removeIcon = document.createElement("i");
        removeIcon.className = "fa fa-trash";
        removeIcon.addEventListener("click", function () {
          cartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
          updateCart();
        });
        removeButton.appendChild(removeIcon);

        row.appendChild(productName);
        row.appendChild(quantity);
        row.appendChild(price);
        row.appendChild(total);
        row.appendChild(removeButton);

        cartItemsContainer.appendChild(row);
      });

      calculateTotalAmount();
    }

    // Calculate the total amount
    function calculateTotalAmount() {
      const totalPrice = cartItems.reduce(
        (total, item) =>
          total + parseFloat(item.price.slice(1)) * item.quantity,
        0
      );
      totalPriceElement.textContent = "$" + totalPrice.toFixed(2);
    }

    // Checkout button click event listener
    checkoutButton.addEventListener("click", function () {
      if (cartItems.length > 0) {
        // Process the checkout and display a success message
        alert("Checkout completed successfully!");
        cartItems = [];
        updateCart();
      } else {
        alert(
          "Your cart is empty. Please add items to your cart before checkout."
        );
      }
    });
  })
  .catch((error) => console.log(error));
