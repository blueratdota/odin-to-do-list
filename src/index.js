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


// ADDING STUFF
const addEntry = document.querySelector("#add-entry")
const addOnCurrentPage = document.querySelector("#curret-page")


// add to array
const newEntry1 = new toDoEntry('sample 1','hidden details',new Date(2025, 1, 11),'low')
const newEntry2 = new toDoEntry('sample 2','hidden details',new Date(2024, 10, 10),'medium')
const newEntry3 = new toDoEntry('sample 3','hidden details',new Date(2023, 1, 15),'high')

const startPage = (function(){
    const currentPage = 'All'
    modalCurrentPage.textContent = currentPage
    addOnCurrentPage.textContent = currentPage
})()


const generateContent = (function(){
    console.log('=== generate content ===');
    const theFolder = new entryFolder()
    theFolder.addEntry(newEntry1)
    theFolder.addEntry(newEntry2)
    theFolder.addEntry(newEntry3)

    theFolder.loopThroughData(theFolder.folderContent)
    theFolder.loopThroughData(theFolder.folderContent)

    console.log(theFolder.folderContent);

    return{theFolder}

})()

addEntry.addEventListener('click',function(){
    console.log('check modal page');
    overlay.classList.remove("hidden")
    addModal.classList.remove("hidden")
})

closeModal.addEventListener('click',function(){
    overlay.classList.add("hidden")
    addModal.classList.add("hidden")
})

finalizeEntry.addEventListener('click',function(){
    const _title = titleModal.value
    const _details = detailsModal.value
    const _date = dateModal.value.split("-")
    // console.log(inputRadio[0]);
    // console.log(inputRadio[1]);
    // console.log(inputRadio[2]);
    const _radio = (function(){
        for(let i=0; i<3; i++){
            if(inputRadio[i].checked){
                return inputRadio[i].value
            }
        }      
    })()

    // console.log(`${_title} === ${_details} === ${_date} === ${_radio}`);
    const newEntry = new toDoEntry(_title,_details,new Date(_date[0], _date[1],_date[2]),_radio)

    generateContent.theFolder.addEntry(newEntry)
    generateContent.theFolder.loopThroughData(generateContent.theFolder.folderContent)
    
    console.log(generateContent.theFolder.folderContent);

    //function that clears entrey fields
    //add execute only if all fields have entry
})













// newEntry1.constructEntry(content)
// newEntry2.constructEntry(content)
// newEntry3.constructEntry(content)



//most of the stuff here are for ui controls