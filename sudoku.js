let rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
let cols = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let inputVal = '{"A1":"","A2":"","A3":"","A4":"","A5":"","A6":"","A7":"","A8":"","A9":"","B1":"","B2":"","B3":"","B4":"","B5":"","B6":"","B7":"","B8":"","B9":"","C1":"","C2":"","C3":"","C4":"","C5":"","C6":"","C7":"","C8":"","C9":"","D1":"","D2":"","D3":"","D4":"","D5":"","D6":"","D7":"","D8":"","D9":"","E1":"","E2":"","E3":"","E4":"","E5":"","E6":"","E7":"","E8":"","E9":"","F1":"","F2":"","F3":"","F4":"","F5":"","F6":"","F7":"","F8":"","F9":"","G1":"","G2":"","G3":"","G4":"","G5":"","G6":"","G7":"","G8":"","G9":"","H1":"","H2":"","H3":"","H4":"","H5":"","H6":"","H7":"","H8":"","H9":"","I1":"","I2":"","I3":"","I4":"","I5":"","I6":"","I7":"","I8":"","I9":""}';
let HorizontalLine = {"Line1":[],"Line2":[],"Line3":[],"Line4":[],"Line5":[],"Line6":[],"Line7":[],"Line8":[],"Line9":[]};
let VertialLine = {"Line1":[],"Line2":[],"Line3":[],"Line4":[],"Line5":[],"Line6":[],"Line7":[],"Line8":[],"Line9":[]};
let ThreeThree = {"1":[],"2":[],"3":[],"4":[],"5":[],"6":[],"7":[],"8":[],"9":[]};
let note = '{"A1":[],"A2":[],"A3":[],"A4":[],"A5":[],"A6":[],"A7":[],"A8":[],"A9":[],"B1":[],"B2":[],"B3":[],"B4":[],"B5":[],"B6":[],"B7":[],"B8":[],"B9":[],"C1":[],"C2":[],"C3":[],"C4":[],"C5":[],"C6":[],"C7":[],"C8":[],"C9":[],"D1":[],"D2":[],"D3":[],"D4":[],"D5":[],"D6":[],"D7":[],"D8":[],"D9":[],"E1":[],"E2":[],"E3":[],"E4":[],"E5":[],"E6":[],"E7":[],"E8":[],"E9":[],"F1":[],"F2":[],"F3":[],"F4":[],"F5":[],"F6":[],"F7":[],"F8":[],"F9":[],"G1":[],"G2":[],"G3":[],"G4":[],"G5":[],"G6":[],"G7":[],"G8":[],"G9":[],"H1":[],"H2":[],"H3":[],"H4":[],"H5":[],"H6":[],"H7":[],"H8":[],"H9":[],"I1":[],"I2":[],"I3":[],"I4":[],"I5":[],"I6":[],"I7":[],"I8":[],"I9":[]}';
let LineKey = [2, 5, 8]

function getLocalStorageItem(key) {
    let itemStr = localStorage.getItem(key);

    // If the item doesn't exist, return null
    if (!itemStr) {
        return null;
    }

    let item = JSON.parse(itemStr);
    let now = new Date().toLocaleString("en-GB", {timeZone: "Europe/Istanbul"});
    let itemTime = new Date(item.time).getTime();
    let nowTime = new Date(now).getTime();

    // If the item is more than a day old, delete it and return null
    if (nowTime - itemTime > 24 * 60 * 60 * 1000) {
        localStorage.removeItem(key);
        return null;
    }

    // Otherwise, return the item
    return item.value;
}

function getData(){
    let input = JSON.parse(inputVal);
    for(let i = 0; i < rows.length; i++){
        for(let j = 0; j < cols.length; j++){
            let result = getLocalStorageItem(rows[i] + cols[j]);
            let key = rows[i] + cols[j];
            input[key] = result;
        }
    }
    inputVal = JSON.stringify(input);
}



function LineSelect(Line){
    let ValPerse = JSON.parse(inputVal)
    let ValLength = Object.keys(ValPerse)
    if (Line == "Horizontal"){
        for(let i = 1; i <= ValLength.length; i++) {
           let key = String(ValLength[i - 1]) 
            HorizontalLine["Line" + Math.ceil(i / 9)].push(ValPerse[key]);
        }
    } else if (Line == "Vertical"){
        let key
        for(let j = 1; j <= 9;  j++){
                // Filtering keys
                let filteredKeys = ValLength.filter(key => key.includes(String(j)));
                for(let k = 1; k <= filteredKeys.length; k++){
                    key = String(filteredKeys[k -1 ])
                    VertialLine["Line" + j].push(ValPerse[key])
                }
        }
    } else if (Line == "ThreeThree"){
        let three = ThreeThree
        let horizontal = HorizontalLine
        let counter = 0
        let key = 0

        while (key <= 3) {
            for(counter; counter <= 8; counter++){
                switch (counter) {
                    case 0:
                    case 1:
                    case 2:
                        for(let i = 1; i <= 3; i++){
                            for(let k = counter*3; k <= LineKey[key]; k++){
                                three[String(counter + 1)].push(horizontal["Line" + String(i)][k])
                            }
                        }

                        key++
                        if (key == 3) {
                            key = 0
                        }
                        break;
                    case 3:
                    case 4:
                    case 5:
                        for(let i = 4; i <= 6; i++){
                            for(let k = (counter - 3)*3; k <= LineKey[key]; k++){
                                three[String(counter + 1)].push(horizontal["Line" + String(i)][k])
                            }
                        }
                        key++
                        if (key == 3) {
                            key = 0
                        }
                        break;
                    case 6:
                    case 7:
                    case 8:
                        for(let i = 7; i <= 9;i++){
                            for(let k = (counter - 6)*3; k <= LineKey[key]; k++){
                                three[String(counter + 1)]. push(horizontal["Line" + String(i)][k])
                            }
                        }
                        key++
                        if(key == 2 & counter == 8){
                            key = 4
                        }
                }
            }
            break
        }


    }


}

