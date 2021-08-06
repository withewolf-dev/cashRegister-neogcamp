const billAmt = document.querySelector("#billAmt");
const cashGiven = document.querySelector("#cashGiven");

const errorDiv = document.querySelector(".errorMsg");

const cashGivenDiv = document.querySelector(".cashGivenInput");
const changeReturnDiv = document.querySelector(".changeReturn");

const output = document.querySelector("#output");

const nextBtn = document.querySelector("#nextBtn");
const checkBtn = document.querySelector("#checkBtn");

const noOfNotes = document.querySelectorAll(".noOfNotes");

const arrayNoteAmt = [2000, 500, 100, 20, 10, 5, 1];

//if bill amt filled, display cash given input field
nextBtn.addEventListener("click", () => {
  hideError();
  if (Number(billAmt.value) > 0) {
    nextBtn.style.display = "none";
    cashGivenDiv.style.display = "block";
  } else {
    showError("Enter valid bill amount");
  }
});

//check btn clicked handler
checkBtn.addEventListener("click", () => {
  clearNoOfNotes();
  hideError();
  //error handling
  let billAmtValue = Number(billAmt.value);
  let cashGivenValue = Number(cashGiven.value);

  if (billAmtValue > 0 && cashGivenValue > 0) {
    if (!Number.isInteger(cashGivenValue)) {
      showError("Enter valid amount in cash given field");
      return;
    }
    if (billAmtValue > cashGivenValue) {
      showError("Cash is less than bill, please enter right amount");
      return;
    }
    //if input valid calculate no. of notes
    calculateNotes(billAmtValue, cashGivenValue);
  } else {
    showError("Enter valid bill amount and cash given to continue");
  }
});

//to calculate no. of notes
function calculateNotes(bill, cash) {
  let returnAmt = cash - bill;

  if (returnAmt < 1) {
    showError("No amount should be returned");
    return;
  }
  changeReturnDiv.style.display = "block";

  for (let i = 0; i < arrayNoteAmt.length; i++) {
    returnAmt = compare(returnAmt, arrayNoteAmt[i], i);
  }
}

//compare with currency and post the no. of notes on screen
function compare(remainder, noteAmt, index) {
  if (remainder >= noteAmt) {
    let notes = Math.floor(remainder / noteAmt);
    remainder = remainder - notes * noteAmt;
    noOfNotes[index].innerText = `${notes}`;
  }
  return remainder;
}

//if check button clicked without refreshing the page, clear the no of notes values on the screen
function clearNoOfNotes() {
  for (let notes of noOfNotes) {
    notes.innerText = "";
  }
}

function showError(text) {
  errorDiv.style.display = "block";
  errorDiv.innerText = text;
  changeReturnDiv.style.display = "none";
}

function hideError() {
  errorDiv.style.display = "none";
}
