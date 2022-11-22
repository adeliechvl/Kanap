// "localStorageProduct" gets data from the local storage and turns them into JSON
let localStorageProduct = JSON.parse(localStorage.getItem("product"));

// "getCartItem" targets "cart__items" in the HTML
const getCartItem = document.getElementById('cart__items');

// "submitBtn" targets the "order" button in the HTML
const submitBtn = document.querySelector("#order");


/// function that adds the products from the cart into the HTML
function addProductToCart() {

    // fullCart = cart's empty table
    let fullCart = [];

    // variables to get cart's final price
    let totalCart = 0;
    let totalFullCart = 0;

    // doublesFilter filtre les doublons de produits ayant la même couleur.
    const doublesFilter = {}
    localStorageProduct = localStorageProduct.filter((item, _) => {
        let alreadyExists = doublesFilter.hasOwnProperty(item.productColor)
        return alreadyExists ? false : doublesFilter[item.productColor] = 1
    })

    // loop that adds product until there are no more in the local storage
    // totalFullCart & totalCart calculate sum of the product in the cart
    for (i = 0; i < localStorageProduct.length; i++) {

        // totalCart (valeur 0) is multiplied by productNumber and productPrice to get total price
        totalCart += localStorageProduct[i].productNumber * localStorageProduct[i].productPrice

        // price calculation in the cart
        totalFullCart += parseInt(localStorageProduct[i].productNumber, 10)

        // we send everything in the HTML with innerHTML method
        fullCart = getCartItem.innerHTML = fullCart + `
        <article class="cart__item" data-id=${localStorageProduct[i].productId} data-color="${localStorageProduct[i].productColor}">
            <div class="cart__item__img">
                <img src="${localStorageProduct[i].productImg}" alt="${localStorageProduct[i].textAlternatif}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${localStorageProduct[i].productName}</h2>
                    <p>${localStorageProduct[i].productDescription}</p>
                    <p>${localStorageProduct[i].productColor}</p>
                    <p>${localStorageProduct[i].productPrice}€</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Quantité</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageProduct[i].productNumber}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
        `;
    }

    // total price and total quantity sent into HTML
    const targetPrice = document.getElementById('totalPrice')
    const targetQuantity = document.getElementById('totalQuantity')
    targetPrice.innerHTML = totalCart
    targetQuantity.innerHTML = totalFullCart
};

addProductToCart();


/// Function to delete products in the cart
function deleteItemProduct() {

    // targets delete button
    const deleteButton = document.querySelectorAll('.cart__item__content__settings__delete > .deleteItem');

    // loop in localStorage addEventListener on the click to delete product
    for (let i = 0; i < localStorageProduct.length; i++) {
        deleteButton[i].addEventListener('click', (e) => {
            e.preventDefault();

            // variables to delete product via id or color
            let deleteId = localStorageProduct[i].productId;
            let deleteColor = localStorageProduct[i].productColor;

            // filters products that don't have the same id or color than the clicked element
            localStorageProduct = localStorageProduct.filter(el => el.productId !== deleteId || el.productColor !== deleteColor)

            // stringify modifications in the localStorage
            localStorage.setItem("product", JSON.stringify(localStorageProduct));

            // Pop-up to tell user product has been deleted
            alert('Cet article a bien été supprimé du panier');

            // reload page to save modifications
            location.reload();
        })
    }
}

deleteItemProduct();