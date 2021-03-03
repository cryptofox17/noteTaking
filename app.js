let counter=0;
// If a user adds a note, it gets added to the localStorage 
showNotes();

//Adding a new note
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById('addTxt'); //placeholder 
    let addTitle = document.getElementById('addTitle');
    if (addTitle.value != "" && addTxt.value !="")
    {

    
    let notes = localStorage.getItem('notes');
    let d = new Date();
    let datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +d.getHours() + ":" + d.getMinutes();
    if (notes == null) //item notes is not present 
    {
        notesObj = [];
    }
    else 
    {
        notesObj = JSON.parse(notes);
    }
    let obj = {
        title: addTitle.value,
        text: addTxt.value,
        time: datestring,
        noteloc: counter 
    }
    counter++;
    notesObj.push(obj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value="";
    // console.log(notesObj);
    showNotes();
 }
 else 
 {
     //
 }

})

function showNotes()
{
    let notes =localStorage.getItem('notes');
    if (notes == null) //item notes is not present 
    {
        notesObj = [];
    }
    else 
    {
        notesObj = JSON.parse(notes);
    }
    let html ="";

    notesObj.forEach(function(element, index){
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 240px;">
        <div class="card-body">
          <h5 class="card-title" style="font-weight:600">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <small> ${element.time} </small>
          <hr>
          <div class="button-container">
          <button id="${index}" onclick="deleteNote(this.id)" class="btn">  <i class="fa fa-trash"></i></button>
          <button class="starBtn btn" onclick="markNote(${index})">  <i class="fa fa-star"></i></button>
          </div>
        </div>
      </div>
        `

    })

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0)
    {
        notesElm.innerHTML = html;
    }
    else 
    {
        notesElm.innerHTML = `You have no notes yet!`;
    
    }

}

//Function to DeLete Note

function deleteNote(index)
{
//  console.log("deleted", index);

 let notes =localStorage.getItem('notes');
    if (notes == null) //item notes is not present 
    {
        notesObj = [];
    }
    else 
    {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


//Function to mark Note
function markNote(index)
{
    let targetEl= document.getElementById(index);
    targetEl.parentElement.parentElement.classList.toggle('mark-imp');


}

//Function to search notes

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){

        let cardTxt =element.getElementsByTagName("p")[0].innerText.toLocaleLowerCase();
        let cardTitle= element.getElementsByTagName("h5")[0].innerText.toLocaleLowerCase();
        if(cardTxt.includes(inputVal) || cardTitle.includes(inputVal))
        {
            element.style.display ="block";
        }
        else 
        {
            element.style.display ="none";
        }
    })
})

//Toggle Theme 
let toggleBtn = document.querySelector('.toggle');
toggleBtn.addEventListener("click",(e)=>{
    document.body.classList.toggle('dark-body');
    document.querySelector('.card').classList.toggle('dark-card');
    // let noteCards = document.getElementsByClassName('noteCard');
    // Array.from(noteCards).forEach(function(element){
    //      element.getElementsByTagName("div")[0].classList.toggle('dark-card');
    // })
    document.querySelector("nav").classList.toggle('dark-navbar');
    document.getElementById("notes").classList.toggle('dark-text-inner');
    document.querySelector("h1").classList.toggle('h1-dark');

});
//Toggle 
//Add Title 
//Mark as important 
//date and time of creation
