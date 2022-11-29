// "showOrder" displays order confirmation + order number
showOrderId = () => {

    // get orderId from the url
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const orderId = urlParams.get("orderId")

    // displays the url into "targetOrderId"
    const targetOrderId = document.querySelector('#orderId')
    targetOrderId.textContent = `${orderId}`
}

showOrderId();


// Function to delete products in the localStorage
deleteLocalStorage = () => {
    const targetLocalStorage = window.localStorage;
    targetLocalStorage.clear();
}

deleteLocalStorage();