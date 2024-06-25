//global vars for holding operators and numbers
let operator = undefined;
let num1 = 0;
let num2 = undefined;
let evaluate = undefined;

//ALL QUERY SELECTORS

//query for selecting all number btns
const numBtns = document.querySelectorAll(".num-btn");
//query for the calculator display
const calcDisplay = document.querySelector(".calc-display");
//query for the operator btns
const opBtns = document.querySelectorAll(".op-btn");
//query for the equals btn
const equalBtn = document.querySelector(".equals-btn");
//query for AC btn
const clearBtn = document.querySelector(".ac-btn");
//query for +/- btn
const posNegBtn = document.querySelector(".negPos-btn");


//function for handling click of the AC button
const handleClear = (e) => {
    //reset to initialisation
    operator = undefined;
    num1 = 0;
    num2 = undefined;
    evaluate = undefined;
    //remove all toggles
    opBtns.forEach(btn => {
        btn.classList.remove("toggled");
    })
    calcDisplay.textContent = num1;
}

//function for handling click of a number button
const handleNumClick = (e) => {
    //listen for whether an operator btn is toggled or not
    //if toggled we want to concat the number to num2 
    //if not toggled we want to concat the number to num1
    if (operator === undefined) {
        //first time initialisation
        if (num1 === 0 || num1 === '0') {
            console.log(typeof(e.target.value));
            num1 = e.target.value;
        }
        else {
            num1 = num1 + e.target.value; 
        }
        //update the calculator display after each num btn press
        calcDisplay.textContent = num1;
    }
    else {
        if (num2 === undefined || num2 === '0') {
            num2 = e.target.value;
        }
        else {
            num2 = num2 + e.target.value
        }
        calcDisplay.textContent = num2;   
    }
    
}

const handleOpClick = (e) => {
    //untoggle previous toggles on other operators to ensure only one operator is toggled at the same instance
    opBtns.forEach(btn => {
        btn.classList.remove("toggled");
    })
    e.target.classList.toggle("toggled");
    
    //eval the operation of num1 and num2 if user wants to keep adding on operations and a second number has been inputed
    if (operator !== undefined) {
        if (num2 !== undefined) {
            //eval the current stored operation
            evaluate = operate(operator, num1, num2);
            //display the output
            calcDisplay.textContent = evaluate;
            //num1 is now the eval value
            num1 = evaluate.toString(); 
            //update operator to new operator selected
            num2 = undefined;
            evaluate = undefined;
            operator = e.target.value;
        }
        //if this is after initialisation or after an equal eval then perform the operation on own number
        else {
            evaluate = operate(operator, num1, num1);
            calcDisplay.textContent = evaluate;
            num1 = evaluate.toString();
            num2 = undefined;
            evaluate = undefined;
            operator = e.target.value;
        }
    }
    operator = e.target.value;
}

const handleEqualClick = (e) => {
    if (num2 !== undefined && operator !== undefined) {
        evaluate = operate(operator, num1, num2);
        calcDisplay.textContent = evaluate;
        num1 = evaluate;
        num2 = undefined;
        evaluate = undefined;
        //remove toggled class for each of the buttons
        opBtns.forEach(btn => {
            btn.classList.remove("toggled");
        })
        operator = undefined;
    }
}
    

//sum function
const sum = (num1, num2) => {
    return parseInt(num1) + parseInt(num2);
}

//subtract function 
const subtract = (num1, num2) => {
    return parseInt(num1) - parseInt(num2);
}

//multiply function
const multiply = (num1, num2) => {
    return parseInt(num1) * parseInt(num2);
}

//divide function
const divide = (num1, num2) => {
    if (parseInt(num2) === 0) {
        return `Nice Try`;
    }
    else {
        return parseInt(num1) / parseInt(num2);
    }
    
}

//operate function
const operate = (operator, num1, num2) => {
    switch (operator) {
        case "plus":
            console.log(`This is a addition operation`);
            return sum(num1, num2);
        case "minus":
            console.log(`This is a subtraction operation`);
            return subtract(num1, num2);
        case "divide":
            console.log(`This is a division operation`);
            return divide(num1, num2);
        case "multiply":
            console.log(`This is a multiplication operation`);
            return multiply(num1, num2);
    }   
}

//add event listener for all number based buttons 
numBtns.forEach(btn => {
    
    btn.addEventListener("click", handleNumClick);
});

//add event listener for all operator based buttons 
opBtns.forEach(btn => {
    btn.addEventListener("click", handleOpClick);
})

//add event listener for the equals button
equalBtn.addEventListener("click", handleEqualClick);

//add event listener for AC button
clearBtn.addEventListener("click", handleClear);



