let shoeList = [];

const toggleModal = () => {
    const basketModal = document.querySelector(".basket_modal");
    basketModal.classList.toggle("active");
};

const getShoes = () => {
    fetch("./products.json")
      .then((res) => res.json())
      .then((shoes) => (shoeList = shoes));
};