function NoteTaking(Area) {
    var horizontalTempNote = {"Line1":[],"Line2":[],"Line3":[],"Line4":[],"Line5":[],"Line6":[],"Line7":[],"Line8":[],"Line9":[]};
    let noteParse = JSON.parse(note)
    if(Area == "Horizontal"){
        let horizontal = HorizontalLine
        for(let i = 1; i <= 9; i++){
            let filtered = horizontal["Line" + i].filter((n1) => n1 != "0")
            filtered = filtered.map((x) => parseInt(x))
            let resultFiltered = numbers.map((n2) => {
                if(!filtered.includes(n2)){
                    return n2
                }
            })
            for(let k = 0; k <= 8; k++){
                let selected = horizontal["Line" + i][k]
                if(selected == "0"){
                    noteParse[rows[i - 1] + cols[k]][0] = resultFiltered[k]
                    horizontalTempNote["Line" + i] = resultFiltered
                }
            }
        }
    }else if(Area == "Vertical"){
        let vertical = VertialLine
        for(let i = 1; i <= 9; i++){
            let filtered = vertical["Line" + i].filter((n1) => n1 != "0")
            filtered = filtered.map((x) => parseInt(x))
            let filtered2 = numbers.map((n2) => {
                if(!filtered.includes(n2)){
                    return n2
                }
            })
            let resultFiltered = horizontalTempNote["Line" + i].map((n3) => {
                if(!filtered2.includes(n3)){
                    return n3
                }
            })
            for(let k = 0; k <= 8; k++){
                let selected = vertical["Line" + i][k]
                if(selected == "0"){
                    console.log(filtered)
                    console.log(filtered2)
                    console.log(resultFiltered)
                }
            }
        }
    }
}

getData()

LineSelect("Horizontal")
LineSelect("Vertical")
LineSelect("ThreeThree")

NoteTaking("Horizontal")
NoteTaking("Vertical")

/*
// Call this function when you want to get a value
function getLocalStorageItem(key) {
    let itemStr = localStorage.getItem(key);

    // If the item doesn't exist, return null
    if (!itemStr) {
        return null;
    }

    let item = JSON.parse(itemStr);
    let now = new Date().toLocaleString("en-GB", {timeZone: "Europe/Istanbul"});
    let itemTime = new Date(item.time).getTime();
    let nowTime = new Date(now).getTime();

    // If the item is more than a day old, delete it and return null
    if (nowTime - itemTime > 24 * 60 * 60 * 1000) {
        localStorage.removeItem(key);
        return null;
    }

    // Otherwise, return the item
    return item.value;
}

function getData(){
    let input = JSON.parse(inputVal);
    for(let i = 0; i < rows.length; i++){
        for(let j = 0; j < cols.length; j++){
            let result = getLocalStorageItem(rows[i] + cols[j]);
            let key = rows[i] + cols[j];
            input[key] = result;
        }
    }
    inputVal = JSON.stringify(input);
}

function Selector(rowselector1, rowselector2, colselector1, colselector2, setselector){
    // Get a specific range of the rows and cols arrays
    let rowsSubset = rows.slice(rowselector1, rowselector2);  // Change the numbers to get the range you want
    let colsSubset = cols.slice(colselector1, colselector2);  // Change the numbers to get the range you want
    let set = [];

    for(let j = 0; j < rowsSubset.length; j++){
        for(let i = 0; i < colsSubset.length; i++){
            let result = rowsSubset[j] + colsSubset[i];
            set.push(result);
        }
    }
    let setString = JSON.stringify(set);

    setselector.push(setString);
}

function Solver(Row, RS1, RS2, CS1, CS2, SS){
    Selector(RS1, RS2, CS1, CS2, SS);
    let HL = JSON.parse(HorizontalLine["Line"+String(Row)]);
    let iV = JSON.parse(inputVal);
    let nN = JSON.parse(note);
    let iVR = [];
    let iVC = [];

    for(let i = 0; i < HL.length; i++){
        let key = HL[i];
        let result = iV[key];
        result = parseInt(result);
        iVR.push(result);
    }

    for(let j = 0; j < iVR.length;  j++){
        if(iVR[j] == 0){
            let mN = numbers.filter(num => !iVR.includes(num));
            let key1 = HL[j];
            nN[key1] = mN.map(num => parseInt(num));
            Selector(0,9,j,j+1,VertialLine["Line"+String(j)]);
            let VL = JSON.parse(VertialLine["Line"+String(j)]);
            for(let x = 0; x < VL.length; x++){
                let key2 = VL[x];
                let result = iV[key2];
                result = parseInt(result);
                iVC.push(result);
            }
            for(let l = 0; l < iVC.length; l++){
                if(iVC[l] == 0){
                    let possibleNumbers = mN.filter(num => !iVC.includes(num));
                    if(possibleNumbers.length === 1){
                        nN[key1] = possibleNumbers[0];
                    }
                }
            }
            console.log(nN);
        }
    }
}

getData();
Solver(1,0,1,0,9,HorizontalLine["Line1"])
*/

/*
Selector(0,1,0,1,ThreeThree["First"]);
console.log(JSON.parse(ThreeThree["First"]))*/