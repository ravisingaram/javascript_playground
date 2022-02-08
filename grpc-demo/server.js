const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:40000",
 grpc.ServerCredentials.createInsecure());

server.addService(todoPackage.Todo.service,
    {
        "createTodo": createTodo,
        "readTodos" : readTodos,
        "readTodosStream": readTodosStream,
        "createPrompt": createPrompt,
        "optionSelection": optionSelection,
        "choice": choice
    });
server.start();

const todos = []
function createTodo (call, callback) {
    const todoItem = {
        "id": todos.length + 1,
        "text": call.request.text}
    todos.push(todoItem)
    callback(null, todoItem);
}

function readTodosStream(call, callback) {
    
    todos.forEach(t => call.write(t));
    call.end();
}

function readTodos(call, callback) {
    callback(null, {"items": todos})   
}

function createPrompt(call, callback) {
    prompt1 = {
        "Qn1": "Which category do you prefer? A - Food or B - Clothes?\n"
    }
    callback(null, prompt1);
    // const todoItem = {
    //     "id": todos.length + 1,
    //     "text": call.request.text}
    // todos.push(todoItem)
    // callback(null, todoItem);
}

function optionSelection(call, callback) {
    //console.log(call.request.options)
    result = null
    if (call.request.options == "A") {
        result = {
            "category": "1. Tea\n2. Coffee?\n"
        }

    }
    else if (call.request.options == "B") {
        result = {
            "category": "1. Towel\n2. Bedsheet?\n"
        }
    }
    callback(null, result);
}
function choice(call, callback) {
    output = null
    if (call.request.options == "A") {
        if (call.request.selection == "1") {
            output = {
                "output": "Tea"
            }
        }
        else if (call.request.selection == "2") {
            output = {
                "output": "Coffee"
            }
        }
    }
    else if (call.request.options == "B") {
        if (call.request.selection == "1") {
            output = {
                "output": "Towel"
            }
        }
        else if (call.request.selection == "2") {
            output = {
                "output": "Bedsheet"
            }
        }
    }
    callback(null, output);
}