let shoeList = [];
let basketList = [];

const toggleModal = () => {
    const basketModal = document.querySelector(".basket_modal");
    basketModal.classList.toggle("active");
};

const getShoes = () => {
    fetch("products.json")
        .then((res) => res.json())
        .then((shoes) => (shoeList = shoes))
        .then(() => {
            createShoeItemsHtml();
            createShoeTypesHtml();
        });
};

getShoes();

const createShoeStars = (starRate) => {
    let starRateHtml = "";
    for (let i = 1; i <= 5; i++) {
        if (Math.round(starRate) >= i) starRateHtml += `<i class="bi bi-star-fill"></i>`;
    }
    return starRateHtml;
};

const createShoeItemsHtml = (shoes = shoeList) => {
    const shoeListEl = document.querySelector(".shoe_list");
    const basketCountEl = document.querySelector(".basket_count").innerHTML =
        basketList.length > 0 ? basketList.length : null;
    let shoeListHtml = "";

    shoes.forEach((shoe, index) => {
        shoeListHtml += `<div class="col-5 ${index % 2 === 0 ? "offset-2" : ""}">
            <div class="row shoe_card">
                <div class="col-6">
                    <img class="img-fluid shadow" src="${shoe.imgSource}" width="250" height="250" />
                </div>
                <div class="col-6">
                    <div class="shoe_detail">
                        <div>
                            <span class="shoe_name">${shoe.name}</span>
                            <br>
                            <span class="shoe_reviewCount">${shoe.reviewCount} reviews</span>
                            <span class="shoe_star-rate">
                                ${createShoeStars(shoe.starRate)}
                            </span>
                        </div>
                        <p class="shoe_description">
                            ${shoe.description}
                        </p>
                        <div>
                            <span class="new_price">${shoe.price}</span>
                            ${
                                shoe.oldPrice ?
                                `<span class="old_price">${shoe.oldPrice}</span>` : ""
                            }
                            <button class="add_button" onclick="addShoeToBasket(${shoe.id})">ADD BASKET</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });

    shoeListEl.innerHTML = shoeListHtml;
};

const Shoe_Types = {
    ALL: "All",
    SPORT: "Sport",
    BOOT: "Boot",
    SNEAKER: "Sneaker",
    CLASSIC: "Classic"
};

const createShoeTypesHtml = () => {
    const filterEl = document.querySelector(".filter");
    let filterHtml = "";
    let filterTypes = ["ALL"];

    shoeList.forEach(shoe => {
        if (filterTypes.indexOf(shoe.type) === -1)
            filterTypes.push(shoe.type);
    });

    filterTypes.forEach((type, index) => {
        filterHtml += `<li class="${index === 0 ? "active" : ""}" onclick="filterShoes(this)" data-type="${type}">${Shoe_Types[type] || type}</li>`;
    });

    filterEl.innerHTML = filterHtml;
};

const filterShoes = (filterEl) => {
    document.querySelector(".filter .active").classList.remove("active");
    filterEl.classList.add("active");
    let shoeType = filterEl.dataset.type;
    let filteredShoes;

    if (shoeType !== "ALL") {
        filteredShoes = shoeList.filter((shoe) => shoe.type === shoeType);
    } else {
        filteredShoes = [...shoeList];
    }

    createShoeItemsHtml(filteredShoes);
};

const listBasketItems = () => {
    const basketListEl = document.querySelector(".basket_list");
    const basketCountEl = document.querySelector(".basket_count");
    basketCountEl.innerHTML = basketList.length > 0 ? basketList.length : null;
    const totalTextEl = document.querySelector(".total_text");
    
    let basketListHtml = "";
    let totalText = 0;
    basketList.forEach(item => {
      totalText += parseFloat(item.product.price.replace("$", "")) * item.quantity;
      basketListHtml += `<li class="basket_item">
        <img src="${item.product.imgSource}" width="100" height="100"/>
        <div class="basket_item_info">
          <h3 class="basket_shoe_name">${item.product.name}</h3>
          <span class="basket_shoe_price">${item.product.price}</span><br>
          <span class="basket_shoe_remove" onclick="removeFromBasket(${item.product.id})">remove</span>
        </div>
        <div class="shoe_count">
          <span class="decrease" onclick="decreaseQuantity(${item.product.id})">-</span>
          <span class="">${item.quantity}</span>
          <span class="increase" onclick="increaseQuantity(${item.product.id})">+</span>
        </div>
      </li>`;
    });

    basketListEl.innerHTML = basketListHtml;
    totalTextEl.innerHTML = 
      totalText > 0 ? "Total : " + totalText.toFixed(2) + "$" : null;
};

const addShoeToBasket = (shoeId) => {
  let findedShoe = shoeList.find((shoe) => shoe.id == shoeId);
  if (findedShoe) {
    const basketAlreadyIndex = basketList.findIndex(
      (basket) => basket.product.id == shoeId
    );
    if (basketAlreadyIndex == -1) {
      let addedItem = { quantity: 1, product: findedShoe };
      basketList.push(addedItem);
    } else {
      basketList[basketAlreadyIndex].quantity += 1;
    }
    listBasketItems();
  }
};

const removeFromBasket = (shoeId) => {
    const basketItemIndex = basketList.findIndex((item) => item.product.id === shoeId);
    if (basketItemIndex !== -1) {
        basketList.splice(basketItemIndex, 1);
        listBasketItems();
    }
};

const decreaseQuantity = (shoeId) => {
    const basketItem = basketList.find((item) => item.product.id === shoeId);
    if (basketItem.quantity > 1) {
        basketItem.quantity -= 1;
        listBasketItems();
    }
};

const increaseQuantity = (shoeId) => {
    const basketItem = basketList.find((item) => item.product.id === shoeId);
    if (basketItem.quantity < parseInt(basketItem.product.stock)) {
        basketItem.quantity += 1;
        listBasketItems();
    }
};

setTimeout(() => {
    createShoeItemsHtml();
    createShoeTypesHtml();
}, 50);