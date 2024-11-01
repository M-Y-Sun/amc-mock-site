const PSET_ID = sessionStorage.getItem('psetid');
console.log("Problem Set ID: " + PSET_ID);

const nextButton = document.getElementById("next_button");
const prevButton = document.getElementById("prev_button");
const timer = document.getElementById("timer");
const body = document.getElementById("problem_container");

nextButton.style.visibility = "hidden";
prevButton.style.visibility = "hidden";


// 4500 secs is 75 minutes -- USE THIS
// USE 420 SECONDS FOR TESTING
// USE 20 SECONDS FOR TLE TESTING
let time_secs = 4500;

let timer_iID;

/** @param {int} iID_ The ID of the timing interval  */
function updateTime_() {
    // after 6 minutes is done (i.e. 5 min), change format to seconds
    if (time_secs == 360) {
        clearInterval(timer_iID);
        timer_iID = setInterval(updateTime_, 1000);
    } else if (time_secs <= 1) {
        clearInterval(timer_iID);

        updateAnsChoices_();

        // submit the test
        submit_();
    }

    if (time_secs > 300) { // show 'X min' with more than 5 minutes
        time_secs -= 60;
        timer.innerHTML = `<span>${Math.floor(time_secs / 60)} min</span>`
    } else { // show 'MM:SS' with 5 minutes or less
        --time_secs;
        timer.innerHTML = `
<div>
  <span>
    ${Math.floor(time_secs / 60)}:${(time_secs % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
  </span>
</div>
`
    }
}

let prob_num;
let anschoices = Array.from("U".repeat(25));

function setProblemHTML_(pnum) {
    fetch(`../lib/problems/${PSET_ID}/p${pnum}.html`)
        .then(response => response.text())
        .then(text => {
            body.innerHTML = `
${text}

<h4>Select an Answer Choice:</h4>
<form>
  <input type="radio" id="choice_a" name="anschoices" value="A" ${anschoices[pnum - 1] == "A" ? "checked" : ""} />
  <label for="a">A</label>
  <br />
  <input type="radio" id="choice_b" name="anschoices" value="B" ${anschoices[pnum - 1] == "B" ? "checked" : ""} />
  <label for="a">B</label>
  <br />
  <input type="radio" id="choice_c" name="anschoices" value="C" ${anschoices[pnum - 1] == "C" ? "checked" : ""} />
  <label for="a">C</label>
  <br />
  <input type="radio" id="choice_d" name="anschoices" value="D" ${anschoices[pnum - 1] == "D" ? "checked" : ""} />
  <label for="a">D</label>
  <br />
  <input type="radio" id="choice_e" name="anschoices" value="E" ${anschoices[pnum - 1] == "E" ? "checked" : ""} />
  <label for="a">E</label>
</form>
`
        });
}

function updateAnsChoices_() {
    if (document.getElementById("choice_a").checked)
        anschoices[prob_num - 1] = "A";
    else if (document.getElementById("choice_b").checked)
        anschoices[prob_num - 1] = "B";
    else if (document.getElementById("choice_c").checked)
        anschoices[prob_num - 1] = "C";
    else if (document.getElementById("choice_d").checked)
        anschoices[prob_num - 1] = "D";
    else if (document.getElementById("choice_e").checked)
        anschoices[prob_num - 1] = "E";

}

function startExam() {
    setProblemHTML_(1);
    timer.innerHTML = `<span>${Math.floor(time_secs / 60)} min</span>`

    // 60000 ms is 1 min
    // USE 1000 FOR TLE TESTING
    timer_iID = setInterval(updateTime_, 60000);

    // show the next button
    nextButton.style.visibility = "visible";

    prob_num = 1;
}

/** Submits the exam */
function submit_() {
    nextButton.style.visibility = "hidden";
    prevButton.style.visibility = "hidden";
    timer.style.visibility = "hidden";

    // calculate score and other stats
    let answers = [];
    let score = 0;
    let unanswered = 0;
    let wrong = 0;
    let correct = 0;

    fetch(`../lib/solutions/${PSET_ID}.txt`)
        .then(response => response.text())
        .then(text => {
            answers = text.split(',');

            console.log("User answers: " + anschoices);
            console.log("Set answers: " + answers);

            for (var i = 0; i < 25; ++i) {
                if (anschoices[i] == answers[i]) {
                    score += 6;
                    ++correct;
                } else if (anschoices[i] == "U") {
                    score += 1.5;
                    ++unanswered;
                } else {
                    ++wrong;
                }
            }

            body.innerHTML = `
<h1 align="center">Results</h1>
<h2 align="center">Final Score: ${score}</h2>
<table class="center">
  <tr>
    <td>Problems Correct: </td>
    <td><b>${correct}</b></td>
  </tr>
  <tr>
    <td>Problems Unanswered: </td>
    <td><b>${unanswered}</b></td>
  </tr>
  <tr>
    <td>Problems Incorrect: </td>
    <td><b>${wrong}</b></td>
  </tr>
</table>
<h2 align="center">Answers</h2>
<table id="tbl_ans" class="center"></table>

<div class="center" style="margin-top: 50px; margin-bottom: 100px">
  <!-- <a href="./home.html" class="button" style="display: block">Return to Main Site</a> -->
  <button
    class="button"
    onclick="
      setTimeout((function() {
        location.href = './home.html';
      }), 200);
    "
  >Return to Main Site</button>
</div>
`

            const tbl_ans = document.getElementById("tbl_ans");
            for (var i = 0; i < 25; ++i) {
                tbl_ans.insertAdjacentHTML("beforeend", `
<tr>
  <td>Problem ${i + 1}: </td>
  <td><b>${answers[i]}</b></td>
  <td>(Your answer: ${anschoices[i]})</td>
</tr>
`)
            }
        });
}

function next() {
    updateAnsChoices_();

    if (prob_num < 24) {
        nextButton.style.visibility = "visible";
        prevButton.style.visibility = "visible";
        setProblemHTML_(++prob_num);
    } else if (prob_num == 24) {
        // change the next button to a submit button if at question 25
        nextButton.firstElementChild.innerHTML = "SUBMIT";
        setProblemHTML_(++prob_num);
    } else {
        // submit the exam
        submit_();
    }
}

function prev() {
    updateAnsChoices_();

    if (prob_num > 2) {
        prevButton.style.visibility = "visible";
        nextButton.style.visibility = "visible";
    } else {
        prevButton.style.visibility = "hidden";
    }

    setProblemHTML_(--prob_num);
}
