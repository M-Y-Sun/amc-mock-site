const pages = [
    ["Home", "home.html"],
    ["Problems", "problems.html"],
    ["Contest Rules", "rules.html"],
    ["Historical Cutoffs", "cutoffs.html"]
]

const navbar = document.getElementById("navbar");

const curPage = window.location.pathname.split("/").pop();

for (var i = 0; i < pages.length; ++i) {
    if (curPage == pages[i][1]) {
        navbar.insertAdjacentHTML("beforeend", `
<div style="width: ${100 / pages.length}%">
  <a href="${pages[i][1]}" class="current">${pages[i][0]}</a>
</div>`)
    } else {
        navbar.insertAdjacentHTML("beforeend", `
<div style="width: ${100 / pages.length}%">
  <a href="${pages[i][1]}">${pages[i][0]}</a>
</div>`)
    }
}
