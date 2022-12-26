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

        // totalCart (valeur 0) is multiplied by productQuantity and productPrice to get total price
        totalCart += localStorageProduct[i].productQuantity * localStorageProduct[i].productPrice

        // price calculation in the cart
        totalFullCart += parseInt(localStorageProduct[i].productQuantity, 10)

        // we send everything in the HTML with innerHTML method
        fullCart = getCartItem.innerHTML = fullCart + `
        <article class="cart__item" data-id=${localStorageProduct[i].productId} data-color="${localStorageProduct[i].productColor}">
            <div class="cart__item__img">
                <img src="${localStorageProduct[i].productImg}" alt="${localStorageProduct[i].alternativeTxt}">
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
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageProduct[i].productQuantity}">
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


/// Function to change quantity in the cart
function changeQty() {

    // "targetQty" targets the input ".itemQuantity" via "querySelectorAll" that allows to select all the inputs
    const targetQty = document.querySelectorAll('.itemQuantity')

    // Loop to check for any modification in the input + updates the cart if there are modifications
    for (let i = 0; i < targetQty.length; i++) {
        targetQty[i].addEventListener('input', function () {

            // changeQty gets the input's value
            let changeQty = targetQty[i].value;

            // input's value sent to localStorage
            localStorageProduct[i].productQuantity = changeQty;

            // changes applied in the localStorage
            localStorage.setItem("product", JSON.stringify(localStorageProduct));

            // reloads the page to apply the modifications
            location.reload();
        });
    };
};

changeQty();


////////// FORM ///////////


// Regex to confirm form
const namesRegex = /^[a-zA-Z-éèà]*$/;
const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const addressRegex = /^[A-Za-z0-9\s]{5,50}$/;
const cityRegex = /^[A-Za-z\s]{5,50}$/

// submitForm sends form
function submitForm(e) {

    // "e.preventDefault();" prevents default behaviour
    e.preventDefault();

    // variable to check if user filled the form correctly
    let check = true;

    // function checkInput checks regex, if incorrect input = error message
    function checkInput() {

        // targets needed information to fill the form
        const prenom = document.getElementById('firstName');
        const prenomErreur = document.getElementById('firstNameErrorMsg');
        const nom = document.getElementById('lastName');
        const nomErreur = document.getElementById('lastNameErrorMsg');
        const adresse = document.getElementById('address');
        const adresseErreur = document.getElementById('addressErrorMsg');
        const ville = document.getElementById('city');
        const villeErreur = document.getElementById('cityErrorMsg')
        const mail = document.getElementById('email');
        const mailErreur = document.getElementById('emailErrorMsg')

        const prenomValue = prenom.value.trim();
        const nomValue = nom.value.trim();
        const adresseValue = adresse.value.trim();
        const villeValue = ville.value.trim();
        const mailValue = mail.value.trim();

        // On applique les regex via .match et des conditions if / else.
        if (prenomValue.match(namesRegex)) {  
            prenomErreur.innerText = ""
        } else {
            check = false;
            prenomErreur.innerText = "Le prénom ne doit pas contenir ni de chiffre ni de caractère spécial";
        }

        if (nomValue.match(namesRegex)) {
            nomErreur.innerText = ""
        } else {
            check = false;
            nomErreur.innerText = "Le nom ne doit pas contenir ni de chiffre ni de caractère spécial"
        }

        if (mailValue.match(emailRegex)) {
            mailErreur.innerText = "";
        } else {
            check = false;
            mailErreur.innerText = "Veuillez entrer une adresse mail valide."
        }

        if (adresseValue.match(addressRegex)) {
            adresseErreur.innerText = "";
        } else {
            check = false;
            adresseErreur.innerText = "Veuillez entrer une adresse valide."
        }

        if (villeValue.match(cityRegex)) {
            villeErreur.innerText = "";
        } else {
            check = false;
            villeErreur.innerText = "Veuillez entrer un nom de ville correct."
        }
    }

    checkInput();


/// Function "postApi" to check if "check = true" = sends the form
    function postApi() {
        if (check === true) {

            if (localStorageProduct.length === 0) {
                alert("Please select a product")
                return
            }

            // const body gets "resquestBody()"'s table defined a bit lower
            const body = requestBody();

            // Fetch API to POST data to the server
            fetch("http://localhost:3000/api/products/order", {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                }
            })

                .then((res) => res.json())
                .then((data) => {
                    const orderId = data.orderId

                    // Sends us to Confirmation page if all inputs are correctly filled
                    window.location.href = "../html/confirmation.html" + "?orderId=" + orderId
                })

                // catch error
                .catch((err) => alert("Erreur d'envoi du formulaire. Veuillez réessayer plus tard."))
        }
    }

    postApi();
    
    // requestBody gets value from the inputs
    function requestBody() {
        const firstNameInput = document.querySelector('#firstName')
        const firstName = firstNameInput.value

        const lastNameInput = document.querySelector('#lastName')
        const lastName = lastNameInput.value

        const addressInput = document.querySelector('#address')
        const address = addressInput.value

        const cityInput = document.querySelector('#city')
        const city = cityInput.value

        const emailInput = document.querySelector('#email')
        const email = emailInput.value

        // Loop to get productId
        let productId = [];
        for (let i = 0; i < localStorageProduct.length; i++) {
            productId.push(localStorageProduct[i].productId)
        }

        // Objet "contact" where we put inputs' values + Object "products" with loop's productId
        const body = {
            contact: {
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                email: email,
            },
            products: productId,
        }
        return body
    }
}

// call function "submitBtn" to confirm cart + contact form
submitBtn.addEventListener("click", (e) => submitForm(e))
