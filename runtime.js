/* global Bank, MinHeap, Queue, CustomerNode, Event */
document.querySelector('[name=numTellers]').addEventListener('input', function (e){
    document.querySelector('.numTellersValue').innerHTML = this.value;
});

document.querySelector('[name=numCustomers]').addEventListener('input', function (e){
    document.querySelector('.numCustomersValue').innerHTML = this.value;
});

document.querySelector('.randomizeButton').addEventListener('click', function (e){
    var numTellersElem = document.querySelector('[name=numTellers]');
    numTellersElem.value = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
    numTellersElem.dispatchEvent(new Event('input'));
    
    var numCustomersElem = document.querySelector('[name=numCustomers]');
    numCustomersElem.value = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    numCustomersElem.dispatchEvent(new Event('input'));
});

document.querySelector('.simulateButton').addEventListener('click', simulate);

function simulate(){
    document.querySelector('.reports').innerHTML = '';
    var reportId = 0;
    var bank = new Bank({
        numTellers: parseInt(document.querySelector('[name=numTellers]').value, 10),
        reporter: function (heapState, queueState){
            createReport(heapState, queueState, ++reportId);
        },
        reportFrequency: 20
    });
    var numCustomers = parseInt(document.querySelector('[name=numCustomers]').value, 10);

    for( var i=0; i<numCustomers; i++ ){
        var cust = new CustomerNode(i+1, Math.floor(Math.random() * (30 - 1 + 1)) + 1);
        bank.queueCustomer(cust);
    }

    bank.report();

    while(!bank.isEmpty()){
        bank.dequeueCustomers();
        bank.processCustomer();
    }
}

function createReport (heapState, queueState, reportId){
    var report = document.createElement('div');
    report.classList.add('report');
    report.innerHTML = ''
    +'<h3>Report '+reportId+'</h3>'
    +'<div class="content">'
        +'<div class="customerQueue">'
            +'<div class="remaining">'+queueState.length+' Remaining</div>'
            +'<ul class="list">'
                +queueState.map(function (cust){
                    return '<li class="customer">'+cust.id+' | '+cust.serviceTime+'</li>';
                }).join('')
            +'</ul>'
        +'</div>'
        +'<div class="heap">'
            +'<div class="row" data-row="1">'
                +heapState.slice(1,2).map(function (cust){
                    return '<div class="node">'+(cust?cust.serviceTime:'')+'</div>'
                }).join('')
            +'</div>'
            +'<div class="row" data-row="2">'
                +heapState.slice(2,4).map(function (cust){
                    return '<div class="node">'+(cust?cust.serviceTime:'')+'</div>'
                }).join('')
            +'</div>'
            +'<div class="row" data-row="3">'
                +heapState.slice(4,8).map(function (cust){
                    return '<div class="node">'+(cust?cust.serviceTime:'')+'</div>'
                }).join('')
            +'</div>'
            +'<div class="row" data-row="4">'
                +heapState.slice(8,16).map(function (cust){
                    return '<div class="node">'+(cust?cust.serviceTime:'')+'</div>'
                }).join('')
            +'</div>'
        +'</div>'
    +'</div>';
    document.querySelector('.reports').appendChild(report);
}