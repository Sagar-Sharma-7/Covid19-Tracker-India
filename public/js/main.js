// assigning variables
const name$ = document.querySelector("#name");
const loading = document.querySelectorAll(".loading");
const active = document.querySelector("#active");
const confirmed = document.querySelector("#confirmed");
const death = document.querySelector("#death");
const recovered = document.querySelector("#recovered");
const todayConfirmed = document.querySelector("#tconfirmed");
const todayDeath = document.querySelector("#tdeath");
const todayRecovered = document.querySelector("#trecovered");
const migratedOther = document.querySelector("#migratedOther");
const lastUpdated = document.querySelector("#lastUpdatedTime");
const selectDiv = document.querySelector(".selectDiv")
const searchBtn = document.querySelector("#searchBtn");

let select;
let option;


// loading
loading.forEach((elem) => {
    elem.innerHTML = "Calculating..."
})



const API_URL = "https://api.covid19india.org/data.json";
let stateCases;

const getIndiaCases = async () => {
    try {
        const data = await fetch(API_URL);
        const jsonData = await data.json();
         
        const indiaCases = await jsonData.statewise[0];

        console.log(indiaCases);
        name$.innerHTML = "India";
        active.innerHTML = indiaCases.active;
        confirmed.innerHTML = indiaCases.confirmed;
        death.innerHTML = indiaCases.deaths;
        recovered.innerHTML = indiaCases.recovered;
        todayConfirmed.innerHTML = indiaCases.deltaconfirmed;
        todayDeath.innerHTML = indiaCases.deltadeaths;
        todayRecovered.innerHTML = indiaCases.deltarecovered;
        migratedOther.innerHTML = indiaCases.migratedother;
        lastUpdated.innerHTML = `Last Updated: ${indiaCases.lastupdatedtime}`;


        stateCases = jsonData.statewise;

        select = document.createElement("Select");
        select.setAttribute("id", "stateSelected");
        selectDiv.appendChild(select)

        for(let i = 1; i < stateCases.length - 1; i++){
            option = document.createElement("option");
            document.getElementById("stateSelected").appendChild(option);
            option.setAttribute("value", stateCases[i].state);
            const stateName = document.createTextNode(stateCases[i].state);
            option.appendChild(stateName);
        }

    } catch (error) {
        console.log(error);
        name$.innerHTML = "Please Check Your Internet Connection...";
    }
}


const getStateCases = async () => {
    try {
        const stateValue = document.getElementById("stateSelected").value;

        for(let i = 1; i <  stateCases.length - 1; i++){
            if(stateCases[i].state == stateValue){
                const result = stateCases[i];
                
                console.log(result);
                name$.innerHTML = result.state;
                active.innerHTML = result.active;
                confirmed.innerHTML = result.confirmed;
                death.innerHTML = result.deaths;
                recovered.innerHTML = result.recovered;
                todayConfirmed.innerHTML = result.deltaconfirmed;
                todayDeath.innerHTML = result.deltadeaths;
                todayRecovered.innerHTML = result.deltarecovered;
                migratedOther.innerHTML = result.migratedother;
                lastUpdated.innerHTML = `Last Updated: ${result.lastupdatedtime}`;
            }
        }

    } catch (error) {
        console.log(error);
        name$.innerHTML = "Please Check Your Internet Connection...";
    }
}

getIndiaCases();
searchBtn.addEventListener("click", getStateCases);