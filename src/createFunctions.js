import {format} from "date-fns"
import { el } from "date-fns/locale";

class sampleFunction{
    logger(){
        thisLogs();
    }
}

function thisLogs(){
    console.log('this logs');
}



class createEntry{
    constructor(title,details,dueDate,priority){
        this.title = title
        this.details = details
        this.dueDate = dueDate
        this.priority = priority
    }

    constructEntry(div){
        const createEntryDiv = document.createElement("entry")

        const createPrioContainer = document.createElement("div")
        createPrioContainer.classList.add("priority-container")

        const makePrioCircle = document.createElement("div")
        makePrioCircle.classList.add("priority")
        makePrioCircle.style.backgroundColor = "blue"
        createPrioContainer.appendChild(makePrioCircle)

        




        // div.appendChild(createPrioContainer)
    
    }

}

export {sampleFunction,createEntry}