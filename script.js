let heroEditBtn = document.querySelector(".hero_edit");
let heroSaveBtn = document.querySelector(".hero_save");
let inp = document.getElementById("name_input");
let heroName = document.getElementById("hero_name");
let errName = document.getElementById("error_name");
let errRoot = document.getElementById("error_root");
let rootSelect = document.querySelector(".root_select");
let heroRoot = document.querySelector(".hero_root");

/* HERO NAME AND ROOT FORM*/

//Accept button and check if forms are empty

heroSaveBtn.addEventListener("click", () => {
  // 1. if name is missing
  if (inp.value === "") {
    console.log("missing name and root");
    errName.classList.remove("hidden");
  } else if (inp.value !== "") {
    errName.classList.add("hidden");
  }
  // 2. if root is missing
  if (rootSelect.value === "") {
    console.log("missing roots");
    errRoot.classList.remove("hidden");
  } else if (rootSelect.value !== "") {
    errRoot.classList.add("hidden");
  }
  // 3. save if both ok
  if (inp.value !== "" && rootSelect.value !== "") {
    heroName.textContent = inp.value;
    heroName.classList.add("name_saved");
    inp.classList.add("hidden");
    rootSelect.classList.add("hidden");
    heroRoot.textContent = rootSelect.value;
  }
});

//Edit button
heroEditBtn.addEventListener("click", () => {
  inp.classList.remove("hidden");
  heroName.classList.remove("name_saved");
  rootSelect.classList.remove("hidden");
  heroName.textContent = "";
  heroRoot.textContent = "";
});

/* HERO STATS BASED ON CHOSEN ROOTS*/

let human;
let dwarf;
let elf;
let gnome;
let rootsData;

//async function to get stats

async function loadRoots() {
  try {
    const res = await fetch("./roots.json");
    const data = await res.json();
    console.log("inside async function", data);
    //rootsData gets all data
    rootsData = data;
  } catch (error) {
    console.log("Error loading roots");
  }
}

const acStat = document.getElementById("ac");
const strStat = document.getElementById("str");
const intStat = document.getElementById("int");
const charStat = document.getElementById("char");
const heroDesc = document.querySelector(".character__root-desc");
const heroImg = document.getElementById("root-img");
const classImg = document.getElementById("class-img");

// iife function //setting stats and hero roots description
(async () => {
  await loadRoots();

  rootSelect.addEventListener("change", () => {
    // getting values
    let selectedRoot = rootSelect.value; //value of selected option
    let selectedRootData = rootsData[selectedRoot];
    // setting values
    acStat.textContent = selectedRootData.ac;
    strStat.textContent = selectedRootData.str;
    intStat.textContent = selectedRootData.int;
    charStat.textContent = selectedRootData.char;
    heroImg.src = selectedRootData.img;
  });
})();

/* HERO CLASS */

const skillBtns = document.querySelectorAll(".skill");
const skillCards = document.querySelectorAll(".card");
const skillDesc = document.querySelector(".desc");
const skillHeader = document.querySelector(".skill__header");

let knight = [];
let sage = [];
let assasin = [];
let mage = [];

async function loadSkills() {
  try {
    const res = await fetch("./skills.json");
    const data = await res.json();
    skillsData = data;
    console.log("inside skills", skillsData);
  } catch (error) {
    console.log("Error loading skills");
  }
}
(async () => {
  await loadSkills();

  skillBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let skillName = btn.textContent.toLowerCase();
      // console.log(skillName);
      let skill = skillsData[skillName];
      // console.log(skill);
      if (skill) {
        skillDesc.textContent = skill.desc;
        skillHeader.textContent = skill.id;
        classImg.src = `/imgs/${skillName}.png`;
        skillCards.forEach((p, i) => {
          p.textContent = skill.cards[i];
        });
      }
    });
  });
})();
