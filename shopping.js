let cartCount = 0;

function bodyLoad() {
    loadCategories();
    loadProducts();
    loadCartItems();
}

function loadCategories() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(data => {
            data.unshift("all");
            data.forEach(item => {
                const opt = document.createElement("option");
                opt.value = item;
                opt.innerText = item;
                document.getElementById("listCategory").appendChild(opt);
            });
        });
}

function loadProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            const main = document.querySelector("main");
            main.innerHTML = '';
            data.forEach(product => {
                const div = document.createElement("div");
                div.className = "card m-2 p-2";
                div.style.width = "180px";
                div.innerHTML = `
                    <img src="${product.image}" height="150" class="card-img-top">
                    <div class="card-header" style="height:160px">
                        <p>${product.title}</p>    
                    </div>
                    <div class="card-body">
                        <dl>
                            <dt>Price</dt>
                            <dd>${product.price}</dd>
                            <dt>Rating</dt>
                            <dd><span class="bi bi-star-fill text-success"></span>${product.rating.rate}</dd>
                        </dl>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-danger" onclick="addClick(${product.id})">Add to Cart</button>
                    </div>
                `;
                main.appendChild(div);
            });
        });
}

function categoryChange() {
    const optVal = document.getElementById("listCategory").value;
    if (optVal === "all") {
        loadProducts();
        return;
    }

    fetch(`https://fakestoreapi.com/products/category/${optVal}`)
        .then(response => response.json())
        .then(data => {
            const main = document.querySelector("main");
            main.innerHTML = '';
            data.forEach(product => {
                const div = document.createElement("div");
                div.className = "card m-2 p-2";
                div.style.width = "180px";
                div.innerHTML = `
                    <img src="${product.image}" height="150" class="card-img-top">
                    <div class="card-header" style="height:160px">
                        <p>${product.title}</p>    
                    </div>
                    <div class="card-body">
                        <dl>
                            <dt>Price</dt>
                            <dd>${product.price}</dd>
                            <dt>Rating</dt>
                            <dd><span class="bi bi-star-fill text-success"></span>${product.rating.rate}</dd>
                        </dl>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-danger" onclick="addClick(${product.id})">Add to Cart</button>
                    </div>
                `;
                main.appendChild(div);
            });
        });
}

function addClick(id) {
    cartCount += 1;
    document.getElementById("count").innerText = "[ " + cartCount + " ]";

    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            const item = data.find(item => item.id === id);
            if (item) {
                const mb = document.querySelector(".modal-body");
                const div1 = document.createElement("div");
                div1.className = "card col-sm-6 mx-auto m-lg-2";
                div1.style.marginBottom = "20px";

                const img1 = document.createElement("img");
                img1.src = item.image;
                img1.className = "card-img-top";
                img1.alt = "shopping";
                img1.height = "200";

                const cardBody = document.createElement("div");
                cardBody.className = "card-body";

                const p = document.createElement("p");
                p.className = "card-text text-center";
                p.innerText = item.title;

                const btn=document.createElement("button");
                btn.innerText="Remove";
                btn.className="btn btn-danger";
                btn.onclick=function() {
                    div1.remove();
                    cartCount-=1;
                    document.getElementById("count").innerText="[ "+cartCount+" ]";
                }

                cardBody.appendChild(p);
                cardBody.appendChild(btn);
                div1.appendChild(img1);
                div1.appendChild(cardBody);
                mb.appendChild(div1);
            }
        });
}

function loadCartItems() {
    const body = document.querySelector("body");
    const existingModal = document.getElementById("addToCart");
    if (!existingModal) {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="modal fade" id="addToCart">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3> Your Selected Items </h3>
                            <button class="btn btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-success" data-bs-dismiss="modal">Save</button>
                            <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        body.appendChild(div);
    }
}