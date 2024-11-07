# limit-task

Run async tasks in parallel with a maximum limit

## Installation

```sh
npm install limit-task
```

or using yarn

```sh
yarn add limit-task
```

## Basic Usage

```js
import LimitTask from "limit-task";

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
```

the above code will execute maximum of 2 task concurrently. The log output will be as follows:

- --> `first tasks added`
- --> `second tasks added`
- --> one seconds delay
- --> `second tasks completed`
- --> `third tasks added`
- --> one seconds delay
- --> `first tasks completed`
- --> two seconds delay
- --> `third tasks completed`
