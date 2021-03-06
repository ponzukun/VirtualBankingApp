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
    sidePage : document.getElementById("side-page")
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
    let bankAccount = new BankAccount(
        form.querySelectorAll(`input[name="userFirstName"]`).item(0).value,
        form.querySelectorAll(`input[name="userLastName"]`).item(0).value,
        form.querySelectorAll(`input[name="userEmail"]`).item(0).value,
        form.querySelectorAll(`input[name="userAccountType"]:checked`).item(0).value,
        getRandomInteger(1, Math.pow(10,8)),
        parseInt(form.querySelectorAll(`input[name="userFirstDeposit"]`).item(0).value),
    );

    displayNone(config.initialForm);
    displayBlock(config.bankPage);
    config.bankPage.append(mainBankPage(bankAccount));
}

function mainBankPage(bankAccount) {
    let container = document.createElement("div");

    let infoCon = document.createElement("div");
    infoCon.classList.add("pb-2", "pb-md-4", "text-right");
    infoCon.innerHTML = `
        <div class="py-1">Your Name: ${bankAccount.getFullName()}</div>
        <div class="py-1">Your Back ID: ${bankAccount.accountNumber}</div>
        <div class="py-1">Your First Deposit: ${bankAccount.initialDeposit}</div>
    `;

    let balanceCon = document.createElement("div");
    balanceCon.classList.add("bg-danger", "d-flex", "flex-wrap", "py-1", "py-md-2");
    balanceCon.innerHTML = `
        <div class="col-md-7 col-12 rem2">Available Balance</div>
        <div class="col-md-5 col-12 rem2">$${bankAccount.money}</div>
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
        sidePageSwitch();
        config.sidePage.append(withdrawPage(bankAccount));
    });
    menuCon.querySelectorAll("#depositBtn").item(0).addEventListener("click", function(){
        sidePageSwitch();
        config.sidePage.append(depositPage(bankAccount));
    });
    menuCon.querySelectorAll("#comeBackLaterBtn").item(0).addEventListener("click", function(){
        sidePageSwitch();
        config.sidePage.append(comeBackLaterPage(bankAccount));
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
            <div id="totalBillAmount" class="p-2 border border-white text-center text-white rem2">$0.00</div>
        </div>
    `;
    return container;
}

function backNextBtn(back, next) {
    let container = document.createElement("div");
    container.classList.add("d-flex", "justify-content-between");
    container.innerHTML = `
        <div class="pl-0 col-6">
            <button class="col-12 btn btn-outline-primary back-btn">${back}</button>
        </div>
        <div class="pr-0 col-6">
            <button class="col-12 btn btn-outline-primary next-btn">${next}</button>
        </div>
    `;
    return container;
}

function sidePageSwitch() {
    displayNone(config.bankPage);
    displayBlock(config.sidePage);
    config.bankPage.innerHTML = "";
    config.sidePage.innerHTML = "";
}

function bankReturn(bankAccount) {
    displayNone(config.sidePage);
    displayBlock(config.bankPage);
    config.bankPage.innerHTML = "";
    config.bankPage.append(mainBankPage(bankAccount));
}

