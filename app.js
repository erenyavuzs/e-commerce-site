let shoeList = [];

const toggleModal = () => {
    const basketModal = document.querySelector(".basket_modal");
    basketModal.classList.toggle("active");
};

const getShoes = () => {
  fetch("products.json")
    .then((res) => res.json())
    .then((shoes) => (shoeList = shoes));
};

getShoes();

const createShoeStars = (starRate) => {
  let starRateHtml = "";
  for(let i =1; i<=5;i++){
      if(Math.round(starRate) >= i) starRateHtml += `<i class="bi bi-star-fill"></i>`;
  }

  return starRateHtml;
};

const createShoeItemsHtml = () => {
    const shoeListEl = document.querySelector(".shoe_list");
    let shoeListHtml = "";
    shoeList.forEach((shoe, index) => {
        shoeListHtml += `<div class="col-5 ${index % 2 == 0 && "offset-2"}">
        <div class="row shoe_card">
          <div class="col-6">
            <img class="img-fluid shadow" src="${shoe.imgSource}" width="250" height="250"/>
            </div>
            <div class="col-6">
              <div class="shoe_detail">
                <div>
                  <span class="shoe_name">${shoe.name}</span>
                  <br>
                  <span class="shoe_reivew-text">23 reivews</span>
                  <span class="shoe_star-rate">
                  ${createShoeStars()}
                  </span>
                </div>
                <p class="shoe_description">
                  ${shoe.description}
                </p>
                <div>
                  <span class="new_price">${shoe.price}</span>
                  ${shoe.oldPrice && `<span class="old_price">${shoe.oldPrice}</span>`}
                  <button class="add_button">ADD BASKET</button>
                </div>
              </div>
            </div>
        </div>
      </div>`;
    });

  shoeListEl.innerHTML = shoeListHtml;
};

setTimeout(() => {
  createShoeItemsHtml();
}, 100);