import ProdRequests from './prodRequests.js'
import { SERVER_URL } from '../api.js'
import { EventListeners } from './renderDataUtils.js'
export const renderAllUsers = (users, renderTo) => {
	renderTo.innerHTML = ''
	users.forEach(prod => {
		renderTo.insertAdjacentHTML(`beforeend`, (
			prod.discount ? 
					`<li>
						<span class="productName">${prod.name}</span>
						<div class="costs">
							<span class="realCost">${Math.floor( (prod.cost) * 100 ) / 100}$</span>
							<span class="discCost">${Math.floor( (prod.cost*0.75) * 100 ) / 100}$</span>
						</div>
					</li>` 
					: 
					`<li>
						<span class="productName">${prod.name}</span>
						<div class="costs">
							<span class="realCost">${Math.floor( (prod.cost) * 100 ) / 100}$</span>
						</div>
					</li>`))
		
		let listElement= renderTo.lastChild

		EventListeners(listElement, prod)

		listElement.addEventListener("dblclick", async ()=>{
			try{
				await ProdRequests.delUser(`${SERVER_URL}/api/delUser`, prod._id)
				listElement.remove()
			}catch(err){
				console.log("Ошибка при удалении пользователя:", err)
			}
		})
	})
	
}

export const renderUser = (prod, renderTo) => {
	renderTo.insertAdjacentHTML(`beforeend`, (
		prod.discount ? 
				`<li>
					<span class="productName">${prod.name}</span>
					<div class="costs">
						<span class="realCost">${prod.cost}$</span>
						<span class="discCost">${Math.floor( (prod.cost*0.75) * 100 ) / 100}$</span>
					</div>
				</li>` 
				: 
				`<li>
					<span class="productName">${prod.name}</span>
					<div class="costs">
						<span class="realCost">${prod.cost}$</span>
					</div>
				</li>`
			))
	let listElement = renderTo.lastChild
	EventListeners(listElement, prod)
}
