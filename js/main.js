import { BankAccount } from "./bankaccount.js";

function displayNone(ele) {
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
}

function displayBlock(ele) {
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
}

const config = {
    initialForm : document.getElementById("initial-form"),
    bankForm : document.getElementById("bank-form"),
    bankPage : document.getElementById("bank-page"),
    withdrawPage : document.getElementById("withdraw-page")
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
    `;

    let balanceCon = document.createElement("div");
    balanceCon.classList.add("bg-danger", "d-flex", "flex-wrap", "py-1", "py-md-2");
    balanceCon.innerHTML = `
        <div class="col-md-7 col-12 rem2">Available Balance</div>
        <div class="col-md-5 col-12 rem2">$${userBankAccount.money}</div>
    `;

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
    `;

    menuCon.querySelectorAll("#withdrawBtn").item(0).addEventListener("click", function(){
        withdrawController(userBankAccount);
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

function billInputSelector(title) {
    let container = document.createElement("div");
    container.innerHTML = `
        <h2>${title}</h2>
        <div class="mt-3">
            <div class="mb-2 d-flex justify-content-between">
                <div class="col-3 pl-0">
                    <label for="100-dollars" class="col-12">$100</label>
                </div>
                <div class="col-8 pr-0">
                    <input class="text-right col-12 bill-input" data-bill="100" type="number" id="100-dollars" name="100-dollars" min="0" value="0">
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <div class="col-3 pl-0">
                    <label for="50-dollars" class="col-12">$50</label>
                </div>
                <div class="col-8 pr-0">
                    <input class="text-right col-12 bill-input" data-bill="50" type="number" id="50-dollars" name="50-dollars" min="0" value="0">
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <div class="col-3 pl-0">
                    <label for="20-dollars" class="col-12">$20</label>
                </div>
                <div class="col-8 pr-0">
                    <input class="text-right col-12 bill-input" data-bill="20" type="number" id="20-dollars" name="20-dollars" min="0" value="0">
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <div class="col-3 pl-0">
                    <label for="10-dollars" class="col-12">$10</label>
                </div>
                <div class="col-8 pr-0">
                    <input class="text-right col-12 bill-input" data-bill="10" type="number" id="10-dollars" name="10-dollars" min="0" value="0">
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <div class="col-3 pl-0">
                    <label for="5-dollars" class="col-12">$5</label>
                </div>
                <div class="col-8 pr-0">
                    <input class="text-right col-12 bill-input" data-bill="5" type="number" id="5-dollars" name="5-dollars" min="0" value="0">
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <div class="col-3 pl-0">
                    <label for="1-dollars" class="col-12">$1</label>
                </div>
                <div class="col-8 pr-0">
                    <input class="text-right col-12 bill-input" data-bill="1" type="number" id="1-dollars" name="1-dollars" min="0" value="0">
                </div>
            </div>
        </div>
        <div class="bg-info my-2 p-1">
            <div id="withdraw-sum" class="p-2 border border-white text-center text-white rem2">$0.00</div>
        </div>
    `;
    return container;
}

function backNextBtn(back, next) {
    let container = document.createElement("div");
    container.classList.add("d-flex", "justify-content-between");
    container.innerHTML = `
        <div class="pl-0 col-6">
            <button id="withdrawGoBack" class="col-12 btn btn-outline-primary back-btn">${back}</button>
        </div>
        <div class="pr-0 col-6">
            <button id="withdrawProcess" class="col-12 btn btn-outline-primary">${next}</button>
        </div>
    `;
    return container;
}

function withdrawController(bankAccount) {
    displayNone(config.bankPage);
    displayBlock(config.withdrawPage);

    config.bankPage.innerHTML = "";
    config.withdrawPage.innerHTML = "";
    config.withdrawPage.append(withdrawPage(bankAccount));
}

function withdrawPage(bankAccount) {
    let container = document.createElement("div");
    container.append(billInputSelector("Please Enter The Withdrawal Amount"));

    let withdrawSum = container.querySelector("#withdraw-sum");
    let billInputs = container.querySelectorAll(".bill-input");
    billInputs.forEach(bill => {
        bill.addEventListener("change", () => {
            withdrawSum.innerHTML = `$${billSummation(billInputs, "data-bill").toString()}`;
        });
    });

    container.append(backNextBtn("Go Back", "Next"));
    // backを押すと前のページに戻る処理
    container.querySelector(".back-btn").addEventListener("click", () => {
        displayNone(config.withdrawPage);
        displayBlock(config.bankPage)
        config.bankPage.append(mainBankPage(bankAccount))
    });

    return container;
}

function billSummation(inputElementNodeList, multiplierAttribute) {
    let summation = 0;
    inputElementNodeList.forEach(ele => {
        let value = parseInt(ele.value);
        value = ele.hasAttribute(multiplierAttribute) ? parseInt(ele.getAttribute(multiplierAttribute)) * value : value;
        summation += value >= 0 ? value : 0;
    });
    return summation;
}