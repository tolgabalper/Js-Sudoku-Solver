let welcomeDiv = document.getElementById("welcome-div");
let welcome = document.getElementById("welcome");
let welcome2 = document.getElementById("welcome2");
let skip = document.getElementById("skip");
let rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
let cols = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function SudokuGen(){
    // Loop over each row
    for (let i = 0; i < rows.length; i++) {
        // Create a new table row
        let tableRow = document.createElement("tr");
        tableRow.setAttribute("id", rows[i] + "Row");
        tableRow.setAttribute("style", "display: table-row; width: 10%")
        document.getElementById("sudoku").append(tableRow);

        // Loop over each column
        for (let j = 0; j < cols.length; j++) {
            // Create a new table data cell
            let tableRowData = document.createElement("td");
            tableRowData.setAttribute("id", rows[i] + cols[j]);
            document.getElementById(rows[i] + "Row").append(tableRowData);

            // Create a new input element
            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("id", rows[i] + cols[j] + "-input");
            input.setAttribute("maxlength", "1");
            input.setAttribute("style","width: 50px;")
            document.getElementById(rows[i] + cols[j]).append(input);
        }
    }
}

function LocalStorageSudoku(){
    let now = new Date().toLocaleString("en-GB", {timeZone: "Europe/Istanbul"});
    // Loop over each row
    for (let i = 0; i < rows.length; i++) {
        // Loop over each column
        for (let j = 0; j < cols.length; j++) {
            let input = document.getElementById(rows[i] + cols[j] + "-input");
            let inputVal = input.value;
            localStorage.setItem(rows[i] + cols[j], JSON.stringify({value: inputVal, date: now}));
        }
    }
}

document.getElementById('skip').addEventListener('click', function(event) {
    event.preventDefault();
    welcomeDiv.style.display = "none";
    welcomeDiv.style.transition = "linear 1s";
    skip.style.display = "none";
    skip.style.transition = "linear 1s";
    let h1 = document.createElement("h1");
    h1.textContent = "Sudoku Solver Ultimate";
    document.getElementById("text-center").append(h1);
    let help = document.createElement("button");
    help.textContent = "Help";
    help.setAttribute("id", "help");
    document.getElementById("text-center").append(help);
    let helpDiv = document.createElement("div");
    helpDiv.setAttribute("id", "help-div");
    helpDiv.setAttribute("style", "display: none;");
    document.getElementById("text-center").append(helpDiv);
    let form = document.createElement("form");
    form.setAttribute("id", "form");
    document.getElementById("text-center").append(form);
    let sudoku = document.createElement("table");
    sudoku.setAttribute("id", "sudoku");
    document.getElementById("form").append(sudoku);
    let solve = document.createElement("button");
    solve.textContent = "Solve";
    solve.setAttribute("id", "solve");
    document.getElementById("text-center").append(solve);
    SudokuGen();
    document.getElementById('solve').addEventListener('click', function(event) {
        event.preventDefault();
        LocalStorageSudoku();
        window.location.href = "sudoku.html";
    });
    document.getElementById('help').addEventListener('click', function(event) {
        event.preventDefault();
        helpDiv.style.display = "block";
        let h2 = document.createElement("h2");
        h2.textContent = "How to Use";
        document.getElementById("help-div").append(h2);
        let p = document.createElement("p");
        p.textContent = "Fill in the blank spaces with the numbers 1-9(For blank spaces please enter 0(zero)) according to your sudoku. Once you have filled in all the blank cells click the 'Solve' button to see the solution.";
        document.getElementById("help-div").append(p);
    });
});