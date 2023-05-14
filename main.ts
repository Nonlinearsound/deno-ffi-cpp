const lib = Deno.dlopen("test.dll",{
    HelloWorld: {
        parameters: [],
        result: "void",
    },
    sleep: {
        parameters: ["u32"],
        result: "void",
        nonblocking: true,
    },
    sendMessage: { 
        parameters: ["buffer"],
        result: "buffer",
    },

    mousePos: {
        parameters: ["buffer"],
        result: "void",
        nonblocking: false,
    }
});

lib.symbols.HelloWorld();

// use sleep in another thread by providing nonblocking:true in ldopen
// we can use await in this thread ot wait until that threat exits, if we like
console.log("before sleep");
await lib.symbols.sleep(200);
console.log("after sleep");

// testing passing a char pointer to the sendMessage function
const ptr = new TextEncoder().encode("Hello World from TextEncoder as UInt8Array\0");

// Thisdoes not work as Deno uses Web APIs rather than Nodejs APIs
// so we stick with TextEncoder
// let arr: Uint8Array = new Deno.Buffer("Hello World from raw *UInt8Array").bytes();
// lib.symbols.sendMessage(arr);

//const ret = lib.symbols.sendMessage(ptr);
const str = new Deno.UnsafePointerView( lib.symbols.sendMessage(ptr) ).getCString();
console.log("Return: ",str);

// testing providing an int array as input to the mousePos function
let arr = new Int32Array(2);
arr[0]=1;
arr[1]=1;
console.log("Array before:",arr);
lib.symbols.mousePos(arr);
console.log("Array after: ",arr);

lib.close();

// Deno wants us to export something to be able to use await in top level code
export {};