function withdrawPage(bankAccount) {
    let container = document.createElement("div");
    container.append(billInputSelector("Please Enter The Withdrawal Amount"));

    let billInputs = container.querySelectorAll(".bill-input");
    billInputs.forEach(bill => {
        bill.addEventListener("change", () => {
            document.getElementById("totalBillAmount").innerHTML = `$${billSummation(billInputs, "data-bill").toString()}`;
        });
    });

    container.append(backNextBtn("Go Back", "Next"));
    // back??????????????????????????????????????????
    container.querySelector(".back-btn").addEventListener("click", () => {
        bankReturn(bankAccount);
    });
    
    // next????????????????????????????????????????????????
    container.querySelector(".next-btn").addEventListener("click", () => {
        config.sidePage.innerHTML = "";

        let confirmDialog = document.createElement("div");
        confirmDialog.append(billDialog("The money you are going to take is ...", billInputs, "data-bill"));

        let withdrawContainer = document.createElement("div");
        withdrawContainer.classList.add("d-flex", "bg-danger", "text-white", "mb-3");
        let withdrawAmount = bankAccount.calculateWithdrawAmount(billSummation(billInputs, "data-bill"));
        withdrawContainer.innerHTML = `
                <div class="col-8 text-left rem2 total-withdraw">Total to be withdrawn: </div>
                <div class="col-4 text-right rem2">$${withdrawAmount}</div>
        `;
        confirmDialog.append(withdrawContainer);

        // Go Back???Confirm??????????????????????????????
        let withdrawConfirmBtns = backNextBtn("Go Back", "Confirm");

        // Go Back??????????????????????????????????????????
        withdrawConfirmBtns.querySelector(".back-btn").addEventListener("click", () => {
            config.sidePage.innerHTML = "";
            config.sidePage.append(withdrawPage(bankAccount));
        });

        // Confirm????????????bankPage?????????????????????
        withdrawConfirmBtns.querySelector(".next-btn").addEventListener("click", () => {
            bankAccount.withdraw(withdrawAmount);
            bankReturn(bankAccount);
        });

        confirmDialog.append(withdrawConfirmBtns);
        
        config.sidePage.append(confirmDialog);
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

function billDialog(title, inputElementNodeList, multiplierAttribute) {
    let container = document.createElement("div");
    container.innerHTML = `
        <h2>${title}</h2>
        <div class="d-flex flex-column align-items-center">
            <div class="col-10 bg-info my-2 p-1 bill-dialog">
            </div>
        </div>
    `;

    inputElementNodeList.forEach(ele => {
        if(0 < parseInt(ele.value)) {
            let div = document.createElement("div");
            div.classList.add("m-1", "p-2", "border", "border-white", "text-right", "text-white", "rem1p5");
            div.innerHTML = `${ele.value} &#x2613; $${ele.getAttribute(multiplierAttribute)}`;
            container.querySelector(".bill-dialog").append(div);
        }
    });

    let billTotal = document.createElement("div");
    billTotal.classList.add("m-1", "p-2", "text-white", "text-right", "rem1p5");
    billTotal.innerHTML = `Total: $${billSummation(inputElementNodeList, multiplierAttribute)}`;
    container.querySelector(".bill-dialog").append(billTotal);

    return container;
}

function depositPage(bankAccount) {
    let container = document.createElement("div");
    container.classList.add("px-3", "px-md-5", "py-4", "bg-white");
    let depositContainer = document.createElement("div");
    container.append(depositContainer);

    depositContainer.append(billInputSelector("Please Enter The Deposit Amount"));
    let billInputs = container.querySelectorAll(".bill-input");
    billInputs.forEach(bill => {
        bill.addEventListener("change", () => {
            document.getElementById("totalBillAmount").innerHTML = `$${billSummation(billInputs, "data-bill").toString()}`;
        });
    });

    // Go Back???Next??????????????????????????????
    let depositConfirmBtns = backNextBtn("Go Back", "Next");

    // Go Back????????????bankPage???????????????
    depositConfirmBtns.querySelector(".back-btn").addEventListener("click", () => {
        bankReturn(bankAccount);
    });

    // Next?????????????????????????????????????????????
    depositConfirmBtns.querySelector(".next-btn").addEventListener("click", () => {
        config.sidePage.innerHTML = "";
        
        let confirmDialog = document.createElement("div");
        confirmDialog.append(billDialog("The money you are going to deposit is ...", billInputs, "data-bill"));

        let depositContainer = document.createElement("div");
        depositContainer.classList.add("d-flex", "bg-danger", "text-white", "mb-3");
        depositContainer.innerHTML = `
                <div class="col-8 text-left rem2 total-withdraw">Total to be withdrawn: </div>
                <div class="col-4 text-right rem2">$${billSummation(billInputs, "data-bill")}</div>
        `;
        confirmDialog.append(depositContainer);

        
        // Go Back???Confirm??????????????????????????????
        let depositConfirmBtns = backNextBtn("Go Back", "Confirm");
        
        // Go Back??????????????????????????????????????????
        depositConfirmBtns.querySelector(".back-btn").addEventListener("click", () => {
            config.sidePage.innerHTML = "";
            config.sidePage.append(withdrawPage(bankAccount));
        });
        
        // Confirm????????????bankPage?????????????????????
        depositConfirmBtns.querySelector(".next-btn").addEventListener("click", () => {
            bankAccount.deposit(billSummation(billInputs, "data-bill"));
            bankReturn(bankAccount);
        });

        confirmDialog.append(depositConfirmBtns);
        config.sidePage.append(confirmDialog);
    });

    depositContainer.append(depositConfirmBtns);
    return container;
}

function comeBackLaterPage(bankAccount) {
    let container = document.createElement("div");
    container.classList.add("px-3", "px-md-5", "py-4", "bg-white");
    container.innerHTML = `
    <h2>How many days will you be gone?</h2>
    <div class="mt-3 mb-5">
        <input class="form-control display-inline col-11" type="number" id="days" name="" min="0" value="" placeholder="4">
        <span>days</span>
    </div>
    `;
    // Go Back???Next??????????????????????????????
    let comeBackLaterConfirmBtns = backNextBtn("Go Back", "Confirm");
    // Go Back????????????bankPage???????????????
    comeBackLaterConfirmBtns.querySelector(".back-btn").addEventListener("click", () => {
        bankReturn(bankAccount);
    });
    
    // Confirm????????????bankPage?????????
    comeBackLaterConfirmBtns.querySelector(".next-btn").addEventListener("click", () => {
        bankAccount.simulateTimePassage(document.getElementById("days").value);
        bankReturn(bankAccount);
    });

    container.append(comeBackLaterConfirmBtns);
    return container;
}