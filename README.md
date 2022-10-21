# Typescript and AOC

All of you have heard me rant extensively about JavaScript's problems. Its rushed development, its questionable design decisions, and its unhelpful error messages among other things. The behavior of JavaScript itself can't be changed because that would break backwards compatibility and while efforts have been made to replace JS with something that *isn't* a trash fire none of those have succeeded yet. So how can we solve this problem? Well we can add a bunch of automated sanity checks that are run before the code is executed. What we need is...

## A Type System

A lot of languages are what we call "statically typed". In a statically typed language when you create a variable you specify its type. If you specify its an integer and then try to do anything with that variable that isn't consistent with it being an integer (like assigning a string to it) the compiler will yell at you and produce an error.

Type checking makes whole classes of errors impossible. While compiler errors might be baffling and disheartening to new programmers the longer I spend writing code the more I come to crave the assurances of a strict compiler. So, how do we add it to JS?

## Hello TypeScript!

Create a directory for our code and within that directory create a file called `hello.ts`. Input the following.

```ts
const greeting: string = 'Hello TypeScript!';
console.log(greeting);
```

That sure does look a lot like JS. This is pretty much the 'hello world' code you'll typically find because it shows off type annotations. We have specified that the variable `greeting` is of type `string`. So how do we run it?

## Compiling and Interpreting TypeScript

Assuming you have `Node.js` installed already installing typescript is just three commands away:

```
npm install -g typescript
npm install -g ts-node
npm install -D tslib @types/node
```

The first installs `tsc`, the TypeScript Compiler. The second installs `ts-node` which lets us run TS scripts directly. The third one supplies `ts-node` with the type information needed to import the standard library.

We can compile our script like so:

```
tsc hello.ts
```

That produces a file called `hello.js`. If we open it up we can inspect its thrilling contents.

```js
const greeting = 'Hello TypeScript!';
console.log(greeting);
```

We can of corse run this script with `node hello.js`. But because we installed `ts-node` we can run the TS file directly like so:

```
ts-node hello.ts
```

And it'll work fine without generating an intermediate JS file. There are benefits and drawbacks to both but we'll be using the `ts-node` approach for our purposes.

## Functions

Let's write a less trivial program. Let's write a function that raises a number to the power of another number.

```ts
function power(a: number, b: number): number{}
```

Here we've made the scaffolding of a function. It's called `power` and it has two parameters `a` and `b`. Notice that those parameters have type annotations, we're specifying they are numbers. After the parameters we have another type signature where we specify what type the function will return. We'll talk about type inference in a moment and you usually don't *have* to specify a function's return type but it's a good practice moving forward. If you're following along you'll notice that that last `number` type annotation is underlined in red. That's because our function doesn't return anything yet! Let's finish the function.

```ts
function power(a: number, b: number): number{
    let acc = 1;
    for(let i = 0; i < b; i++){
        acc *= a;
    }
    return acc;
}

console.log(power(5, 3));
```

This function should seem pretty straightforward. We have an accumulator and we multiply it by `a` a number of times equal to `b`. Notice though, I haven't specified the types of `acc` or `i`. This is type inference in action. If you hover over those variables you'll see VS code is able to display they are both numbers.

Now that we have that out of the way, let's do some Advent of Code!

For further reading about TS and its type system [this](https://www.tutorialspoint.com/typescript/index.htm) is a pretty good tutorial.

## Advent of Code

Every year for every day of Advent (that is to say the first 25 days of December) AOC releases a new two part programming puzzle. They start out relatively easy and beginner friendly at the start of the month and get progressively more difficult as the month wears on.

A big part of why I like it over the alternatives is that it is set up to be entirely language agnostic. The way it works is the puzzles are the same for everyone but each person has personalized *puzzle input*. So given your input and a working solution you simply type the answer into the web page. You can do it in any language or even by hand if you want. The puzzles are also quite fun and well written. I have chosen a selection of my favorites from last year that we can work on together.

I've written a little utility script to help me set up the problems. I'll just run `ts-node ad.ts 2021 1` to get started.

It's created three files: `d1-i.txt`, `d1-pt1.ts`, and `d1-pt2.ts`. The first one is for our puzzle input, the latter two are for our solutions for part 1 and 2 respectively. If you open part 1 you'll find the following starter code:

```ts
import * as fs from 'fs';

function main(text: string): void{
    // Solution here.
}

main(fs.readFileSync('./2021/d1-i.txt', {encoding: 'utf-8'}));
```

The first line lets us import `fs`, the built in file system module. We have our `main` function which accepts our puzzle input as text and returns `void`, in other words it returns nothing. Finally we call main with the contents of `d1-i.txt`. I talked about reading and writing to files last spiel but you shouldn't have to worry about it much now. Let's read the puzzle together and get our input.

Almost always the puzzles have sample input that we can use to test we are indeed getting the correct solution. Let's input that first as we work on the problem. Then we'll try it again with the full data set.

One more thing: While working on these problems you'll find yourself solving similar problems over and over again, like getting the puzzle input cleanly split up into lines. I encourage you to create a file with a bunch of useful functions in it that you can import as needed.

You'll find the reference solutions folder which, you know, has reference solutions for the puzzles we'll be talking about. Note that you'll want to run those in the `referenceSolutions` directory for all the paths to work.

Happy coding!