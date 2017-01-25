function CustomerNode(serviceTime, left, right){
    this.left = left||undefined;
    this.right = right||undefined;
    this.serviceTime = serviceTime||undefined;
};

function MinHeap(size){
    this._nodes = [];
    this._nodes.length = size;
    this._count = 0;
    this.head = this._nodes[0];
};
MinHeap.prototype.pop = function (){
    count--;
    //TODO: Actual Logic
};
MinHeap.prototype.push = function (node){
    count++;
    //TODO: Actual Logic
};
MinHeap.prototype.each = function (callback){
    for(var i=0; i<this.nodes.length; i++){
        callback(this.nodes[i]);
    }
};
MinHeap.prototype.isFull = function (){
    return this._count == this._nodes.length;
};

function Bank(numTellers){
    this.heap = new MinHeap(numTellers);
    this.processedCount = 0;
};
/**
*   Pop the current customer (with the least time) off the top of the heap,
*    and then progress the service time of all other customers by the amount
*    of time remaining on that customer's service. Make it snappy!
*   
*   If there are any other customers with the same amount of service time,
*    we will pop them too.
*/
Bank.prototype.processCustomer = function (){
    this.processedCount++;
    this._progress(this.heap.pop().serviceTime);
    if( this._shouldLog() ){
        this.log();
    }
    while(this.heap.head.serviceTime === 0){
        this.processedCount++;
        this._progress(this.heap.pop().serviceTime);
        if( this._shouldLog() ){
            this.log();
        }
    }
};
/**
 * Pull customers from a queue until the heap is full or we're out of customers
 */
Bank.prototype.takeCustomers = function (customerQueue){
    while(!this.heap.isFull() && !this.customerQueue.isEmpty()){
        this.heap.push(customerQueue.dequeue())
    }
};
/*
*   Decrement the value of all customer service times by a fixed amount
*
*   ...I'm using progress as a verb here. This makes sense. Go with it.
*/
Bank.prototype._progress = function(duration){
    this.minHeap.each(function (customer){
        customer.serviceTime -= duration;
    });
};
Bank.prototype.addCustomer = function (){
    //TODO?
};
Bank.prototype.log = function (){
    //TODO: output
};
Bank.prototype.isFull = function (){
    return this.heap.isFull();
};
Bank.prototype._shouldLog = function (){
    return this.processedCount&20 === 0;
};
Bank.prototype.openForBusiness = function (customerQueue){
    //TODO: DO EVERYTHING
};


function Queue(){
    this.nodes = [];
};
Queue.prototype.dequeue = function (node){
    return this.nodes.splice(0,1)[0];
};
Queue.prototype.queue = function (node){
    this.nodes.push(node);
};
Queue.prototype.isEmpty = function (){
    return this.nodes.length > 0;
}