# csce4444-hw1
#### Author: Derek Surguy (DerekSurguy@my.unt.edu)
#### Overview
In the programming language of your choice, simulate the experience of a day’s business at a bank. Your implementation must make use of a min-heap, and must fit the following criterion:

#### Criteria
1. At program launch, it will query the user for the number of tellers working that day. There must be at least four tellers, and no more than ten tellers. If a number is passed in outside of those bounds, have your program round up to four or down to ten as appropriate for the input. Your tellers will be represented by the min-heap of a size equal to the number of tellers.
2. To start the simulation generate 100-200 customers randomly, and place them in a queue. Each customer will have a total service time that it will take to conclude their business.
3. Dequeue customers from the queue into your min-heap until it is full. The customer service time is the metric which will be used to balance the heap.
4. Pop the top customer off of your heap, and decrement the service time for all customers remaining in the heap. If a customer which is still in the heap has their service time reach 0 in this process, remove that customer from the heap. 
5. Populate the heap back to maximum capacity through dequeueing from your queue
6. Repeat steps 4 and 5 until both the heap and queue are empty.
7. Every 20 customers that pass out of the queue, print the current status of the queue (how many customers are left), and print the current composition of the heap.

