/** @returns The HTML for a table row (`tr`) displaying the year and the
 * AMC 10A and 10B, which links to and sets up the test page. */
function trHTML(year, season = "") {
    return `
<tr>
  <td>${year} ${season.charAt(0).toUpperCase() + season.slice(1)}</td>
  <td><a href="./exam.html" target="_self" onclick="sessionStorage.setItem('psetid', '${year}${season}a');">AMC 10A</a></td>
  <td><a href="./exam.html" target="_self" onclick="sessionStorage.setItem('psetid', '${year}${season}b');">AMC 10B</a></td>
</tr>
`;
}

const MIN_YEAR = 2000;
const MAX_YEAR = 2023;

const psetTable = document.getElementById("pset_table");

for (var year = MAX_YEAR; year >= MIN_YEAR; --year) {
    if (year <= 2001) { // 2000 and 2001 did not split into the A and B tests
        psetTable.insertAdjacentHTML("beforeend", `
<tr>
  <td>${year}</td>
  <td colspan="2"><a href="./exam.html" target="_self" onclick="sessionStorage.setItem('psetid', '${year}');">AMC 10</a></td>
</tr>
`);
    } else if (year == 2021) { // 2021 was split into fall and spring tests
        psetTable.insertAdjacentHTML("beforeend", trHTML(year, "fall"));
        psetTable.insertAdjacentHTML("beforeend", trHTML(year, "spring"));
    } else {
        psetTable.insertAdjacentHTML("beforeend", trHTML(year));
    }
}
