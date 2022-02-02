console.log ('Client side script is now loaded.');

const sub_btn = document.getElementById('sub_btn');
const res_forecast = document.getElementById('res_forecast');
const loc_input = document.getElementById('loc_input');

sub_btn.addEventListener('click', (e) => {
    e.preventDefault();
    const location = document.getElementById('loc_input').value;
    fetch(`/weather?address=${location}`).then ((res)=> {
        res.json().then ((data=>{
            if (data.error) {
                res_forecast.innerText = data.error;
            } else {
                res_forecast.innerText = `Forecast for ${data.place} is ${data.forecast}`;
            }
            res_forecast.hidden = false;
            loc_input.blur();
        }));
    });
})

loc_input.addEventListener('focus', (e) => {
    res_forecast.hidden = true;
})