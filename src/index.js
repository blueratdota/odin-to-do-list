import './style.css'
import {sampleFunction,
    toDoEntry,
    entryFolder} from "./createFunctions"

console.log('original index.js');
const testNew = new sampleFunction()
testNew.logger()

//UI STUFF
const content = document.querySelector(".content")

// NAV SIDE
const navAll = document.querySelector("#all")
const navToday = document.querySelector(".Today")
const navWeek = document.querySelector(".Week")

// MODAL
const addModal = document.querySelector(".add-modal")
const overlay = document.querySelector(".overlay")
const closeModal = document.querySelector("#close-modal")
const modalCurrentPage = document.querySelector("#modal-current-page")
const finalizeEntry = document.querySelector("#finalize-entry")
const inputRadio = document.querySelectorAll(".input-radio")

const titleModal = document.querySelector("#title")
const detailsModal = document.querySelector("#details")
const dateModal = document.querySelector("#date")

//EDIT MODAL
const closeEditModal = document.querySelector("#close-edit-modal")


// ADDING STUFF
const addEntry = document.querySelector("#add-entry")
const addOnCurrentPage = document.querySelector("#curret-page")


// add to array
const newEntry1 = new toDoEntry('sample 1','hidden details',"2026-1-11",'low',false)
const newEntry2 = new toDoEntry('sample 2','hidden details',"2024-5-10",'medium',false)
const newEntry3 = new toDoEntry('sample 3','hidden details',"2024-10-25",'high',false)
// const newEntry4 = new toDoEntry('sample 3','hidden details',new Date(2023, 1, 15),'high',false)



const startPage = (function(){
    const currentPage = 'All'
    modalCurrentPage.textContent = currentPage
    addOnCurrentPage.textContent = currentPage
})()


const generateContent = (function(){
    console.log('=== generate content ===');
    const theFolder = new entryFolder()
    const localDataArray = JSON.parse(localStorage.getItem('toDoEntry'))
    // load from local storage
    // store to entry folder
    // new entries - add to entry folder, then entry folder setitem to local storage
    // console.log(JSON.parse(localStorage.getItem('toDoEntry'))[1])

    for(let i in localDataArray){
        const _date = localDataArray[i].dueDate.split("-")

        const newEntry = new toDoEntry(
             localDataArray[i].title,
             localDataArray[i].details,
             localDataArray[i].dueDate,
             localDataArray[i].priority,
             localDataArray[i].inProject
             )
        
        theFolder.addEntry(newEntry)
    }
    
    localStorage.setItem('toDoEntry',JSON.stringify(theFolder.folderContent))
    // theFolder.addEntry(newEntry1)
    // theFolder.addEntry(newEntry2)
    // theFolder.addEntry(newEntry3)

    theFolder.loopThroughData(theFolder.folderContent)


    

    console.log(theFolder.folderContent);

    return{theFolder}

})()

// localStorage.setItem('toDoEntry',JSON.stringify(generateContent.theFolder.folderContent))

function addToLocalStorage(){
    localStorage.setItem('toDoEntry',JSON.stringify(generateContent.theFolder.folderContent))
}
addEntry.addEventListener('click',function(){
    console.log('check modal page');
    overlay.classList.remove("hidden")
    addModal.classList.remove("hidden")
})
closeModal.addEventListener('click',function(){
    clrclsModal()
})

function clrclsModal(){
    document.querySelector(".add-form").reset() 
    overlay.classList.add("hidden")
    addModal.classList.add("hidden")
}

finalizeEntry.addEventListener('click',function(){
    const _title = titleModal.value
    const _details = detailsModal.value
    // const _date = dateModal.value.split("-")
    const _date = dateModal.value
    const _radio = (function(){
        for(let i=0; i<3; i++){
            if(inputRadio[i].checked){
                return inputRadio[i].value
            }
        }      
    })()
    const inProject = !modalCurrentPage.textContent=="All"
    const newEntry = new toDoEntry(_title,_details,_date,_radio,inProject)
    if(_title!="" && _date!="" && _radio!=undefined ){
        //adds the created entry in the modal to the folder
        generateContent.theFolder.addEntry(newEntry)
        //runs the loop through folder function and generate things in the content
        generateContent.theFolder.loopThroughData(generateContent.theFolder.folderContent)
        //after adding it to the folder, it adds it to the local storage
        addToLocalStorage()
        //clears the modal
        clrclsModal()
        console.log(generateContent.theFolder.folderContent);
        //function that clears entrey fields
        //add execute only if all fields have entry
    }
    else{
        console.log('cannot finalize');
    }


})

//create a function for save edit
//removes the entry from the folder and the local data
//if close is pressed, saves the original data. if save-edit, adds the edited data

navAll.addEventListener("click",function(){//FOR TESING PURPOSES ONLY!!!
    console.log(generateContent.theFolder.folderContent)
    console.log(JSON.parse(localStorage.getItem('toDoEntry')));
})

