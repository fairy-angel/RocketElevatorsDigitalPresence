//EVENT LISTENERS
let inputResIds=[
    "res-number-of-apartments",
    "res-number-of-floors",
    "res-number-of-basements"
]
    
let inputCommIds=[  
    "comm-number-of-floors",
    "comm-number-of-basements",
    "comm-number-of-companies",
    "comm-number-of-parking-spots",
    "comm-number-of-elevators"
]

let inputCorpIds=[
    "corp-number-of-basements",
    "corp-number-of-parking-spots",
    "corp-number-of-floors",
    "corp-maximum-occupancy",
    "corp-number-of-corporations"
]
  
let inputHybridIds=[
    "hyb-number-of-floors",
    "hyb-number-of-parking-spots",
    "hyb-number-of-corporations",
    "hyb-maximum-occupancy",
    "hyb-number-of-basements",
    "hyb-business-hours"       
];

// inputHybridIds.forEach() look up Array.Prototype.forEach() todo
for (let i=0; i < inputResIds.length; i++){
    document.getElementById(inputResIds[i]).addEventListener("input",calculate_residential_elevators);
}

for (let i=0; i < inputCommIds.length; i++){
    document.getElementById(inputCommIds[i]).addEventListener("input",calculate_commercial_elevators);
}

for (let i=0; i < inputCorpIds.length; i++){
    document.getElementById(inputCorpIds[i]).addEventListener("input", calculate_corporhybrid_elevators);
}

for (let i=0; i < inputHybridIds.length; i++){
    document.getElementById(inputHybridIds[i]).addEventListener("input",calculate_corporhybrid_elevators);
}


document.getElementById("building-type-options").addEventListener("input",dropDown)


document.getElementById("standard").addEventListener("click",recalculate) 
document.getElementById("premium").addEventListener("click",recalculate) 
document.getElementById("excelium").addEventListener("click",recalculate) 

// EVENT LISTENERS

//CALCULATORS

function recalculate(){
    unitPriceCalculator()
    elevatorCostCalculator()
    installFeeCalculator()
    totalCostCalculator()
}

function dropDown(){
    let select = document.getElementById("building-type-options");
    let buildingType = select.options[select.selectedIndex].value;
    
    if (buildingType == "residentialOption"){
    document.getElementById("residentialSection").style.display = 'block'
    document.getElementById("commercialSection").style.display = 'none'
    document.getElementById("corporateSection").style.display = 'none'
    document.getElementById("hybridSection").style.display = 'none'
    }    
    else if (buildingType == "commercialOption"){
    document.getElementById("residentialSection").style.display = 'none'
    document.getElementById("commercialSection").style.display = 'block'
    document.getElementById("corporateSection").style.display = 'none'
    document.getElementById("hybridSection").style.display = 'none'
    }
    else if (buildingType == "corporateOption"){
        document.getElementById("residentialSection").style.display = 'none'
        document.getElementById("commercialSection").style.display = 'none'
        document.getElementById("corporateSection").style.display = 'block'
        document.getElementById("hybridSection").style.display = 'none'
    }
        else if (buildingType == "hybridOption"){
    document.getElementById("residentialSection").style.display = 'none'
    document.getElementById("commercialSection").style.display = 'none'
    document.getElementById("corporateSection").style.display = 'none'
    document.getElementById("hybridSection").style.display = 'block'
    }    
    
}

