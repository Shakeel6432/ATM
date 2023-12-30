export { User };
class User {
    id;
    pin;
    balance;
    transactionHistory;
    constructor(id, pin, balance = 0) {
        this.id = id;
        this.pin = pin;
        this.balance = balance;
        this.transactionHistory = [];
    }
    ;
    deposit = (amount) => {
        this.balance += amount;
        this.transactionHistory.push(`Deposited $${amount}`);
    };
    withdraw = (amount) => {
        if (amount > this.balance) {
            console.log(`Insufficiant funds. Withdrawal cancalled.`);
        }
        else {
            this.balance -= amount;
            this.transactionHistory.push(`Withdrawn $${amount}`);
        }
        ;
    };
    checkBalance = () => {
        console.log(`Current Balance: $${this.balance}`);
    };
    showtransactionHistory = () => {
        console.log("Transaction History");
        this.transactionHistory.forEach((transaction, index) => {
            console.log(`${index + 1}. ${transaction}`);
        });
    };
}
;
