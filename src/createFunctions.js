import {format} from "date-fns"
import { el } from "date-fns/locale";
import editIcon from './file-edit-outline.svg'
import deleteIcon from './trash-can-outline.svg'

class sampleFunction{
    logger(){
        thisLogs();
    }
}

function thisLogs(){
    console.log('this logs');
}

const entryReference = []

class toDoEntry{
    constructor(title,details,dueDate,priority,inProject){
        this.title = title
        this.details = details
        this.dueDate = dueDate
        this.priority = priority
        this.displayStatus
        this.inProject = inProject
        this.project
    }
}

class entryFolder{
    constructor(){
        this.folderContent = []
    }

    addEntry(theArray){
        this.folderContent.push(theArray);
    }

    loopThroughData(dataArray){
        for (let i in dataArray){
            const entryData = dataArray[i]
            if(entryData.displayStatus!="display"){
                console.log(`${entryData.title} is displayed`);
                this.constructEntry(entryData)
                entryData.displayStatus = "display"
            }
            else{
                console.log(`${entryData.title} is already displayed`);
            }
        }

    }

    refreshContent(){

    }

    priorityColor(priority){
        const prioColor = {'low':'green','medium':"yellow",'high':'red'}
        return prioColor[priority]
    }

    constructEntry(data){
        const content = document.querySelector(".content")

        const createEntryDiv = document.createElement("div")
        createEntryDiv.classList.add('entry')

        // prio container div
        const createPrioContainer = document.createElement("div")
        createPrioContainer.classList.add("priority-container")
        const makePrioCircle = document.createElement("div")
        makePrioCircle.classList.add("priority")
        makePrioCircle.style.backgroundColor = this.priorityColor(data.priority) //output

        createPrioContainer.appendChild(makePrioCircle)

        // text container div
        const createTextContainer = document.createElement('div')
        createTextContainer.classList.add('text-container')
        const checkBox = document.createElement('input')
        checkBox.name = 'done'
        checkBox.classList.add('done-status')
        checkBox.type = "checkbox"
        const titleText = document.createElement('p')
        titleText.classList.add('text')
        titleText.textContent = data.title //output

        createTextContainer.appendChild(checkBox)
        createTextContainer.appendChild(titleText)

        // buttons area
        const createButtons = document.createElement('div')
        createButtons.classList.add('buttons')
        const date = document.createElement('p')
        date.classList.add('date')
        date.textContent = format(new Date(data.dueDate), "MM/dd/yyyy") //output
        const editBtn = document.createElement('img')
        editBtn.classList.add('svg-icon','edit')
        editBtn.src = editIcon
        const deleteBtn = document.createElement('img')
        deleteBtn.classList.add('svg-icon','delete')
        deleteBtn.src = deleteIcon

        const _folderData = this.folderContent
        const refreshContent = this.loopThroughData

        //button function
        deleteBtn.addEventListener('click',function(){
            // console.log(_folderData);
            // console.log(_folderData.indexOf(data));
            // console.log(JSON.parse(localStorage.getItem('toDoEntry')))
            // console.log(JSON.parse(localStorage.getItem('toDoEntry')).indexOf(data));
            content.removeChild(createEntryDiv)
            _folderData.splice(_folderData.indexOf(data),1)
            localStorage.setItem('toDoEntry',JSON.stringify(_folderData))
            refreshContent(_folderData)

            console.log(_folderData);
        })
        editBtn.addEventListener('click',function(e){
            const overlay = document.querySelector(".overlay")
            const editModal = document.querySelector(".edit-modal")
            const closeEditModal = document.querySelector("#close-edit-modal")

            closeEditModal.addEventListener('click',function(){
                console.log('CLOSE EDIT MODAL');
                document.querySelector(".edit-form").reset()
                overlay.classList.add("hidden")
                editModal.classList.add("hidden")

            })
            console.log('check modal page');
            overlay.classList.remove("hidden")
            editModal.classList.remove("hidden")

            //make all entry fields equal to the data
            
        })

        createButtons.appendChild(date)
        createButtons.appendChild(editBtn)
        createButtons.appendChild(deleteBtn)
        
        createEntryDiv.appendChild(createPrioContainer)
        createEntryDiv.appendChild(createTextContainer)
        createEntryDiv.appendChild(createButtons)
        
        return content.appendChild(createEntryDiv)
    }
    // testFunction(){
    //     console.log('test function');
    //     console.log(this.priorityColor(this.priority));
    // }

}


export {
    sampleFunction,
    toDoEntry,
    entryFolder}