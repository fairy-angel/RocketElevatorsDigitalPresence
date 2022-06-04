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
    document.getElementById(inputCorpIds[i]).addEventListener("change", calculate_corporhybrid_elevators);
}

for (let i=0; i < inputHybridIds.length; i++){
    document.getElementById(inputHybridIds[i]).addEventListener("change",calculate_corporhybrid_elevators);
}


document.getElementById("building-type-options").addEventListener("change",dropDown)


document.getElementById("standard").addEventListener("click",recalculate) 
document.getElementById("premium").addEventListener("click",recalculate) 
document.getElementById("excelium").addEventListener("click",recalculate) 

//EVENT LISTENERS

//CALCULATORS

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
    let apartmentCount = document.getElementById("res-number-of-apartments").value;
    let floorCount = document.getElementById("res-number-of-floors").value;
    let columnCount = Math.ceil(floorCount/20);
    let average_apt_per_floor = apartmentCount / floorCount;
    let elevatorTotal = Math.floor(average_apt_per_floor / 6); 
    console.log()

        elevatorTotal == elevatorTotal * columnCount;


        document.getElementById('elevator-amount-input').setAttribute('value',elevatorTotal);
        recalculate()
    }

 function calculate_commercial_elevators(){

       let elevatorTotal = document.getElementById('comm-number-of-elevators').value;

        document.getElementById('elevator-amount-input').setAttribute('value',elevatorTotal);
        recalculate()
 }

 function calculate_corporhybrid_elevators(){
        let buildingType = select.options[select.selectedIndex].value;
        let floorCount  
        let basementCount 
        let occupantsPerFloor 
        
        if (buildingType== "corporateOption"){
            floorCount = document.getElementById('corp-number-of-floors').value;
            basementCount = document.getElementById('corp-number-of-basements').value;
            occupantsPerFloor = document.getElementById('corp-maximum-occupancy').value;

        } 
        else if(buildingType == "hybridOption"){
            floorCount = document.getElementById('hyb-number-of-floors').value;
            basementCount = document.getElementById('hyb-number-of-basements').value;
            occupantsPerFloor = document.getElementById('hyb-maximum-occupancy').value;

        }

        let totalFloors = basementCount + floorCount
        let totalOccupants = totalFloors * occupantsPerFloor
        let elevatorColumns = totalFloors / 20
        let elevatorCount = totalOccupants / 1000
        let elevatorsPerColumn = elevatorCount / elevatorColumns
        let elevatorTotal = elevatorColumns * elevatorsPerColumn

        document.getElementById('elevator-amount-input').setAttribute('value',elevatorTotal);
        recalculate()
        //number of occupants + basements = total occupants
        //number of elevators = number of occupants / 1000
        //number of floors + basements/20 = number elevator columns
        //number of elevators / number of columns = number of elevators per column
        //total number of elevators=number of elevators per column * number of columns
        

   
 }
//CALCULATORS 

 //document.getElementById('elevator-amount-input').value;


 //UNIT PRICE BUTTONS

function unitPriceCalculator(){
    let standardPrice = 7565
    let premiumPrice = 12345
    let exceliumPrice = 15400
    if(document.getElementById("standard").checked){
    document.getElementById("elevator-unit-price").setAttribute('value',standardPrice); 
    }
    else if(document.getElementById("premium").checked){
        document.getElementById("elevator-unit-price").setAttribute('value',premiumPrice); 
     }
    else if(document.getElementById("excelium").checked){
        document.getElementById("elevator-unit-price").setAttribute('value',exceliumPrice); 
     }

}
//UNIT PRICE BUTTON


// ELEVATOR AMOUNT

    function elevatorCostCalculator(){
        let elevatorCount = document.getElementById('elevator-amount-input').value;
        let elevatorUnitPrice = document.getElementById("elevator-unit-price").value;
        let totalElevatorCost = elevatorCount * elevatorUnitPrice; 
        document.getElementById("total-elevator-cost").setAttribute('value',totalElevatorCost); 
    }
// ELEVATOR AMOUNT


//INSTALLATION FEES
function installFeeCalculator(){
    let standardFee = 0.10
    let premiumFee = 0.13
    let exceliumFee = 0.16
    let totalElevatorCost = document.getElementById("total-elevator-cost").value;
    let totalFee 
    
    
    if(document.getElementById("standard").checked){
       totalFee = totalElevatorCost * standardFee
    }

    else if(document.getElementById("premium").checked){
        totalFee = totalElevatorCost * premiumFee

     }

    else if(document.getElementById("excelium").checked){
        totalFee = totalElevatorCost * exceliumFee

     }
      document.getElementById("installation-fees").setAttribute('value',totalFee);
}
//INSTALLATION FEES


//TOTAL COST
function totalCostCalculator(){
    let totalElevatorPrice = document.getElementById("total-elevator-cost").value;
    let totalInstallFees = document.getElementById("installation-fees").value;
    let finalPrice = parseFloat(totalElevatorPrice) + parseFloat(totalInstallFees);
  
    document.getElementById("final-prices").setAttribute('value',finalPrice);

}


function recalculate(){
    unitPriceCalculator()
    elevatorCostCalculator()
    installFeeCalculator()
    totalCostCalculator()

}
//TOTAL COST