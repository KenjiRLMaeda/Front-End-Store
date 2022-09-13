export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(query) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const data = await response.json();
  return data;
}

export async function getProductsByCategory(categoryId) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const data = await response.json();
  return data;
}
export async function getProductById(id) {
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await response.json();
  return data;
}

export function setEvaluationToProduct(evaluation) {
  const evaluations = JSON.parse(localStorage.getItem('evaluations')) || [];

  localStorage.setItem('evaluations', JSON.stringify([...evaluations, evaluation]));
}

export function getEvaluationsToProduct(id) {
  const evaluations = JSON.parse(localStorage.getItem('evaluations')) || [];
  return evaluations.filter(({ productId }) => productId === id);
}

export function addProducts(product) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  localStorage.setItem('products', JSON.stringify([...products, product]));
}

export function getProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

export function clearProducts(id) {
  const items = JSON.parse(localStorage.getItem('products')) || [];
  const products = items.filter((item) => item.id !== id);
  localStorage.setItem('products', JSON.stringify(products));
}
