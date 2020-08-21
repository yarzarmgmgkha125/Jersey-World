const jerseys =document.querySelector('#jersey-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody');
    clearCartBtn = document.querySelector('#clear-cart');

    loadEventListeners();
    function loadEventListeners(){
        jerseys.addEventListener('click',buyJersey);
        shoppingCartContent.addEventListener('click',removeJersey);
        clearCartBtn.addEventListener('click', clearCart);
        document.addEventListener('DOMContentLoaded',getFromLocalStorage);
    }
    function buyJersey(e) {
        e.preventDefault();
        if(e.target.classList.contains('add-to-cart')){
            const jersey = e.target.parentElement.parentElement;
            getJerseyInfo(jersey);
        }
    }

    function getJerseyInfo(jersey){
        const jerseyInfo ={
            image: jersey.querySelector('img').src,
            title: jersey.querySelector('h2').textContent,
            price: jersey.querySelector('.price span').textContent,
            id: jersey.querySelector('a').getAttribute('data-id')
        }
     addIntoCart(jerseyInfo);   
    }

    function addIntoCart(jersey){
        const tab =document.createElement('tr');
        tab.innerHTML =`
        <tr>
            <td>
                <img src="${jersey.image}">
            </td>
        <td>${jersey.title}</td>
        <td>${jersey.price}</td>
        <td>
        <button type="button" class="remove" data-id="${jersey.id}" >X</button>
        </td>
        </tr>
        `;
        shoppingCartContent.appendChild(tab);
        saveIntoStorage(jersey);

    }

    function saveIntoStorage(jersey){
        let jerseys = getJerseysFromStorage();
        jerseys.push(jersey);

        localStorage.setItem('jerseys', JSON.stringify(jerseys));
    }

    function getJerseysFromStorage(){
        let jerseys;
        if(localStorage.getItem('jerseys')===null){
            jerseys =[];

        }else {
            jerseys =JSON.parse(localStorage.getItem('jerseys'));
        }
        return jerseys;
    }

    function removeJersey(e){
        let jersey,jerseysId;

        if(e.target.classList.contains('remove')){
            e.target.parentElement.parentElement.remove();
            jersey = e.target.parentElement.parentElement;
            jerseysId =jersey.querySelector('button').getAttribute('data-id');
        }
        console.log(jerseysId);
        removeJerseyLocalStorage(jerseysId);
    }

    function removeJerseyLocalStorage(id){

        let jerseysLS =getJerseysFromStorage();

        jerseysLS.forEach(function(jerseyLS, index){
            if(jerseyLS.id === id) {
                jerseysLS.splice(index,1);
            }
        });
        console.log(jerseysLS);
    }

    function clearCart(){
        while(shoppingCartContent.firstChild){
           shoppingCartContent.removeChild(shoppingCartContent.firstChild); 
        }
        clearLocalStorage();
    }
    function clearLocalStorage(){
        localStorage.clear();
    }
    function getFromLocalStorage(){
        let jerseysLS = getJerseysFromStorage();

        jerseysLS.forEach(function(jersey){
            const tab = document.createElement('tr');
            tab.innerHTML = `
            <tr>
            <td>
                <img src="${jersey.image}">
            </td>
        <td>${jersey.title}</td>
        <td>${jersey.price}</td>
        <td>
        <button type="button" class="remove" data-id="${jersey.id}" >X</button>
        </td>
        </tr>
            `;
            shoppingCartContent.appendChild(tab);
     });
}