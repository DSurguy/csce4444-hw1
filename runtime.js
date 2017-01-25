/* global Bank, MinHeap, Queue, CustomerNode, Event */
document.querySelector('[name=numTellers]').addEventListener('input', function (e){
    document.querySelector('.numTellersValue').innerHTML = this.value;
});

document.querySelector('[name=numCustomers]').addEventListener('input', function (e){
    document.querySelector('.numCustomersValue').innerHTML = this.value;
});

document.querySelector('.randomizeButton').addEventListener('click', function (e){
    var numTellersElem = document.querySelector('[name=numTellers]');
    numTellersElem.value = Math.floor(Math.random() * (31 - 7 + 1)) + 7;
    numTellersElem.dispatchEvent(new Event('input'));
    
    var numCustomersElem = document.querySelector('[name=numCustomers]');
    numCustomersElem.value = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    numCustomersElem.dispatchEvent(new Event('input'));
});



function simulate(){
    var bank = new Bank(numTellers);
    
}