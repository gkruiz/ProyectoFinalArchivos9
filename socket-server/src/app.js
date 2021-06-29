const app =require('express')();
const http =require('http').Server(app);
const io = require('socket.io')(http);



const documents={};



io.on("connection",socket=>{
	let previousId;
	
	const safeJoin = currentId=>{
		socket.leave(previousId);
		//socket.join(currentId,()=>console.log('Socket ${socket.id} joined room ${currentId}'));
		socket.join(currentId,()=>console.log('Socket '+socket.id+' joined room '+currentId));
		
		previousId=currentId;
	};
	




	socket.on(
	"getDoc",docId=>{
		safeJoin(docId);
		var temp=documents[docId];
		if(temp!=null){
			socket.emit("document",documents[docId]);
		}
		
	});
	
	socket.on("addDoc", doc => {
		
		var temp=documents[doc.id];
		if(temp==null){
			documents[doc.id] = doc;
			safeJoin(doc.id);
			io.emit("documents", Object.keys(documents));
			socket.emit("document", doc);
		}
	});

	socket.on("editDoc", doc => {
    documents[doc.id] = doc;
    socket.to(doc.id).emit("document", doc);
	});
  
	io.emit("documents", Object.keys(documents));
//console.log("Socket "+${socket.id} has connected`);
	console.log("Socket "+socket.id+" has connected");
	console.log(documents);
});


http.listen(4444, () => {
  console.log('Listening on port 4444');
});



















