export {User}

class User {
  id: string;
  pin: string;
  balance: number;
  transactionHistory: string[];

  constructor(id: string, pin: string, balance: number = 0) {
    this.id = id;
    this.pin = pin;
    this.balance = balance;
    this.transactionHistory = [];
  };

  deposit = (amount: number) => {
    this.balance += amount;
    this.transactionHistory.push(`Deposited $${amount}`)
  };

  withdraw = (amount: number) => {
    if (amount > this.balance) {
      console.log(`Insufficiant funds. Withdrawal cancalled.`);
    } else {
      this.balance -= amount;
      this.transactionHistory.push(`Withdrawn $${amount}`);
    };
  };

  checkBalance = () => {
    console.log(`Current Balance: $${this.balance}`);
  };

  showtransactionHistory = () => {
    console.log("Transaction History");
    this.transactionHistory.forEach((transaction, index)=>{
      console.log(`${index + 1}. ${transaction}`);
    });
  };
};




