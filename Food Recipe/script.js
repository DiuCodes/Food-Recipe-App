"use strict";
const cards = document.querySelector(".cards");
const card = document.querySelector(".card");
const cardData = document.querySelector(".card-data");
const searchInput = document.querySelector(".search");
const searchBtn = document.querySelector(".search-icon");
const InstructionSteps = document.querySelector(".steps");
const instrucImg = document.querySelector(".instruc-img");
const instruction = document.querySelector(".instruction");
const exit = document.querySelector(".exit");
const overlay = document.querySelector(".overlay");
const watchBtn = document.querySelector(".watch-btn");
const loader = document.querySelector(".loader");

let getRecipeBtn;

// cards.innerHTML = "";
const fetchMeals = async function (meal) {
  try {
    const request = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
    );

    if (!request.ok) throw new Error("Something went wrong, check your input");
    if (request.ok) loader.classList.add("loader-hidden");
    const data = await request.json();
    console.log(data.meals);

    let html = "";
    data.meals.forEach((meal, index) => {
      html += `
    <div class="card">
    <img src="${meal.strMealThumb}" class="img" />
    <p class="meal-title">${meal.strMeal}</p>
    <button data-tab = ${index} class="get-recipe">Get recipe</button>
  </div>
  `;
    });
    cards.innerHTML = html;

    getRecipeBtn = document.querySelectorAll(".get-recipe");
    // if (getBtns) {
    getRecipeBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        overlay.classList.remove("hide");
        console.log(btn);
        console.log(data.meals[btn.dataset.tab]);
        const reduceInstWords =
          data.meals[btn.dataset.tab].strInstructions.split(" ");

        if (reduceInstWords.length > 120 && reduceInstWords.length <= 300) {
          InstructionSteps.textContent = reduceInstWords.slice(0, 40).join(" ");
        }
        if (reduceInstWords.length > 350 && reduceInstWords.length < 600) {
          InstructionSteps.textContent = reduceInstWords.slice(0, 40).join(" ");
        }

        const dt = data.meals[btn.dataset.tab].strInstructions.split(" ");
        console.log(dt.length);

        instrucImg.src = data.meals[btn.dataset.tab].strMealThumb;
        watchBtn.href = data.meals[btn.dataset.tab].strYoutube;
        instruction.classList.remove("hide");
      });
    });
    // }
  } catch (err) {
    alert(`Somthing went wrong ${err.message}`);
  }
};

let getRbtn;
searchBtn.addEventListener("click", function () {
  console.log("yes");
  if (searchInput.value) fetchMeals(searchInput.value);
  searchInput.value = "";
  // document.body.removeChild("loader");
  loader.classList.remove("loader-hidden");
});

exit.addEventListener("click", function () {
  console.log("yes");
  instruction.classList.add("hide");
  overlay.classList.add("hide");
});

overlay.addEventListener("click", function () {
  instruction.classList.add("hide");
  overlay.classList.add("hide");
});

window.addEventListener("load", function () {
  loader.classList.add("loader-hidden");

  loader.addEventListener("transitionend", function () {
    document.body.removeChild("loader");
  });
});
