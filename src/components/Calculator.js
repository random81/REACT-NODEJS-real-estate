import React from 'react';
import {
  Form, Label, Input,
} from 'reactstrap';

function Calculator() {
  /*
    A script to calculate monthly payments based on loan and interest
    */
  let roundAns = 0;
  const calcAmt = (e) => {
    e.preventDefault();
    let errorDetector = false;
    const P = document.getElementById('amount').value;
    const numTest = P / 1;
    const strunNum = `${numTest}`;
    const boolValue = /(\d[.]\d)/.test(strunNum);// detects
    const nonDigit = /[\D]/.test(strunNum);// detects
    const interest = document.getElementById('interest').value;
    const numInter = interest * 1;
    const numberOfMonths = document.getElementById('months').value;
    const numTest2 = numberOfMonths / 1;
    const strunNum2 = `${numTest2}`;
    const boolValue2 = /(\d[.]\d)/.test(strunNum2);// detects
    const nonDigit2 = /[\D]/.test(strunNum2);// detects
    function errorLoan() {
      errorDetector = true;
      document.getElementById('result').value = 'you must enter a positive whole number';
    }
    function errorInterest() {
      errorDetector = true;
      document.getElementById('result').value = 'You must enter a number greater than or equal to 1';
    }
    function errorPayment() {
      errorDetector = true;
      document.getElementById('result').value = 'You must enter a positive whole number';
    }
    if ((boolValue2) || (nonDigit2) || (numTest2 <= 0)) {
      errorPayment();
    }
    if ((boolValue) || (nonDigit) || (numTest <= 0)) {
      errorLoan();
    }
    if ((numInter < 0.1) || (numInter.toString() === 'NaN')) {
      errorInterest();
    }
    if (!errorDetector) {
      const R = interest / (100 * 12);
      const exp = (1 + R) ** numberOfMonths;
      const answer = P * R * exp / (exp - 1);
      roundAns = answer.toFixed(2);
      document.getElementById('result').value = `your monthly payment is ${roundAns}`;
    }
  };
  return (
    <div id="calculator">
      <fieldset>
        <legend>Loan Calculator</legend>
        <Form onSubmit={calcAmt} id="calculator">
          <div id="fields">
            <Label>
              Loan Amount:
            </Label>
            <Input type="text" required size="25" id="amount" />
            <Label>
              Interest Per Year:
            </Label>
            <Input type="text" required size="25" id="interest" />
            <Label>
              Number of Months To Pay:
            </Label>
            <Input type="text" required size="25" id="months" />
          </div>
          <Input type="submit" value="submit" />
          <Label>
            Result:
          </Label>
          <Input type="text" size="25" id="result" />
        </Form>
      </fieldset>
      <div id="answer">
        <p />
      </div>
    </div>
  );
}
export default Calculator;