function calculate_residential_elevators(){

    let floorCount = document.getElementById("res-number-of-floors").value;
        let apartmentCount = document.getElementById("res-number-of-apartments").value;

    let average_apt_per_floor = Math.ceil(Number(apartmentCount.value) / Number(floorCount.value));
    let elevator_shaft = Math.ceil(average_apt_per_floor) / 6;
    let columnCount = Math.ceil(Number(floorCount.value) / 20);
    let results = elevator_shaft * columnCount;
    let elevatorTotal = results;

        document.getElementById('elevatorAmountInput').setAttribute('value',elevatorTotal);
        recalculate()

    }

 function calculate_commercial_elevators(){

       let elevatorTotal = document.getElementById('comm-number-of-elevators').value;

        document.getElementById('elevatorAmountInput').setAttribute('value',elevatorTotal);
        recalculate()
 }

 function calculate_corporhybrid_elevators(){
        let buildingType 
        let floorCount  
        let basementCount 
        let occupantsPerFloor
         
        let totalFloors = basementCount + floorCount;
        let totalOccupants = (totalFloors + basementCount) * occupantsPerFloor;
        let elevatorColumns = Math.ceil(totalFloors + basementCount) / 20;
        let elevatorCount = Math.ceil(totalOccupants / 1000);
        let elevatorsPerColumn = Math.ceil(elevatorCount / elevatorColumns);
        let elevatorTotal = elevatorColumns * elevatorsPerColumn;

        if (buildingType == "corporateOption"){
            floorCount = document.getElementById('corp-number-of-floors').value;
            basementCount = document.getElementById('corp-number-of-basements').value;
            occupantsPerFloor = document.getElementById('corp-maximum-occupancy').value;
        } 
        else if(buildingType == "hybridOption"){
            floorCount = document.getElementById('hyb-number-of-floors').value;
            basementCount = document.getElementById('hyb-number-of-basements').value;
            occupantsPerFloor = document.getElementById('hyb-maximum-occupancy').value;
        }
        document.getElementById('elevatorAmountInput').setAttribute('value',elevatorTotal);
        recalculate()
        //number of occupants + basements = total occupants
        //number of elevators = number of occupants / 1000
        //number of floors + basements/20 = number elevator columns
        //number of elevators / number of columns = number of elevators per column
        //total number of elevators=number of elevators per column * number of columns

 }
//CALCULATORS 

 //USD FORMATTER

 let usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
 });

 //UNIT PRICE BUTTONS

function unitPriceCalculator(){
    let standardPrice = 7565.00
    // standardPrice = usd.format(standardPrice)
    let premiumPrice = 12345
    let exceliumPrice = 15400.00
    if(document.getElementById("standard").checked){
    document.getElementById("elevatorUnitPrice").setAttribute('value',standardPrice); 
    }
    else if(document.getElementById("premium").checked){
        document.getElementById("elevatorUnitPrice").setAttribute('value',premiumPrice); 
     }
    else if(document.getElementById("excelium").checked){
        document.getElementById("elevatorUnitPrice").setAttribute('value',exceliumPrice); 
     }

}
//UNIT PRICE BUTTON


// ELEVATOR AMOUNT

    function elevatorCostCalculator(){
        let elevatorCount = document.getElementById('elevatorAmountInput').value;
        let elevatorUnitPrice = document.getElementById("elevatorUnitPrice").value;

        let totalElevatorCost = elevatorCount * elevatorUnitPrice; 
        document.getElementById("totalElevatorAmount").setAttribute('value',totalElevatorCost); 
    }
// // ELEVATOR AMOUNT


//INSTALLATION FEES
// let productLineButtons = document.getElementById("productLineButtons")
// let elevatorUnitPrice = document.getElementById("elevatorUnitPrice")

// productLineButtons.addEventListener("click", (e) => {
//     if (e.target.id === "standard") {
//         elevatorUnitPrice.value = usd.format(7565)
//     }
// }
// );

function installFeeCalculator(){
    let standardFee = 0.10 
    let premiumFee = 0.13 
    let exceliumFee = 0.16
    // let totalElevatorCost = document.getElementById("totalElevatorAmount").value;

    let totalFee 

    if(document.getElementById("standard").checked){
       totalFee = standardFee 
    }
    else if(document.getElementById("premium").checked){
        totalFee = premiumFee
     }
    else if(document.getElementById("excelium").checked){
        totalFee = exceliumFee
     }
      // document.getElementById("installationFees").setAttribute('value',totalFee);
      document.getElementById("installFeesLabel").innerHTML = `${totalFee*100}%`;
}
//INSTALLATION FEES


//TOTAL COST
function totalCostCalculator(){
    let totalElevatorPrice = document.getElementById("totalElevatorAmount").value;
    let totalInstallFees = document.getElementById("installFeesLabel").value;
    let totalCost = parseFloat(totalElevatorPrice) + parseFloat(totalInstallFees);
    document.getElementById("totalCostLabel").setAttribute('value',totalCost);
}
//TOTAL COST