const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

//const text = process.argv[2];



const client = new todoPackage.Todo("localhost:40000", 
grpc.credentials.createInsecure())
//console.log(text)

// client.createTodo({
//     "id": -1,
//     "text": text
// }, (err, response) => {

//     console.log("Recieved from server " + JSON.stringify(response))

// })
/*
client.readTodos(null, (err, response) => {

    console.log("read the todos from server " + JSON.stringify(response))
    if (!response.items)
        response.items.forEach(a=>console.log(a.text));
})
*/

// const call = client.readTodosStream();
// call.on("data", item => {
//     console.log("received item from server " + JSON.stringify(item))
// })

// call.on("end", e => console.log("server done!"))

client.createPrompt(null, (err,response) => {
    
    //console.log("Server asks " + JSON.stringify(response))
    const readline = require('readline-sync');
    options = readline.question(response.Qn1);
    //console.log(options)
    client.optionSelection({

        "options": options
    }, (err, response) => {
            selection = readline.question(response.category);
            client.choice({
                "options": options,
                "selection": selection
            }, (err, response) => {
                console.log("your order for " + response.output + " is placed. We will get it to you soon ")
            }
            )
    }
    )
   
})



