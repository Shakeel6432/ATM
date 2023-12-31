import inquirer from "inquirer";
import { User } from "./main.js";
class ATM {
    users;
    constructor() {
        this.users = new Map();
    }
    loginUser = async () => {
        let userInput = await inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Enter your user ID",
            },
            {
                type: "Password",
                name: "pin",
                message: "Enter your user PIN",
                mask: "*",
            },
        ]);
        let userID = userInput.id;
        let userPIN = userInput.pin;
        if (this.users.has(userID)) {
            let user = this.users.get(userID);
            if (user?.pin === userPIN) {
                console.log("Login successful! Welcome." + userID);
                return user;
            }
            ;
        }
        ;
        console.log("Invalid credentials! Please try again");
        return null;
    };
    performTransaction = async (user) => {
        let transactionChoice = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Choose an action',
            choices: ['Check Balance', 'Withdraw', 'Transfer Money', 'Mobile Recharge', 'Change Pin', 'Transaction History', 'Logout'],
        });
        switch (transactionChoice.action) {
            case 'Check Balance':
                user.checkBalance();
                break;
            case 'Withdraw':
                let withdrawAmount = await inquirer.prompt({
                    type: 'number',
                    name: 'amount',
                    message: 'Enter withrawal amount:',
                    validate: (input) => input > 0 || 'Amount must be greater then 0',
                });
                user.withdraw(withdrawAmount.amount);
                break;
            case 'Transfer Money':
                let transferInfo = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'recipientId',
                        message: 'Enter user recipient Id:',
                    },
                    {
                        type: 'number',
                        name: 'amount',
                        message: 'Enter transfer amount:',
                        validate: (input) => input > 0 || 'Amount must be greater then 0',
                    },
                ]);
                let recifient = this.users.get(transferInfo.recipientId);
                if (recifient) {
                    user.transferMoney(recifient, transferInfo.amount);
                }
                else {
                    console.log('Recipient not found.');
                }
                ;
                break;
            case 'Change Pin':
                let newPin = await inquirer.prompt({
                    type: 'password',
                    name: 'pin',
                    message: 'Enter your new pin:',
                    mask: '*'
                });
                user.changePin(newPin.pin);
                break;
            case 'Mobile Recharge':
                let rechargeAmount = await inquirer.prompt({
                    type: 'number',
                    name: 'amount',
                    message: 'Enter mobile recharge amount:',
                    validate: (input) => input > 0 || 'Amount must be greater then 0.'
                });
                user.mobileRecharge(rechargeAmount.amount);
                break;
            case 'Transaction History':
                user.showtransactionHistory();
                break;
            case 'Logout':
                console.log('Logging out...');
                break;
            default:
                console.log('Invalid choice. Please try again');
                break;
        }
        ;
    };
    start = async () => {
        console.log('Welcome to the ATM!');
        while (true) {
            let user = await this.loginUser();
            if (user) {
                await this.performTransaction(user);
                let continueTransaction = await inquirer.prompt({
                    type: 'confirm',
                    name: 'continue',
                    message: 'Do you want to perform another transaction?',
                });
                if (!continueTransaction.continue) {
                    console.log('Logging out...');
                    break;
                }
            }
            else {
                break;
            }
        }
    };
}
;
let atm = new ATM();
atm.users.set('Muhammad Shakeel', new User('Shakeel', '6432', 50000));
atm.users.set('Rizwan Ahmed', new User('Rizwan', '6754', 50000));
atm.users.set('James', new User('James', '2580', 50000));
atm.users.set('Naveed Bhai', new User('Naveed', '0708', 50000));
atm.start();
