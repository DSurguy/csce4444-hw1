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

document.querySelector('.simulateButton').addEventListener('click', simulate);

function simulate(){
    var bank = new Bank({
        numTellers: parseInt(document.querySelector('[name=numTellers]').value),
        reporter: function (state){
            console.log(state.filter(function (cust){
                return !!cust;
            }).map(function (cust){
                return cust.serviceTime;
            }));
        },
        reportFrequency: 1
    });
    var numCustomers = parseInt(document.querySelector('[name=numCustomers]').value),
        customerList = document.querySelector('.customerQueue');
    for( var i=0; i<numCustomers; i++ ){
        var cust = new CustomerNode(i, Math.floor(Math.random() * (30 - 1 + 1)) + 1);
        bank.queueCustomer(cust);
        var custNode = document.createElement('div');
        custNode.innerHTML = cust.id + ' - ' + cust.serviceTime;
        customerList.appendChild(custNode);
    }
    while(!bank.isEmpty()){
        bank.dequeueCustomers();
        bank.processCustomer();
    }
}