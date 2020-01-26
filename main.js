#!/usr/bin/env node

const fs = require("fs");
let l = fs.readFileSync(process.argv[2] || "memory.log").toString();
const path = require('path');
let root = path.dirname(require.main.filename);
let config = JSON.parse(fs.readFileSync(path.join(root, "config.json")).toString());
const NEW = config["new"];
const DELETE = config["delete"];

class Stream {
    constructor(content) {
        this.content = content;
        this.i = 0;
    }
    getline() {
        let line = "";
        for (; this.i < this.content.length; this.i++) {
            if (this.content[this.i] === "\n") {
                this.i++;
                break;
            }
            line += this.content[this.i];
        }
        return line;
    }
    hasNext() {
        return this.i < this.content.length;
    }
}

let log = new Stream(l);
let memory = {};
let c = 0;

while (log.hasNext()) {
    c++;
    console.log(log.hasNext());
    let message = log.getline();
    message = message.replace(/#.+/g, "");
    if (message.indexOf(NEW + "0x") > -1) {// 申请新内存
        let adr = message.substring(NEW.length + message.indexOf(NEW + "0x"));
        // console.log(adr);
        memory[adr] = c;
    } else if (message.indexOf(DELETE + "0x") > -1) {
        let adr = message.substring(DELETE.length + message.indexOf(DELETE + "0x"));
        // console.log(adr);
        memory[adr] = 0;
    } else c--;
}

let n = 0;
for (let i in memory) {
    if (memory[i]) {
        console.log(i, memory[i]);
    }
    n++;
}
console.log("Memory Unit Count:", n);
