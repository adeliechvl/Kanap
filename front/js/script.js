function request() {
    fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
    }

    fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then