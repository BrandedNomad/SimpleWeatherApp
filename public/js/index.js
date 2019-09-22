console.log("Clientside js file loaded successfully");




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.getElementById('messageOne');
const messageTwo = document.getElementById('messageTwo');
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const baseUrl = '/weather';
    const location =  search.value;
    const queryString = '?address=' + location;
    const endPoint = baseUrl + queryString;

    messageOne.textContent = "loading...";
    messageTwo.textContent = "...";


    fetch(endPoint).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }

        })
    });
});