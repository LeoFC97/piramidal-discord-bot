const { listOfContracts } = require('./constants');

module.exports={
    getContactByCoinName: (coinName) => {
        const found = listOfContracts.find(contract => contract.coin == coinName);
        return found.contractAddress;
    }
}
