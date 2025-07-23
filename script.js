let heroEditBtn = document.querySelector(".hero_edit");
let heroSaveBtn = document.querySelector(".hero_save");
let inp = document.getElementById("name_input");
let heroName = document.getElementById("hero_name");
let errName = document.getElementById("error_name");
let errRoot = document.getElementById("error_root");

let rootSelect = document.querySelector(".root_select");
let heroRoot = document.querySelector(".hero_root");

// console.log(rootSelect.value);
/* HERO NAME AND ROOT FORM*/

//Save button
// heroSaveBtn.addEventListener("click", () => {
//   if (inp.value === "") {
//     console.log("missing name");
//     errName.classList.remove("hidden");
//   } else if ((rootSelect.value = "")) {
//     console.log("no root selected");
//   } else if (inp.value !== "") {
//     heroName.textContent = inp.value;
//     heroName.classList.add("name_saved");
//     inp.classList.add("hidden");
//     errName.classList.add("hidden");
//     errRoot.classList.add("hidden");
//     rootSelect.classList.add("hidden");
//     heroRoot.textContent = rootSelect.value;
//   }
// });

heroSaveBtn.addEventListener("click", () => {
  //1. if both are missing 2. if name missing 3. if root missing 4. all ok
  if (inp.value === "" && rootSelect.value === "") {
    console.log("missing name and root");
    errName.classList.remove("hidden");
    errRoot.classList.remove("hidden");
  } else if (inp.value === "") {
    console.log("missing name");
    errName.classList.remove("hidden");
  } else if (rootSelect.value === "") {
    console.log("missing roots");
    errRoot.classList.remove("hidden");
  } else if (inp.value !== "" && rootSelect.value !== "") {
    heroName.textContent = inp.value;
    heroName.classList.add("name_saved");
    inp.classList.add("hidden");
    errName.classList.add("hidden");
    errRoot.classList.add("hidden");
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

//iife function //setting stats
(async () => {
  await loadRoots();
  rootSelect.addEventListener("change", () => {
    if (rootSelect.value === "elf") {
      console.log("elf root selected");
      acStat.textContent = elf.ac;
      strStat.textContent = elf.str;
      intStat.textContent = elf.int;
      charStat.textContent = elf.char;
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
