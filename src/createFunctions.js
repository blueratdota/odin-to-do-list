import {format} from "date-fns"
import { el, mk } from "date-fns/locale";
import editIcon from './file-edit-outline.svg'
import deleteIcon from './trash-can-outline.svg'
import { generateContent } from "./index";


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
        // function addFunctionToSvg(){
        //     const editSvg = document.querySelectorAll(".svg-icon.edit")
        //     for(let i=0; i<editSvg.length; i++){
        //         editSvg[i].addEventListener('click',function(){
        //             console.log(`click ${i}`);
        //         })
        //     }
        // }
        // addFunctionToSvg()

    }

    priorityColor(priority){
        const prioColor = {'low':'green','medium':"yellow",'high':'red'}
        return prioColor[priority]
    }

    reversePriorityColor(){
        const prioColor = {'low':'green','medium':"yellow",'high':'red'}
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
            content.removeChild(createEntryDiv)
            _folderData.splice(_folderData.indexOf(data),1)
            localStorage.setItem('toDoEntry',JSON.stringify(_folderData))
            refreshContent(_folderData)

            console.log(_folderData);
        })


        editBtn.addEventListener('click',function(e){

            function clearEditModal(){
                document.querySelector(".edit-form").reset()
                overlay.classList.add("hidden")
                editModal.classList.add("hidden")
            }
            
            
            const body = document.querySelector('body')

            const mkEditModal = document.createElement('div')
            mkEditModal.classList.add('edit-modal')
            const mkForm = document.createElement('form')
            mkForm.classList.add('edit-form')
            mkForm.action = ""
            mkForm.setAttribute('onsubmit','return false')

            const modalHeader = document.createElement('div')
            modalHeader.classList.add('edit-modal-header')
            const headerTitle = document.createElement('h2')
            headerTitle.textContent = 'Edit Entry: '
            const headerSpan = document.createElement('span')
            headerSpan.setAttribute('id','modal-current-entry')
            const closeBtn = document.createElement('img')
            closeBtn.setAttribute('id','close-edit-modal')
            closeBtn.src = "./close-circle-outline.svg"
            headerTitle.appendChild(headerSpan)
            modalHeader.appendChild(headerTitle)
            modalHeader.appendChild(closeBtn)

            const typeArea = document.createElement('div')
            typeArea.setAttribute('class','type-area')

            const inputTitleArea = document.createElement('input')
            inputTitleArea.setAttribute('class','input')
            inputTitleArea.setAttribute('type','text')
            inputTitleArea.setAttribute('id','edit-title')
            inputTitleArea.setAttribute('placeholder',"Title: Clean my wardrobe")
            inputTitleArea.setAttribute('required','')
            inputTitleArea.setAttribute('maxlength','50')
            typeArea.appendChild(inputTitleArea)
            const detailsTextArea = document.createElement('textarea')
            detailsTextArea.setAttribute('name','details')
            detailsTextArea.setAttribute('id','edit-details')
            detailsTextArea.setAttribute('cols','30')
            detailsTextArea.setAttribute('rows','10')
            detailsTextArea.setAttribute('placeholder','Details: fold shirts, iron uniform')
            detailsTextArea.setAttribute('required','')
            detailsTextArea.setAttribute('maxlength','400')
            typeArea.appendChild(detailsTextArea)

            const dateInputDiv = document.createElement('div')
            dateInputDiv.setAttribute('class','date-input-div')
            const dueDateText = document.createElement('p')
            dueDateText.textContent = 'Due Date: '
            const dateInput = document.createElement('input')
            dateInput.setAttribute('class','input-date')
            dateInput.setAttribute('type','date')
            dateInput.setAttribute('id','edit-date')
            dateInput.setAttribute('required','')
            dateInputDiv.appendChild(dueDateText)
            dateInputDiv.appendChild(dateInput)
            typeArea.appendChild(dateInputDiv)

            const modalBottom = document.createElement('div')
            modalBottom.setAttribute('class','modal-bottom')

            const priorityDiv = document.createElement('div')
            priorityDiv.setAttribute('class','input-priority')
            const priorityText = document.createElement('p')
            priorityText.textContent = 'Priority:  '
            priorityDiv.appendChild(priorityText)

            const priorityOptions = document.createElement('div')
            priorityOptions.setAttribute('class','priority-options')

            const lowPrio = document.createElement('input')
            lowPrio.setAttribute('type','radio')
            lowPrio.setAttribute('id','edit-low-priority-radio')
            lowPrio.setAttribute('class','edit-input-radio')
            lowPrio.setAttribute('name','priority-radio')
            lowPrio.setAttribute('value','low')
            lowPrio.setAttribute('required','')
            const lowPrioLabel = document.createElement('label')
            lowPrioLabel.setAttribute('for','edit-low-priority-radio')
            lowPrioLabel.setAttribute('class','low-priority')
            lowPrioLabel.textContent = "LOW"
            
            const medPrio = document.createElement('input')
            medPrio.setAttribute('type','radio')
            medPrio.setAttribute('id','edit-med-priority-radio')
            medPrio.setAttribute('class','edit-input-radio')
            medPrio.setAttribute('name','priority-radio')
            medPrio.setAttribute('value','medium')
            medPrio.setAttribute('required','')
            const medPrioLabel = document.createElement('label')
            medPrioLabel.setAttribute('for','edit-med-priority-radio')
            medPrioLabel.setAttribute('class','med-priority')
            medPrioLabel.textContent = "MEDIUM"

            const hiPrio = document.createElement('input')
            hiPrio.setAttribute('type','radio')
            hiPrio.setAttribute('id','edit-hi-priority-radio')
            hiPrio.setAttribute('class','edit-input-radio')
            hiPrio.setAttribute('name','priority-radio')
            hiPrio.setAttribute('value','high')
            hiPrio.setAttribute('required','')
            const hiPrioLabel = document.createElement('label')
            hiPrioLabel.setAttribute('for','edit-hi-priority-radio')
            hiPrioLabel.setAttribute('class','hi-priority')
            hiPrioLabel.textContent = "HIGH"

            priorityOptions.appendChild(lowPrio)
            priorityOptions.appendChild(lowPrioLabel)
            priorityOptions.appendChild(medPrio)
            priorityOptions.appendChild(medPrioLabel)
            priorityOptions.appendChild(hiPrio)
            priorityOptions.appendChild(hiPrioLabel)
            priorityDiv.appendChild(priorityOptions)

            const saveEdit = document.createElement('button')
            saveEdit.setAttribute('id','save-edit')
            saveEdit.setAttribute('type','button')
            saveEdit.textContent = 'SAVE EDIT'

            modalBottom.appendChild(priorityDiv)
            modalBottom.appendChild(saveEdit)

            typeArea.appendChild(modalBottom)

            mkForm.appendChild(modalHeader)
            mkForm.appendChild(typeArea)   
            mkEditModal.appendChild(mkForm)

            body.appendChild(mkEditModal) 


            const overlay = document.querySelector(".overlay")
            const editModal = document.querySelector(".edit-modal")
            const closeEditModal = document.querySelector("#close-edit-modal")
            const saveEditBtn = document.querySelector('#save-edit')

            closeEditModal.addEventListener('click',function(){
                console.log('CLOSE EDIT MODAL');
                clearEditModal()
                body.removeChild(mkEditModal)

            })

            console.log(data);
            overlay.classList.remove("hidden")
            editModal.classList.remove("hidden")

            //make all entry fields equal to the data
            const currentModalEntry = document.querySelector("#modal-current-entry")
            const editTitleModal = document.querySelector('#edit-title')
            const editDetailsModal = document.querySelector('#edit-details')
            const editDateModal = document.querySelector('#edit-date')
            const editInputRadio = document.querySelectorAll(".edit-input-radio")
            currentModalEntry.textContent = data.title
            editTitleModal.value = data.title
            editDetailsModal.value = data.details
            editDateModal.value = data.dueDate
            for(let i=0; i<3; i++){
                if(editInputRadio[i].value == data.priority){
                    editInputRadio[i].checked = true
                }
            }
            //close - nothing happens
            //DONE CLOSE - REMOVES MODAL. CLEARS MODAL

            saveEditBtn.addEventListener('click',function(){


                const _title = editTitleModal.value
                const _details =  editDetailsModal.value
                const _date = editDateModal.value
                const _radio = (function(){
                    for(let i=0; i<3; i++){
                        if(editInputRadio[i].checked){
                            return editInputRadio[i].value
                        }
                    }      
                })()

                const inProject = data.inProject

                const newEntry = new toDoEntry(_title,_details,_date,_radio,inProject)

                if(_title!="" && _date!="" && _radio!=undefined ){
                    _folderData.push(newEntry)
                    clearEditModal()
                    content.removeChild(createEntryDiv)
                    _folderData.splice(_folderData.indexOf(data),1)
                    localStorage.setItem('toDoEntry',JSON.stringify(_folderData))
                    //update
                    generateContent.theFolder.loopThroughData(_folderData)
                    console.log('data edited');
                }
                else{
                    console.log('cannot edit the entry');
                }
                
                clearEditModal()
                body.removeChild(mkEditModal)


                // console.log(_radio);

                

            })

            //save edit - use delete button functionality to remove old data
            //use finalize entry function to put in new data         
        })

        createButtons.appendChild(date)
        createButtons.appendChild(editBtn)
        createButtons.appendChild(deleteBtn)
        
        createEntryDiv.appendChild(createPrioContainer)
        createEntryDiv.appendChild(createTextContainer)
        createEntryDiv.appendChild(createButtons)
        
        return content.appendChild(createEntryDiv)
    }

    

}


export {
    sampleFunction,
    toDoEntry,
    entryFolder}