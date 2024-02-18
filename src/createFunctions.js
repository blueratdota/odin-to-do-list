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
    constructor(title,details,dueDate,priority){
        this.title = title
        this.details = details
        this.dueDate = dueDate
        this.priority = priority
        this.displayStatus
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
        date.textContent = format(data.dueDate, "MM/dd/yyyy") //output
        const editBtn = document.createElement('img')
        editBtn.classList.add('svg-icon','edit')
        editBtn.src = editIcon
        const deleteBtn = document.createElement('img')
        deleteBtn.classList.add('svg-icon','delete')
        deleteBtn.src = deleteIcon

        //testing functionallity
        editBtn.addEventListener('click',function(e){
            console.log(`${data.title} is the title`);
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