import { SERVER_URL } from './api.js'
import { renderAllUsers, renderUser } from './utils/renderData.js'
import UserRequests from './utils/prodRequests.js'

const postBtn = document.querySelector('.addBtn')
const nameInput = document.querySelector('.name-i')
const costInput = document.querySelector('.cost-i')
const discontCheckbox = document.querySelector(".discCB")
const discontProdCont = document.querySelector('.c2-container')
const allProdCont = document.querySelector('.c3-container')


postBtn.addEventListener('click', async () => {
	if(nameInput.value == "" || costInput.value == ""){
		alert("Вы не ввели одно из двух полей")
	}
	else{
		let obj = {name: nameInput.value, cost: Number(costInput.value), discount: discontCheckbox.checked}
		try{
			const user = await UserRequests.addUser(`${SERVER_URL}/api/addUser`, obj)
			nameInput.value = ""
			costInput.value = ""
			discontCheckbox.checked = false
		
			
			renderUser(user, allProdCont)
			if(user.discount){
			renderUser(user, discontProdCont)
			}
		}catch(error){
			console.log("Произошла ошибка при добавлении пользователя:", error)
		}
	}
})

document.addEventListener('DOMContentLoaded', async () => {
	const users = await UserRequests.getUsers(`${SERVER_URL}/api/getUsers`)
	renderAllUsers(users, allProdCont)
})

document.addEventListener('DOMContentLoaded', async () => {
	const users = (await UserRequests.getUsers(`${SERVER_URL}/api/getUsers`)).filter((el) => el.discount)
	renderAllUsers(users, discontProdCont)
})
/*
renderAllUsers(users, discontProdCont)
document.addEventListener('DOMContentLoaded', async () => {
	const id = inputUserId.value
	const user = await UserRequests.getUser(`${SERVER_URL}/api/getUser/${id}`)
	renderAllUsers(users, c1Container)
})*/
