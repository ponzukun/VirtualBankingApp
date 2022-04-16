import { BankAccount } from "./bankaccount.js";

const config = {
    initialForm : document.getElementById("initial-form"),
    bankPage : document.getElementById("bank-page")
}

function getRandomInteger(min, max) {
    if(max < min) return null;
    return Math.floor(Math.random() * (max - min) + min);
}

let user1 = new BankAccount("Elisa", "Jones", "elisa.jones@gmail.com", "checking", getRandomInteger(1,1000), "30");
console.log(user1);
