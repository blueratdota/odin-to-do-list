import './style.css'
import {sampleFunction,createEntry} from "./createFunctions"

console.log('original index.js');

const testNew = new sampleFunction()

testNew.logger()






//UI STUFF
const content = document.querySelector(".content")




const newEntry = new createEntry()
newEntry.constructEntry(content)



//most of the stuff here are for ui controls