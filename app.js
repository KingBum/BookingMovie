const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const container = $('.container')
const seats = $$('.row .seat:not(.occupied)')
const count = $('#count')
const total = $('#total')
const movieSelect = $('#movie')
const preloader = $('.preloader')
const popupScreen = $('.popup-screen')
const popupBox = $('.popup-box')


// fake loading and cookie
const cookieUser = document.cookie.indexOf('userName')
window.addEventListener('load',()=>{
    setTimeout(()=>{
        preloader.parentElement.removeChild(preloader);
        popupScreen.classList.add('active')
        handleCookie()
        
    },2000)
})
function handleCookie(){
    $('.close-btn').addEventListener('click', ()=>{
        popupScreen.classList.remove('active')
        document.cookie = "userName=ipUser"
    })
    if(cookieUser != -1) {
        popupScreen.style.display = 'none'
    }else{
        popupScreen.style.display = 'flex'
    }
}


populateUI() //render UI localStorage first loading
// add + to convert string to number
let ticketPrice = +movieSelect.value


function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}


// Render from Js
let displayMovie = data.map((item)=>{
    let nameMovie = ''
    return nameMovie +=`<option value="${item.price}">${item.name} ($${item.price})</option>`
})
movieSelect.innerHTML = displayMovie
let auto = data.map((e)=>{
    let slideMovie = ''
    return slideMovie += `<div class="swiper-slide">
    <img src="${e.img}" alt="" />
    <h3 class="title">${e.name}</h3>
    <div class="icons">
      <a href="#" class="fas fa-heart"></a>
      <a href="#" class="fas fa-share"></a>
      <a href="#" class="fas fa-eye"></a>
    </div>
  </div>`
})
$('.swiper-wrapper').innerHTML = auto



function updateSelectedCount(){
    const selectedSeats = $$('.row .seat.selected')
    const seatsIndex = [...selectedSeats].map((seat)=>{
        return [...seats].indexOf(seat)
    })
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const countSelected = selectedSeats.length
    count.innerHTML = countSelected
    const handleTotal = countSelected*ticketPrice
    total.innerHTML =  `$${handleTotal}`
}


//render UI localStorage
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if(selectedSeats !== null && selectedSeats.length>0){
        seats.forEach((seat, index) =>{
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            } 
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }
}


movieSelect.addEventListener('change', (e)=>{
    ticketPrice = e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})



seats.forEach(element => {
    element.addEventListener('click', (e)=>{
        e.target.classList.toggle('selected')
        updateSelectedCount()
    })
});

updateSelectedCount() //render UI localStorage last loading


// login-signup
function handleSinUp(){
    $('.options-02 a').addEventListener('click', ()=>{
        $('.signup-form').style.display = 'flex'
        $('.login-form').style.display = 'none'
    })
    
    $('.options-03 a').addEventListener('click', ()=>{
        $('.login-form').style.display = 'flex'
        $('.signup-form').style.display = 'none'
    })
    $('.form .close-btn').addEventListener('click', ()=>{
        $('.login-signup .form').style.visibility = 'hidden'
    })
}

$('.login-sign').addEventListener('click', ()=>{
    $('.login-signup .form').style.visibility = 'visible'
    handleSinUp()
})

$('.popupBtn').addEventListener('click', ()=>{
    $('.login-signup .form').style.visibility = 'visible'
    popupScreen.style.display = 'none'
    document.cookie = "userName=ipUser"
    handleSinUp()
})




// Slide Main-home
var swiper = new Swiper(".main-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
    },
    loop: true,
    autoplay:{
        delay: 3000,
        disableOnInteraction: false,
    }
  });