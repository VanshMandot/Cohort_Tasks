const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
.name('TODO_File')
.description('To store users todo')
.version('0.8.0')

program.command('add')
.description('Adds todo to the file')
.argument('<todo...>','Todo Text')
.action((todo) => {
    const file = "data.txt";
    fs.appendFile(file,todo.join(' ')+'\n',(err)=>{
        if(err){
            console.log(err);
        }
    })
});

program.command('delete')
.description('Deletes last todo from the file')
.argument('<int>','Todo number which has to be deleted')
.action((number) => {
    const file = "data.txt";

    fs.readFile(file,'utf-8',(err,data)=>{
        if(err){
            console.log(err);
            return;
        }

    const todos = data.trim().split('\n');
    if(todos.length>0){
        todos.splice(number-1,1);

        const updatedData = todos.join('\n');

        fs.writeFile(file,updatedData+'\n',(err)=>{
            if(err){
                console.log(err);
            }
        })
    }
});
})

program.command('done')
.description('Marks todo as done')
.argument('<int>','Todo number which has been completed')
.action((number) => {
    const file = "data.txt";

    fs.readFile(file,'utf-8',(err,data)=>{
        if(err){
            console.log(err);
            return;
        }

    const todos = data.trim().split('\n');
    if(todos.length>=number-1){
        todos[number-1] += ' ----> Done';

        const updatedData = todos.join('\n');

        fs.writeFile(file,updatedData+'\n',(err)=>{
            if(err){
                console.log(err);
            }
        })
    }
});
})
program.parse();
