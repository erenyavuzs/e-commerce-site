let shoeList = [];

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
                            <span class="shoe_review-text">23 reviews</span>
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
                            <button class="add_button">ADD BASKET</button>
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
        filterHtml += `<li class="${
            index === 0 ? "active" : ""
        }" onclick="filterShoes(this)" data-type="${type}">${Shoe_Types[type] || type}</li>`;
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

setTimeout(() => {
    createShoeItemsHtml();
    createShoeTypesHtml();
}, 50);