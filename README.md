# Architecture of node js 
-user (client) make a request a server
-request go to in Event Queue
-event loop continuesly watch on event Queue
-two type task Blocking and non Blocking operation.
-Blocking opertion  -- i need a thread /worker(thread pool) (assign a worker and make him work).
-thread(like worker) by default 4 thread 
-default thread pool size-4
-maximum thread pool create  based on cpu core 
-like max -8core cpu - maximum create thread 8