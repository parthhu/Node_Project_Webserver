console.log("client site js file loaded")

console.log("test")



const wetherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

wetherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    // console.log(location)
    msg1.textContent = "Loading Wether.....";
    msg1.textContent = ""
    fetch('/wether?address=' + location + '').then((response) => {
        response.json().then((data) => {

            if (data.error) {
                console.log("==app.js====")
                msg1.textContent = data.error
                    // console.log(data.error)
            } else {
                msg1.textContent = data.location;
                msg2.textContent = data.forcast;
                //    console.log(data.location)
                //    console.log(data.forcast)
                //    console.log(data.address)
            }
        })
    })
})