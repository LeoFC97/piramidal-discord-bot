const { listOfContracts } = require('./constants');

module.exports={
    getContactByCoinName: (coinName) => {
        try {
            const found = listOfContracts.find(contract => contract.coin == coinName);
            return found;
        } catch (error) {
            return false;
        }
    }
}
