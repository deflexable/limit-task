const LimitTask = require("./index");

const wait = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

const queue = LimitTask(2);

queue(async () => {
    console.log("first tasks added");

    await wait(2000);
    console.log("first tasks completed");
});

queue(async () => {
    console.log("second tasks added");

    await wait(1000);
    console.log("second tasks completed");
});

queue(async () => {
    console.log("third tasks added");

    await wait(3000);
    console.log("third tasks completed");
});