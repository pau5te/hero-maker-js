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

let human = [];
let dwarf;
let elf;
let gnome = [];

//async function to get stats
async function loadRoots() {
  try {
    const res = await fetch("./roots.json");
    const rootsData = await res.json();
    console.log("inside async function", rootsData);
    human = rootsData[0].human;
    dwarf = rootsData[0].dwarf;
    elf = rootsData[0].elf;
    gnome = rootsData[0].gnome;
  } catch (error) {
    console.log("Error loading roots");
  }
}

const acStat = document.getElementById("ac");
const strStat = document.getElementById("str");
const intStat = document.getElementById("int");
const charStat = document.getElementById("char");
const heroDesc = document.querySelector(".character__root-desc");

//iife function //setting stats and hero roots description
(async () => {
  await loadRoots();
  rootSelect.addEventListener("change", () => {
    if (rootSelect.value === "elf") {
      console.log("elf root selected");
      acStat.textContent = elf.ac;
      strStat.textContent = elf.str;
      intStat.textContent = elf.int;
      charStat.textContent = elf.char;
      heroDesc.textContent = elf.card;
    } else if (rootSelect.value === "human") {
      acStat.textContent = human.ac;
      strStat.textContent = human.str;
      intStat.textContent = human.int;
      charStat.textContent = human.char;
    } else if (rootSelect.value === "dwarf") {
      acStat.textContent = dwarf.ac;
      strStat.textContent = dwarf.str;
      intStat.textContent = dwarf.int;
      charStat.textContent = dwarf.char;
    } else if (rootSelect === "gnome") {
      acStat.textContent = gnome.ac;
      strStat.textContent = gnome.str;
      intStat.textContent = gnome.int;
      charStat.textContent = gnome.char;
    }
  });
})();

/* HERO CLASS */

const skillBtns = document.querySelectorAll(".skill");
const skillCards = document.querySelectorAll(".card");
// console.log(skillCards);
const skillDesc = document.querySelector(".desc");
const skillHeader = document.querySelector(".skill__header");

let knight = [];
let sage = [];
let assasin = [];
let mage = [];

async function loadSkills() {
  try {
    const res = await fetch("./skills.json");
    const skillsData = await res.json();
    console.log("inside skills", skillsData);
    knight = skillsData[0].knight;
    sage = skillsData[0].sage;
    assasin = skillsData[0].assasin;
    mage = skillsData[0].mage;
  } catch (error) {
    console.log("Error loading skills");
  }
}
(async () => {
  await loadSkills();

  const cardsKnight = knight.cards;
  const cardsSage = sage.cards;
  const cardsAssasin = assasin.cards;
  const cardsMage = mage.cards;

  skillBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.textContent === "Knight") {
        skillDesc.textContent = knight.desc;
        skillHeader.textContent = knight.id;
        skillCards.forEach((p, i) => {
          p.textContent = cardsKnight[i];
        });
      } else if (btn.textContent === "Sage") {
        skillDesc.textContent = sage.desc;
        skillHeader.textContent = sage.id;
        skillCards.forEach((p, i) => {
          p.textContent = cardsSage[i];
        });
      } else if (btn.textContent === "Assasin") {
        skillDesc.textContent = assasin.desc;
        skillHeader.textContent = assasin.id;
        skillCards.forEach((p, i) => {
          p.textContent = cardsAssasin[i];
        });
      } else if (btn.textContent === "Mage") {
        skillDesc.textContent = mage.desc;
        skillHeader.textContent = mage.id;
        skillCards.forEach((p, i) => {
          p.textContent = cardsMage[i];
        });
      }
    });
  });
})();
