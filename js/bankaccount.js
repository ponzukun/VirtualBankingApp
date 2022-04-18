export class BankAccount {
    maxWithdrawPercent = 0.2;

    constructor(firstName, lastName, email, type, accountNumber, money) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.type = type;
        this.accountNumber = accountNumber;
        this.money = money;
        this.initialDeposit = money;
    }

    getFullName() {
        return this.firstName + " " + this.lastName;
    }

    calculateWithdrawAmount(amount) {
        let maxWithdrawAmount = Math.floor(this.money * this.maxWithdrawPercent);
        return amount < maxWithdrawAmount ? amount : maxWithdrawAmount;
    }

    withdraw(amount) {
        this.money -= amount;
    }

    deposit(amount) {
        this.money += amount;
    }
}