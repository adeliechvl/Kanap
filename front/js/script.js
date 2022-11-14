//DOM
getProducts();

//fetch api
function getProducts() {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json().then((data) => {
      for (const item of data) {
        displayProducts(item.name, item.imageUrl, item._id, item.description, item.altTxt);
      }
    })).catch((e) => showError());
  } 

//create and display items in index html
function displayProducts(name, image, id, description, altTxt) {

  //create link
  const newLink = document.createElement("a");
  newLink.setAttribute("href", `./product.html?id=${id}`);

  // create article
  const newArticle = document.createElement("article");

  // create img
  const newImg = document.createElement("img");
  newImg.setAttribute("src", image);
  newImg.setAttribute("alt", altTxt);
  newArticle.appendChild(newImg);

  // create h3
  const newh3 = document.createElement("h3");
  newh3.innerText = name;
  newArticle.appendChild(newh3);

  // create p
  const newP = document.createElement("p");
  newP.innerText = description;
  newArticle.appendChild(newP);
  console.log (description);

  // load elements
  newLink.appendChild(newArticle);
  const parent = document.getElementById("items");
  parent.appendChild(newLink);
}
