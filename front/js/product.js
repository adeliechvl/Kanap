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
  const select = document.getElementById("colors");

  // button "add to cart" click listener
  targetButton.addEventListener('click', (event) => {
    event.preventDefault();

    // verify if color and quantity have been selected, else function "applyStyle"
    const productColor = select.value;
    const productQuantity = document.getElementById("quantity");
    const quantity = productQuantity.value;
    if (productColor == "" && (quantity < 1 || quantity > 100)) {
      applyStyle(select, "red", 2, productQuantity, "red", 2);
      alert("Merci de sélectionner une couleur disponible ainsi qu'une quantité.");
    }
    else if (productColor == "") {
      applyStyle(select, "red", 2, productQuantity, "black", 1);
      alert("Veuillez sélectionner une couleur parmi les options proposées");
    }
    else if (quantity < 1 || quantity > 100) {
      if (quantity > 100) {
        alert("Attention, vous ne pouvez pas commander plus de 100 fois cet article.");
      }
      else {
        alert("Merci de saisir un nombre d'article(s) valide.")
      }
      applyStyle(select, "black", 1, productQuantity, "red", 2);
    }
    else {
      applyStyle(select, "black", 1, productQuantity, "black", 1);

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
        if (clickedProduct != undefined) {
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

      /// Cart confirmed message
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
    }
  })

  function applyStyle(element1, color1, size1, element2, color2, size2) {
    element1.style.borderColor = color1;
    element1.style.borderWidth = `${size1}px`;
    element2.style.borderColor = color2;
    element2.style.borderWidth = `${size2}px`;
  }
})(
);