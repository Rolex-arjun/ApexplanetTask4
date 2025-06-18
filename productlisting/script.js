const products = [
  { name: "Smartphone", price: 699, category: "electronics", image: "phone.jpeg" },
  { name: "T-Shirt", price: 29, category: "fashion", image: "tshirt.jpeg" },
  { name: "Laptop", price: 999, category: "electronics", image: "laptop.jpeg" },
  { name: "Novel Book", price: 15, category: "books", image: "book.jpeg" },
  { name: "Headphones", price: 199, category: "electronics", image: "headphones.jpeg" },
  { name: "Jeans", price: 49, category: "fashion", image: "jeans.jpeg" },
];

const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById("category-filter");
const priceSort = document.getElementById("price-sort");

function renderProducts(productArray) {
  productList.innerHTML = "";
  productArray.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p><strong>$${product.price}</strong></p>
    `;
    productList.appendChild(card);
  });
}

function filterAndSort() {
  let filtered = [...products];

  const selectedCategory = categoryFilter.value;
  const selectedSort = priceSort.value;

  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  if (selectedSort === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

// Initial load
renderProducts(products);

// Event listeners
categoryFilter.addEventListener("change", filterAndSort);
priceSort.addEventListener("change", filterAndSort);
