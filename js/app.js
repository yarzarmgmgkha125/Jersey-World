const hamburger =document.querySelector('.header .nav-bar .nav-list .hamburger');
const menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul a');
const header = document.querySelector('.header.container1');

hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
});

document.addEventListener('scroll',()=>{
    var scroll_position =window.scrollY;
    if(scroll_position>250){
        header.style.backgroundColor = "#29323c";
    }else{
        header.style.backgroundColor = 'transparent';
    }
});

menu_item.forEach(item=>{
    item.addEventListener('click',()=>{
        hamburger.classList.toggle("active");
    menu.classList.toggle("active");
    })
})