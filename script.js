function add(op1, op2){
  return op1 + op2
}

function subtract(op1, op2){
  return op1 - op2
}

function multiply(op1, op2){
  return op1 * op2
}

function divide(op1, op2){
  return op2 != 0 ? op1 / op2 : "ERROR"
}

function operate(op1, op2, op){
  switch(op){
    case '+': return add(op1, op2)
    case '-': return subtract(op1, op2)
    case '*': return multiply(op1, op2)
    case '/': return divide(op1, op2)
  }
}

let operand1 = null
let operand2 = null
let operator = null

const allButtons = document.querySelectorAll("button")

const display = document.querySelector("#display")
const sideDisplay = document.querySelector('#side-display')

const numberPad = document.querySelectorAll(".number")
const operations = document.querySelector("#operations")

const decimal = document.querySelector("#decimal")
const equal = document.querySelector("#equal")
const backspace = document.querySelector("#backspace")
const clear = document.querySelector("#clear")

function isOperator(){
  const operators = ['+', '-', '*', '/']
  for (const op of operators){
    if (op === display.value){
      return true
    }
  }
  return false
}

function getValue(){
  return parseFloat(display.value)
}

function resetValues(){
  operand1 = operand2 = operator = null
}

function disableButtons(){
  for (const btn of Array.from(allButtons)){
    btn.disabled = true
  }
}

function enableButtons(){
  for (const btn of Array.from(allButtons)){
    btn.disabled = false
  }
}

for (const numberKey of numberPad){
  numberKey.addEventListener("click", (e) => {
    display.style.direction = "rtl"
    if (isOperator()){
      operator = display.value 
      sideDisplay.value += display.value
    }
    if (operand1 === null && sideDisplay.value !== ""){
      sideDisplay.value = ""
      display.value = e.target.textContent
      return
    }
    if (display.value === "0" || isOperator()) {
      display.value = e.target.textContent
      return
    }
    display.value += e.target.textContent
  })
}

decimal.addEventListener("click", (e) => {
  if (operand1 === null && sideDisplay.value !== ""){
    sideDisplay.value = ""
    display.value = "0."
    return
  }
  if (display.value.indexOf('.') == -1){
    if (isOperator()){
      operator = display.value 
      sideDisplay.value += display.value
      display.value = '0.'
    }
    else{
      display.value += '.'
    }
    display.style.direction = "ltr"
  }
})

equal.addEventListener("click", () => {
  let result
  if (isOperator()){
    operator = display.value
  }
  else{
    temp = getValue()
    operand1 === null ? operand1 = temp : operand2 = temp
  }
  if (operand2 === null){
    result = operand1
  }
  else{
    result = operate(operand1, operand2, operator)
    sideDisplay.value += " " + display.value
  }
  display.style.direction = "ltr"
  display.value = result
  if (display.value === "ERROR"){
    disableButtons()
    clear.disabled = false
  }
  else{
    resetValues()
  }
})

operations.addEventListener("click", (e) => {
  if (operand1 === null){
    operand1 = getValue()
    sideDisplay.value = display.value + " "
  }
  else if (!isOperator()){
    operand2 = getValue()
    const result = operate(operand1, operand2, operator)
    if (result === "ERROR"){
      display.value = result
      disableButtons()
      clear.disabled = false
      return
    }
    else{
      sideDisplay.value = result + " "
      operand1 = result
      operator = operand2 = null
    }
  }
  display.value = e.target.textContent
})

backspace.addEventListener("click", () => {
  if (isOperator() || (operand1 === null && sideDisplay.value !== "")){
    return
  }
  display.value = display.value.substring(0, display.value.length - 1)
  if (display.value === ""){
    display.value = "0"
    return
  }
  display.style.direction = display.value.charAt(display.value.length - 1) === '.' ? "ltr" : "rtl"
})

clear.addEventListener("click", () => {
  display.value = "0"
  sideDisplay.value = ""
  resetValues()
  enableButtons()
})