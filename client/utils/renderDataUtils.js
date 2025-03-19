import ProdRequests from './prodRequests.js'
import { SERVER_URL } from '../api.js'
export const EventListeners = (listElement, prod) => {
listElement.querySelectorAll("span").forEach(el => el.addEventListener("click", async ()=>{
    let spanClass = el.getAttribute("class")
    let spanContent = el.textContent
    el.remove()
    switch(spanClass){
        case 'productName':
            listElement.insertAdjacentHTML(`afterbegin`, `<input value="${spanContent}" type="text">`)
            let nameInput = listElement.querySelector("input")
            nameInput.addEventListener("keypress",async (e) => {
            if(e.code == "Enter"){
                let obj = {name: nameInput.value}
                try{
                    await ProdRequests.patchUser(`${SERVER_URL}/api/updateUser`, prod._id, obj)
                    nameInput.remove()
                    listElement.insertAdjacentHTML(`afterbegin`, `<span>${obj.name}</span>`)			
                }catch(err){
                    console.log("Ошибка при изменении пользователя:", err)
                }
            }
        })
        break;
        case 'realCost':
            listElement.querySelector('.costs').insertAdjacentHTML(`afterbegin`, `<input value="${spanContent.slice(0,-1)}" type="text">`)
            let realCostInput = listElement.querySelector(".costs > input")
            realCostInput.addEventListener("keypress",async (e) => {
            if(e.code == "Enter"){
                let realCostI = realCostInput.value
                let obj = {cost: Number(realCostInput.value)}
                try{
                    await ProdRequests.patchUser(`${SERVER_URL}/api/updateUser`, prod._id, obj)
                    realCostInput.remove()
                    listElement.querySelector('.costs').insertAdjacentHTML(`afterbegin`, `<span>${Math.floor( (realCostI) * 100 ) / 100}$</span>`)
                    if(listElement.querySelectorAll('.costs span').length > 1){
                    listElement.querySelector('.costs span:last-child').textContent = `${Math.floor( (Number(realCostI)*0.75) * 100 ) / 100}$`
                    }			
                }catch(err){
                    console.log("Ошибка при изменении пользователя:", err)
                }
            }
        })
        break;
        case 'discCost':
            listElement.querySelector('.costs').insertAdjacentHTML(`beforeend`, `<input value="${spanContent.slice(0,-1)}" type="text">`)
            let discCostInput = listElement.querySelector(".costs > input")
            discCostInput.addEventListener("keypress",async (e) => {
            if(e.code == "Enter"){
                let disccostI = discCostInput.value
                let obj = {cost: (Number(disccostI)+(Number(disccostI)/3))}
                console.log(obj)
                try{
                    await ProdRequests.patchUser(`${SERVER_URL}/api/updateUser`, prod._id, obj)
                    discCostInput.remove()
                    listElement.querySelector('.costs').insertAdjacentHTML(`beforeend`, `<span>${Math.floor( (disccostI) * 100 ) / 100}$</span>`)
                    listElement.querySelector('.costs span:first-child').textContent = `${Math.floor( (Number(disccostI)+(Number(disccostI)/3)) * 100 ) / 100}$`			
                }catch(err){
                    console.log("Ошибка при изменении пользователя:", err)
                }
            }
        })

        break;
    }
}))}