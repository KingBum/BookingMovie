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

// let hmtl = ''
// let displayMovie = data.map((item)=>{
//     console.log(item)
//     return hmtl +=`<option value="${item.price}">${item.name} ($${item.price})</option>`
// })
// movieSelect.innerHTML = hmtl



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