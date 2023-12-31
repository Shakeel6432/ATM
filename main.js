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
    withdraw = (amount) => {
        if (amount > this.balance) {
            console.log(`Insufficiant funds. Withdrawal cancaled.`);
        }
        else {
            this.balance -= amount;
            this.transactionHistory.push(`Withdrawn $${amount}`);
        }
        ;
    };
    transferMoney = (recifient, amount) => {
        if (amount > this.balance) {
            console.log('Insufficiant funds. Transfer canceled.');
        }
        else {
            this.balance -= amount;
            recifient.balance += amount;
            this.transactionHistory.push(`Transferred $${amount} to ${recifient.id}`);
            console.log('Transfer money successful.');
        }
        ;
    };
    changePin = (newPin) => {
        this.pin = newPin;
        console.log('Change pin successfully');
    };
    mobileRecharge = (amount) => {
        if (amount > this.balance) {
            console.log('Insufficiant funds. Mobile recharge canceled.');
        }
        else {
            this.balance -= amount;
            this.transactionHistory.push(`Mobile recharge of $${amount}`);
            console.log('Mobile recharge successful.');
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
