import {getWorks, getCategories} from "./assets/js/api.js"
import {createWork, createCategory} from "./assets/js/element.js";

const works = await getWorks()
works.forEach(work => {
    createWork(work)  
})

const categories = await getCategories()
categories.forEach(category => {
    createCategory(category)
})