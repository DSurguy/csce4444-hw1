/**
 * CustomerNode Class
 */
function CustomerNode(id, serviceTime){
    this.id = id||undefined;
    this.serviceTime = serviceTime||undefined;
}

/**
 * Queue Class
 */
function Queue(){
    this.nodes = [];
}
Queue.prototype.dequeue = function (node){
    return this.nodes.splice(0,1)[0];
};
Queue.prototype.queue = function (node){
    this.nodes.push(node);
};
Queue.prototype.isEmpty = function (){
    return this.nodes.length == 0;
};
Queue.prototype.state = function (){
    return this.nodes.slice(0).reverse();
};

/**
 * MinHeap Class
 */
function MinHeap(size){
    this._nodes = [];
    this._nodes.length = size + 1; //1-based array
    this._count = 0;
}
MinHeap.prototype.pop = function (){
    //throw error if we can't pop
    if( this.isEmpty() ){
        throw new Error('MinHeap empty');
    }
    
    //decrement total count
    this._count--;
    
    //empty the head node and store it to return
    var returnNode = this._nodes[1];
    this._nodes[1] = undefined;
    
    //swap the lowest child into the head node
    for( var i=this._nodes.length-1; i>0; i-- ){
        if( this._nodes[i] !== undefined ){
            this._nodes[1] = this._nodes[i];
            this._nodes[i] = undefined;
            break;
        }
    }
    
    //check to see if we need to fix the heap
    var curPosition = 1,
        leftChild,
        rightChild;
        
    var go = true;
    while( go ){
        var tempNode;
        leftChild = curPosition*2;
        rightChild = curPosition*2 + 1;
        if( this._nodes[leftChild] && this._nodes[leftChild].serviceTime < this._nodes[curPosition].serviceTime ){
            //swap left
            tempNode = this._nodes[curPosition];
            this._nodes[curPosition] = this._nodes[leftChild];
            this._nodes[leftChild] = tempNode;
            curPosition = leftChild;
        }
        else if( this._nodes[rightChild] && this._nodes[rightChild].serviceTime < this._nodes[curPosition].serviceTime ){
            //swap right
            tempNode = this._nodes[curPosition];
            this._nodes[curPosition] = this._nodes[rightChild];
            this._nodes[rightChild] = tempNode;
            curPosition = rightChild;
        }
        else{
            //done swapping
            go = false;
        }
    }
    
    return returnNode;
};
MinHeap.prototype.push = function (newNode){
    //throw error if we can't push
    if( this.isFull() ){
        throw new Error('MinHeap full');
    }
    //increment the total node count
    this._count++;
    //add the new node at the first available position in the heap
    var curPosition = 1;
    for( var i=1; i<this._nodes.length; i++ ){
        if( this._nodes[i] === undefined ){
            this._nodes[i] = newNode;
            curPosition = i;
            break;
        }
    }
    //check to see if we need to fix the heap
    var parentPosition;
    var go = true;
    while( curPosition > 1 && go ) {
        parentPosition = Math.floor(curPosition/2);
        if( this._nodes[curPosition].serviceTime < this._nodes[parentPosition].serviceTime ){
            //swap parent and child
            var tempNode = this._nodes[parentPosition];
            this._nodes[Math.floor(curPosition/2)] = this._nodes[curPosition];
            this._nodes[curPosition] = tempNode;
            curPosition = parentPosition;
        }
        else{
            go = false;
        }
    }
};
MinHeap.prototype.each = function (callback){
    for(var i=0; i<this._nodes.length; i++){
        if( this._nodes[i] ){
            callback(this._nodes[i]);
        }
    }
};
MinHeap.prototype.isFull = function (){
    return this._count == this._nodes.length-1;
};
MinHeap.prototype.isEmpty = function (){
    return this._count == 0;  
};
MinHeap.prototype.state = function (){
    return this._nodes.slice(0);
};
MinHeap.prototype.head = function (){
    return this._nodes[1];
};

/**
 * Bank Class
 */
function Bank(config){
    config = config||{};
    this.tellerHeap = new MinHeap(config.numTellers||0);
    this.customerQueue = new Queue();
    this.processedCount = 0;
    this.reporter = config.reporter||function(){};
    this.reportFrequency = config.reportFrequency||20;
}
/**
*   Pop the current customer (with the least time) off the top of the heap,
*    and then progress the service time of all other customers by the amount
*    of time remaining on that customer's service. Make it snappy!
*   
*   If there are any other customers with the same amount of service time,
*    we will pop them too.
*/
Bank.prototype.processCustomer = function (){
    //pop the head off the min heap and decrement the service time of all other custs in the heap
    this._progress(this.tellerHeap.pop().serviceTime);
    
    //Now we need to check if we should continue popping the head due to multiple service completions
    var head = this.tellerHeap.head();
    while(head && head.serviceTime === 0){
        //pop the head again and decrement service times
        this._progress(this.tellerHeap.pop().serviceTime);
        
        head = this.tellerHeap.head();
    }
};
Bank.prototype.queueCustomer = function (cust){
    this.customerQueue.queue(cust);
};
/**
 * Pull customers from a queue until the heap is full or we're out of customers
 */
Bank.prototype.dequeueCustomers = function (){
    while(!this.tellerHeap.isFull() && !this.customerQueue.isEmpty()){
        this.processedCount++;
        this.tellerHeap.push(this.customerQueue.dequeue());
        
        if( this._shouldLog() ){
            this.reporter(this.tellerHeap.state(), this.customerQueue.state());
        }
    }
};
Bank.prototype.isEmpty = function (){
    return this.customerQueue.isEmpty() && this.tellerHeap.isEmpty();
};
/*
*   Decrement the value of all customer service times by a fixed amount
*
*   ...I'm using progress as a verb here. This makes sense. Go with it.
*/
Bank.prototype._progress = function (duration){
    this.tellerHeap.each(function (customer){
        customer.serviceTime -= duration;
    });
};
Bank.prototype.report = function (){
    this.reporter(this.tellerHeap.state(), this.customerQueue.state());
};
Bank.prototype.isFull = function (){
    return this.tellerHeap.isFull();
};
Bank.prototype._shouldLog = function (){
    return this.processedCount%this.reportFrequency === 0;
};