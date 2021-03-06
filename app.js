const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const container = $(".container");
const seats = $$(".row .seat:not(.occupied)");
const count = $("#count");
const total = $("#total");
const movieSelect = $("#movie");
const preloader = $(".preloader");
const popupScreen = $(".popup-screen");
const popupBox = $(".popup-box");
// Date Weather
let currentDate = new Date();
const day = currentDate.getDay();
const date = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();


function addImageProcess(src){
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.src = src
    img.onload = () => resolve(src)
    img.onerror = reject
  })
}

async function logImageHeight(imageUrl) {
  $(".avatar-user").innerHTML = `<img class="avatar-user" onerror="this.src = './img/User-avatar.png'" src="${await addImageProcess(imageUrl)}" alt="">`
  console.log('height', await addImageProcess(imageUrl))
}


// fake loading and cookie
const cookieUser = document.cookie.indexOf("userName");
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.parentElement.removeChild(preloader);
    popupScreen.classList.add("active");
    handleCookie();
  }, 2000);
});
function handleCookie() {
  $(".close-btn").addEventListener("click", () => {
    popupScreen.classList.remove("active");
    document.cookie = "userName=ipUser";
  });
  if (cookieUser != -1) {
    popupScreen.style.display = "none";
  } else {
    popupScreen.style.display = "flex";
  }
}

populateUI(); //render UI localStorage first loading
// add + to convert string to number
let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = $$(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const countSelected = selectedSeats.length;
  count.innerHTML = countSelected;
  const handleTotal = countSelected * ticketPrice;
  total.innerHTML = `$${handleTotal}`;
  $('.pay-price').innerHTML = `gi?? v?? : ${handleTotal}$`
  $('.pay-total').innerHTML = `t???ng ti???n thanh to??n : ${handleTotal+20}$`
}

//render UI localStorage
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

seats.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.target.classList.toggle("selected");
    if(isCountDown){
      countDown()
      isCountDown = false
    }
    updateSelectedCount();
  });
});
let isCountDown = true
updateSelectedCount(); //render UI localStorage last loading

// Render from Js
// render swiper
let auto = data.map((e) => {
  let slideMovie = "";
  return (slideMovie += `<div class="swiper-slide">
    <img src="${e.img}" alt="" />
    <h3 class="title">${e.name}</h3>
    <h3 class="title-bottom">Xem chi tiet</h3>
  </div>`);
});
$(".swiper-wrapper").innerHTML = auto;

// render BookingMovie
$$(".title-bottom").forEach((e, index) => {
  e.addEventListener("click", (item) => {
    let getBookingMovie = `<h3>${data[index].name}</h3>
        <div class="editor-content">
          <h4>?????o di???n : <span>${data[index].daodien}</span></h4>
          <h4>Di???n vi??n : <span>${data[index].dienvien}</span></h4>
          <h4>th??? lo???i : <span>${data[index].theloai}</span></h4>
          <h4>kh???i chi???u : <span>${data[index].khoichieu}</span></h4>
          <h4>th???i l?????ng : <span>${data[index].thoiluong}</span></h4>
          <h4>ng??n ng??? : <span>${data[index].ngonngu}</span></h4>
          <h4>rated : <span>${data[index].rated}</span></h4>
          <h4>Gia ve : <span>${data[index].price}</span></h4>
        </div>`;
    $(".posterMovie").src = data[index].img;
    $(".text-content").innerHTML = getBookingMovie;
  });
});


// login-signup
$(".login-sign a").addEventListener("click", () => {
  $(".login-form").classList.toggle("active");
});
$(".submit-user").addEventListener("click", (e) => {
  e.preventDefault()
  let idUser = $("#username").value;
  logImageHeight(`http://my.uda.edu.vn/filetailen/anhsv/${idUser}.jpg`)
  $('.control-user').classList.add('active')
  $('.login-user').classList.remove('active')
  $(".login-form").classList.remove("active");
  $("#username").value = '';
  $("#password").value = '';
});

  $('#nav-user').addEventListener('click',(e)=>{
    $('#nav-user').classList.toggle('fa-chevron-right')
    $('.option-user').classList.toggle('active')
  })
  $('.log-out').addEventListener('click',()=>{
    $('.control-user').classList.remove('active')
    $('.login-user').classList.add('active')
    $(".login-form").classList.remove("active");
    $(".option-user").classList.remove("active");
  })

// Call API open weather
const API_Key = "a1a5fe75a503505ee3af2ce87245750f";
$(".search-city").addEventListener("change", (e) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${API_Key}&units=metric&lang=vi`)
    .then(async (res) => {
      const data = await res.json();
      $(".weather-state").innerHTML = data.weather[0].description;
      $(".city-name").innerHTML = data.name;
      $(".temperature").innerHTML = `${Math.round(data.main.temp)}`;
      $(".weather-icon").setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
    })
    .catch(() => {
      alert(`D??? li??u b???n nh???p kh??ng h???p l???`);
    });
  $(".search-city").value = ""; //Reset input value
});
$(".date-time").innerHTML = weekdays[day];
$(".time-current").innerHTML = `${date}.${month+1}.${year}`;

// Toggler theme
const toggleBtn = $(".toggle-btn");
toggleBtn.addEventListener("click", () => {
  $(".theme-toggler").classList.toggle("active");
});
$$(".theme-btn").forEach((item) => {
  item.addEventListener("click", () => {
    let color = item.style.backgroundColor;
    $(":root").style.setProperty("--main-color", color);
  });
});

// Countdown Clock
function countDown(){
    let addFiveMinutes = new Date().getTime() + 300000
    let count = setInterval(()=>{
        let now = new Date().getTime();
        let distance = addFiveMinutes - now
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        $('.minute').innerHTML = minutes
        $('.second').innerHTML = seconds
        if (distance < 0) {
          clearInterval(count);
          $('.countdown-clock').innerHTML = "EXPIRED";
        }
    },1000)
}


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
  pagination: {
    el: ".swiper-pagination",
  },
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});
