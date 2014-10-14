RealTimePollSystem
==================

Apply "MEAN" stack to create a real time poll system.
Use MongoDB as the database storage.
Use Node.js and express.js to make the back end. 
Use Mongoose as the connection layer between Node.js and MongoDB.
Use Angular.js to do the front end.
Use Socket.io to do the real time voting.

So far, still buggy, user can create a new poll, add as many choices as he likes.
User can also vote for any polls stored in the DB. 
However, when user votes for one poll, the ip address can't be retrieved!!

I followed this method on stackoverflow, but it still does not work!
http://stackoverflow.com/questions/13573016/how-to-get-request-s-http-headers-with-socket-io
