import { BankAccount } from "./bankaccount.js";

const config = {
    initialForm : document.getElementById("initial-form"),
    bankForm : document.getElementById("bank-form"),
    bankPage : document.getElementById("bank-page")
}

function bankFormSubmit(event) {
    initializeUserAccount();
    event.preventDefault();
  }
  
config.bankForm.addEventListener('submit', bankFormSubmit);

function getRandomInteger(min, max) {
    if(max < min) return null;
    return Math.floor(Math.random() * (max - min) + min);
}

function initializeUserAccount() {
    const form = config.bankForm;
    let userBankAccount = new BankAccount(
        form.querySelectorAll(`input[name="userFirstName"]`).item(0).value,
        form.querySelectorAll(`input[name="userLastName"]`).item(0).value,
        form.querySelectorAll(`input[name="userEmail"]`).item(0).value,
        form.querySelectorAll(`input[name="userAccountType"]:checked`).item(0).value,
        getRandomInteger(1, Math.pow(10,8)),
        parseInt(form.querySelectorAll(`input[name="userFirstDeposit"]`).item(0).value),
    );

    console.log(userBankAccount);

    config.initialForm.classList.add("d-none");
    config.bankPage.classList.remove("d-none");
    config.bankPage.append(mainBankPage(userBankAccount));
}

function mainBankPage(userBankAccount) {
    let container = document.createElement("div");

    let infoCon = document.createElement("div");
    infoCon.classList.add("pb-2", "pb-md-4", "text-right");
    infoCon.innerHTML = `
        <div class="py-1">Your Name: ${userBankAccount.getFullName()}</div>
        <div class="py-1">Your Back ID: ${userBankAccount.accountNumber}</div>
        <div class="py-1">Your First Deposit: ${userBankAccount.initialDeposit}</div>
    `

    let balanceCon = document.createElement("div");
    balanceCon.classList.add("bg-danger", "d-flex", "flex-wrap", "py-1", "py-md-2");
    balanceCon.innerHTML = `
        <div class="col-md-7 col-12 rem2">Available Balance</div>
        <div class="col-md-5 col-12 rem2">$${userBankAccount.money}</div>
    `

    let menuCon = document.createElement("div");
    menuCon.classList.add("my-3", "d-flex", "justify-content-center", "flex-wrap", "col-12");
    menuCon.innerHTML = `
        <div class="py-1 py-md-3 px-0 px-md-1 col-lg-4 col-12">
            <div id="withdrawBtn" class="bg-blue p-3 hover">
                <div class="mb-2">WITHDRAWAL</div>
                <i class="fa-3x fas fa-wallet"></i>
            </div>
        </div>
        <div class="py-1 py-md-3 px-0 px-md-1 col-lg-4 col-12">
            <div id="depositBtn" class="bg-blue p-3 hover">
                <div class="mb-2">DEPOSIT</div>
                <i class="fa-3x fas fa-coins"></i>
            </div>
        </div>
        <div class="py-1 py-md-3 px-0 px-md-1 col-lg-4 col-12">
            <div id="comeBackLaterBtn" class="bg-blue p-3 hover">
                <div class="mb-2">COME BACK LATER</div>
                <i class="fa-3x fas fa-home"></i>
            </div>
        </div>
    `

    menuCon.querySelectorAll("#withdrawBtn").item(0).addEventListener("click", function(){
        window.alert("withdraw");
    });
    menuCon.querySelectorAll("#depositBtn").item(0).addEventListener("click", function(){
        window.alert("deposit");
    });
    menuCon.querySelectorAll("#comeBackLaterBtn").item(0).addEventListener("click", function(){
        window.alert("come back later");
    });

    container.append(infoCon, balanceCon, menuCon);
    return container;
}