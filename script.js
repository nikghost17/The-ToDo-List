let check = false;
let count = 1;
let completedTasks = 0; // Track completed tasks

const taskvalue = document.querySelector('.taskvalue');
const taskbar = document.querySelector('.taskbar');
const addtask = document.querySelector('.addtask');
const taskList = document.querySelector('.taskList');
const allTask = document.querySelector('.allTask');
const done = document.querySelector('.done');
const note = document.querySelector('.note');
const button = document.querySelector('.button');
const popup = document.querySelector('.popup');
const close = document.querySelector('.close')

function addStyle(circle,input)
{
    circle.style.backgroundColor = ' #48A300';
    input.style.color='#48A300'
    input.style.textDecoration='line-through'
}

function resetStyle (circle,input) {
    circle.style.backgroundColor = '';
    input.style.color='';
    input.style.textDecoration='';
    input.value='';
}

// Function to add click event listener to a circle
function addCircleClickListener(circle,input) {
  circle.addEventListener('click', () => {
    if(input.value=='')
      alert("Enter some task before");
    else
    {
      addStyle(circle,input);
      completedTasks++;
      updateTaskValue();
    }
  });
}

// Add event listener to the first circle (existing element)
const firstCircle = document.querySelector('.circle');
const fisrtinput = document.querySelector('.input');
addCircleClickListener(firstCircle,fisrtinput);

addtask.addEventListener('click', () => {
  const newTask = taskList.cloneNode(true);
  const newCircle = newTask.querySelector('.circle'); // Get circle from new task
  const inputValue = newTask.querySelector('.input'); // get input class

  resetStyle(newCircle,inputValue); // restet any inherited style

  addCircleClickListener(newCircle,inputValue);

  newTask.classList.add(`number${count}`);// giving each task unique class
  newTask.classList.remove(`number0`);
  allTask.append(newTask);

  count++;

  updateTaskValue(); // Update task value on new task addition
});

done.addEventListener('click', () => {
  if (count === 0) {
    alert('Please add some tasks before clicking Done.');
    return;
  }  

  // Ensure all tasks have been added before hiding note and button
  if (completedTasks===count) {  
    check = true;
    updateTaskValue();
    note.style.display = 'none';
    button.style.display = 'none';
    openclose();
  } else {
    alert('Please complete all tasks before marking as done.');
  }
});

function updateTaskValue() {
  const MAX_VALUE = taskbar.clientWidth; // Get taskbar width
  const percentage = Math.min((completedTasks / count) * 100, 100); // Limit percentage to 100
  const taskValueWidth = (percentage / 100) * MAX_VALUE; // Calculate taskvalue width
  taskvalue.style.width = `${taskValueWidth}px`;
}

function openclose(){
  popup.classList.add('open');
  close.addEventListener('click',()=>{
    popup.classList.remove('open');
  })

}
