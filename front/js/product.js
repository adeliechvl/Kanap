// Get Id from URL
function getItemId() {
  return new URL(location.href).searchParams.get("id")
}

// Get Id from API
function getItem(itemId) {
  return fetch(`http://localhost:3000/api/products/${itemId}`)
    .then(function (response) {
      return response.json()
    })
    .then(function (product) {
      return product
    })
    .catch(function (error) {
      alert('Erreur de chargement des produits')
    })
}

// adds data into HTML
function showItems(item) {
  document.getElementsByTagName('title')[0].innerHTML = `${item.name}`
  document.getElementsByClassName('item__img')[0].innerHTML = `<img src="${item.imageUrl}" alt="${item.altTxt}">`
  document.getElementById('title').textContent = `${item.name}`
  document.getElementById('price').textContent = `${item.price}`
  document.getElementById('description').textContent = `${item.description}`
  let select = document.getElementById('colors')

  // loop to show the different colors available
  item.colors.forEach(color => {
    let createOption = document.createElement('option');
    select.appendChild(createOption)
    createOption.innerHTML = `${color}`;
    createOption.value = `${color}`;
  });
}

///function to add object put into the cart into local storage
(async function addProductInCart() {
  const itemId = getItemId();
  const item = await getItem(itemId);
  showItems(item);
  const targetButton = document.getElementById('addToCart');
  const targetQuantity = document.querySelector('#quantity');

  // button "add to cart" click listener
  targetButton.addEventListener('click', (event) => {
    event.preventDefault();

    // item's data constant
    const itemProduct = {
      alternativeTxt: item.altTxt,
      productId: item._id,
      productImg: item.imageUrl,
      productName: item.name,
      productColor: colors.value,
      productDescription: item.description,
      productPrice: item.price,
      productQuantity: targetQuantity.value,
    };

    // localStorageProduct stocks localStorage's keys and values, we parse it into JSON 
    // -> JSON.parse() analyses JSON string to construct JS value/object described in the string
    let localStorageProduct = JSON.parse(localStorage.getItem("product"));

    // function "storageProduct" sends "itemProduct"'s data into "localStorage".
    const storageProduct = () => {
      let clickedProduct = localStorageProduct.find(p => p.productId == itemProduct.productId && p.productColor == itemProduct.productColor)

      // sends data into "itemProduct" then adds them to the localStorage
      if (clickedProduct = undefined) {
        let addQuantity = parseInt(itemProduct.productQuantity) + parseInt(clickedProduct.productQuantity)
        clickedProduct.productQuantity = addQuantity
      } else {
        itemProduct.productQuantity = itemProduct.productQuantity;
        localStorageProduct.push(itemProduct)
      }

      // "setItem" adds object(key+value) into local storage
      // JSON.stringify converts value JavaScript into JSON string
      localStorage.setItem("product", JSON.stringify(localStorageProduct));
    }

    // cart confirmed message
    const cartConfirm = () => {
      if (window.confirm(`${itemProduct.productName} couleur ${itemProduct.productColor} a bien été ajouté au panier.
          `)) {
        window.location.href = "cart.html"
      } else {
        window.location.href = "index.html"
      }
    }

    // if ok -> cart, else -> index
    if (localStorageProduct) {
      storageProduct()
      cartConfirm()
    } else {
      localStorageProduct = [];
      storageProduct()
      cartConfirm()
    };
  })
})(
);