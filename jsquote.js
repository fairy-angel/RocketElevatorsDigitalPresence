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
]
for (let i=0; i < inputResIds.length; i++){
    document.getElementById(inputResIds[i]).addEventListener("change",calculate_residential_elevators);
}

for (let i=0; i < inputCommIds.length; i++){
    document.getElementById(inputCommIds[i]).addEventListener("change",calculate_commercial_elevators);
}

for (let i=0; i < inputCorpIds.length; i++){
    document.getElementById(inputCorpIds[i]).addEventListener("change", calculate_corporate_elevators);
}

for (let i=0; i < inputHybridIds.length; i++){
    document.getElementById(inputHybridIds[i]).addEventListener("change",calculate_hybrid_elevators);
}


document.getElementById("building-type-options").addEventListener("change",dropDown)


document.getElementById("standard").addEventListener("click",recalculate) 
document.getElementById("premium").addEventListener("click",recalculate) 
document.getElementById("excelium").addEventListener("click",recalculate) 



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


//CALCULATOR 
function calculate_residential_elevators(){
    let apartmentCount = document.getElementById("res-number-of-apartments").value;
    let floorCount = document.getElementById("res-number-of-floors").value;
    let columnCount = Math.ceil(floorCount/20);
    let average_apt_per_floor = apartmentCount / floorCount;
    let elevatorTotal = Math.floor(average_apt_per_floor / 6); 
    
        elevatorTotal == elevatorTotal * columnCount;
        document.getElementById('elevator-amount-input').setAttribute('value',elevatorTotal);
        recalculate()

        console.log(floorCount)
    
    }

 function calculate_commercial_elevators(){
   // let apartmentCount = document.getElementById("comm-number-of-apartments").value;
    //let floorCount = document.getElementById("comm-number-of-floors").value;
    
        document.getElementById('elevator-amount-input').setAttribute('value',elevatorTotal);
        recalculate()
 }

 function calculate_corporate_elevators(){
   // let apartmentCount = document.getElementById("").value;
 //   let floorCount = document.getElementById("corp-number-of-floors").value;
    
        document.getElementById('elevator-amount-input').setAttribute('value',elevatorTotal);
        recalculate()

 }

function calculate_hybrid_elevators(){
 //   let apartmentCount = document.getElementById("hyb-number-of-apartments").value;
   // let floorCount = document.getElementById("hyb-number-of-floors").value;
   
        document.getElementById('elevator-amount-input').setAttribute('value',elevatorTotal);
        recalculate()

 }

 //document.getElementById('elevator-amount-input').value;


 //UNIT PRICE BUTTONS

function unitPriceCalculator(){
    let standardPrice = 7565
    let premiumPrice = 12345
    let exceliumPrice = 15400
    if(document.getElementById("standard").checked){
       document.getElementById("elevator-unit-price").setAttribute(value,standardPrice); 
    }
    else if(document.getElementById("premium").checked){
        document.getElementById("elevator-unit-price").setAttribute(value,premiumPrice); 
     }
    else if(document.getElementById("excelium").checked){
        document.getElementById("elevator-unit-price").setAttribute(value,exceliumPrice); 
     }

}
//UNIT PRICE BUTTON


// ELEVATOR AMOUNT

    function elevatorAmountCalculator(){
        let elevatorAmount = document.getElementById('elevator-amount-input').value;
        let elevatorUnitPrice = document.getElementById("elevator-unit-price").value;
        let totalElevatorAmount = elevatorAmount * elevatorUnitPrice; 

        document.getElementById("total-elevator-price").setAttribute(value,totalElevatorAmount); 
    }
// ELEVATOR AMOUNT


//INSTALLATION FEES
function installFeeCalculator(){
    let standardFee = .10
    let premiumFee = .13
    let exceliumFee = .16
    let totalElevatorAmount = document.getElementById("total-elevator-price").value;
    let totalFee 
    
    if(document.getElementById("standard").checked){
       totalFee= totalElevatorAmount * standardFee

    }

    else if(document.getElementById("premium").checked){
        totalFee= totalElevatorAmount * premiumFee

     }

    else if(document.getElementById("excelium").checked){
        totalFee= totalElevatorAmount * exceliumFee

     }
      document.getElementById("installation-fees").setAttribute(value,totalElevatorAmount);
}
//INSTALLATION FEES


//TOTAL COST
function totalCostCalculator(){
    let totalElevatorPrice = document.getElementById("total-elevator-price").value;
    let totalInstallFees = document.getElementById("installation-fees").value;
    let finalPrice = totalElevatorPrice + totalInstallFees
  
    document.getElementById("final-price").setAttribute(value,finalPrice);

}
//TOTAL COST

function recalculate(){
    unitPriceCalculator()
    elevatorAmountCalculator()
    installFeeCalculator()
    totalCostCalculator()

}