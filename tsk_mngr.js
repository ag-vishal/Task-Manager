// Get references to all input fields, buttons, and table
let ipr = document.querySelectorAll("input");
let sr = document.querySelector("select");
let tr = document.querySelector("textarea");
let btnr = document.querySelectorAll("button");
let tblr = document.querySelector("table");
let edit_index = -1;

// Add new task to localStorage
let add = () => {
  let obj = {
    uid: ipr[0].value,
    task: tr.value,
    dept: sr.value,
    dl: ipr[1].value,
  };

  // Fetch existing tasks or initialize empty array
  let arr = localStorage.getItem("arr");
  arr = arr ? JSON.parse(arr) : [];
  arr.push(obj);
  localStorage.setItem("arr", JSON.stringify(arr));

  // Clear inputs
  ipr[0].value = "";
  ipr[1].value = "";
  sr.value = "";
  tr.value = "";
  disp();
};

// Display tasks in the table
function disp() {
  let arr = localStorage.getItem("arr");
  if (arr) {
    arr = JSON.parse(arr);
    let s = `
      <tr>
        <th>UID</th>
        <th>Task</th>
        <th>Dept</th>
        <th>Deadline</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>`;
    arr.forEach((task, i) => {
      s += `
        <tr>
          <td>${task.uid}</td>
          <td>${task.task}</td>
          <td>${task.dept}</td>
          <td>${task.dl}</td>
          <td><button onclick="edit(${i})">Edit</button></td>
          <td><button onclick="del(${i})">Delete</button></td>
        </tr>`;
    });
    tblr.innerHTML = s;
  } else {
    tblr.innerHTML = "<tr><td colspan='6'>No Tasks To Display</td></tr>";
  }
}

// Edit existing task
function edit(ind) {
  let arr = JSON.parse(localStorage.getItem("arr"));
  ipr[0].value = arr[ind].uid;
  tr.value = arr[ind].task;
  sr.value = arr[ind].dept;
  ipr[1].value = arr[ind].dl;

  // Toggle buttons
  btnr[0].style.display = "none";
  btnr[1].style.display = "inline-block";

  edit_index = ind;
}

// Delete a task
function del(ind) {
  let arr = JSON.parse(localStorage.getItem("arr"));
  arr.splice(ind, 1);
  if (arr.length > 0) {
    localStorage.setItem("arr", JSON.stringify(arr));
  } else {
    localStorage.removeItem("arr");
  }
  disp();
}

// Update task after editing
function upd() {
  let arr = JSON.parse(localStorage.getItem("arr"));
  arr[edit_index] = {
    uid: ipr[0].value,
    task: tr.value,
    dept: sr.value,
    dl: ipr[1].value,
  };
  localStorage.setItem("arr", JSON.stringify(arr));

  // Reset form and toggle buttons
  btnr[1].style.display = "none";
  btnr[0].style.display = "inline-block";
  ipr[0].value = "";
  ipr[1].value = "";
  tr.value = "";
  sr.value = "";

  disp();
}

// Display data on page load
disp();
