const MIN_YEAR = 2000;
const MAX_YEAR = 2023;

// sorted latest to earliest
const sortedCutoffScores = [
    103.5,
    105,
    93,
    94.5,
    96,
    96,
    103.5,
    102,
    103.5,
    102,
    103.5,
    108,
    111,
    108,
    112.5,
    120,
    110,
    110,
    106.5,
    120,
    120,
    120,
    108,
    120,
    115.5,
    120,
    117,
    117,
    118.5,
    118.5,
    120,
    120,
    117,
    120,
    117,
    115.5,
    120,
    120,
    120,
    120,
    110,
    120,
    119,
    121,
    115,
    118,
    116,
    110
];

const container = document.getElementById("cutoff_ansichart");

const BAR_SHIFT = 90;

var i = 0;
var testLetter = 'A';

for (var year = MAX_YEAR; year >= MIN_YEAR; ++i) {
    if (year <= 2001) { // 2000 and 2001 did not split into the A and B tests
        container.insertAdjacentHTML("beforeend", `
        <tr>
          <td><b>${year} AMC 10:</b></td>
          <td>${sortedCutoffScores[i]}</td>
          <td>${" |".repeat(sortedCutoffScores[i] - BAR_SHIFT)}</td>
        </tr>
        `);

        --year;
    } else if (year == 2021) { // 2021 was split into fall and spring tests
        container.insertAdjacentHTML("beforeend", `
        <tr>
          <td><b>${year} Fall 10A:</b></td>
          <td>${sortedCutoffScores[i]}</td>
          <td>${" |".repeat(sortedCutoffScores[i++] - BAR_SHIFT)}</td>
        </tr>
        `);

        container.insertAdjacentHTML("beforeend", `
        <tr>
          <td><b>${year} Fall 10B:</b></td>
          <td>${sortedCutoffScores[i]}</td>
          <td>${" |".repeat(sortedCutoffScores[i++] - BAR_SHIFT)}</td>
        </tr>
        `);

        container.insertAdjacentHTML("beforeend", `
        <tr>
          <td><b>${year} Spring 10A:</b></td>
          <td>${sortedCutoffScores[i]}</td>
          <td>${" |".repeat(sortedCutoffScores[i++] - BAR_SHIFT)}</td>
        </tr>
        `);

        container.insertAdjacentHTML("beforeend", `
        <tr>
          <td><b>${year} Spring 10B:</b></td>
          <td>${sortedCutoffScores[i]}</td>
          <td>${" |".repeat(sortedCutoffScores[i] - BAR_SHIFT)}</td>
        </tr>
        `);

        // testLetter is A and i is ready to be incremented

        --year;
    } else {
        container.insertAdjacentHTML("beforeend", `
        <tr>
          <td><b>${year} 10${testLetter}:</b></td>
          <td>${sortedCutoffScores[i]}</td>
          <td>${" |".repeat(sortedCutoffScores[i] - BAR_SHIFT)}</td>
        </tr>
        `);

        if (testLetter == 'A') {
            testLetter = 'B';
        } else {
            testLetter = 'A';
            --year;
        }
    }
}
