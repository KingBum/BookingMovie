const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const container = $('.container')
const seats = $$('.row .seat:not(.occupied)')
const count = $('#count')
const total = $('#total')
const movieSelect = $('#movie')

populateUI() //render UI localStorage first loading
// add + to convert string to number
let ticketPrice = +movieSelect.value

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

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
