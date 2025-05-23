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
# Create Url shortner 
-using nanoid and shortid
-create  short url by bitly of any website.
# server side rendering
-html server per render hota hain ese bolte hain server side rendring
-templating engins EJS-Embedded javascript templating,Pug,handlebars
-ye engins humare liye server side render ka kaam krte hain
-statefull authentication- agar server restart hota hain toh sare user logout ho jate hain,
- statefull authentication memory intensive hota hain means server ki memory use krta hain (limite momory on server )
-stateless Authentication - token ke ander data rakhte hain read koi bhi kr ske but koi change na kr sake .
-cookie - cookie server banata hain (eske andar kisi bhi tarah ka data save  rakhte hain) cookie ko browser store kr lete hain.
-cookie - domain specefic and domain attached hoti hain.
-cookie - domain name set kr skte hain and expiry date set kr skte hain.

