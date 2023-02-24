/* SOURCE & REFERENCES: This code was written with help from OpenAI's Chat GPT. */

/* PROGRAM: */ 

const csvFileInput = document.getElementById('csv-file');

// Prevent Input from Being Clicked after Selection
function disableInput() {
  document.getElementById("csv-file").disabled = true;
}

// Read in CSV
csvFileInput.addEventListener('change', () => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const csvData = event.target.result; // Assume the CSV data is stored in a variable called 'csvData'
    const rows = csvData.split("\n"); // Split data by line breaks to get an array of rows
    const data = []; // Array to store the data

    /* Part I: Sort by Last Name */ 

    // Split the CSV Data into an Array of Rows
    const rowsForSort = csvData.split("\n");

    // Extract the Header Row and the Data Rows
    const headerRowForSort = rowsForSort[0];
    const dataRows = rowsForSort.slice(1);

    // Define a Function to Extract the Last Word from a String
    function getLastWord(str) {
      const words = str.split(" ");
      return words[words.length - 1];
    }

    // Sort the Data Rows by the Last Word in the First Column
    dataRows.sort((a, b) => {
      const aLastWord = getLastWord(a.split(",")[0]);
      const bLastWord = getLastWord(b.split(",")[0]);
      return aLastWord.localeCompare(bLastWord);
    });

    // Combine the Header Row and the Sorted Data Rows Back into a CSV String
    const sortedCsvData = [headerRowForSort, ...dataRows].join("\n");

    // Save the Sorted Data to a New CSV File
    const fileName = 'SortedContacts.csv';
    const blob = new Blob([sortedCsvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    // Uncomment if Download of Sorted File Needed
    //link.href = URL.createObjectURL(blob);
    //link.download = fileName;
    //link.click();

    /* Part II: Display Contacts from CSV  */
    const csvData2 = sortedCsvData;
    const rowsSorted = csvData2.split("\n"); // Split data by line breaks to get an array of rows

    // Add Quotes to Every Cell Not Already in Quotes
    const rowsSortedCleanedPre = sortedCsvData.replace(/(?<=^|,)([^",\r\n]*("[^"\r\n]*")?[^",\r\n]*)(?=$|,)/g, '"$1"');
    const rowsSortedCleaned = rowsSortedCleanedPre.split("\n");
    
    const dataSorted = []; // Array to store the data

    // Clean Data
    for (let i = 0; i < rowsSortedCleaned.length; i++) {
      const row = rowsSortedCleaned[i];
      const columns = row.match(/(".*?"|[^",\r\n]+)(?=\s*,|\s*$)/g); // Use regular expression to split row into columns, accounting for commas in quoted fields
      const columnsWithoutQuotes = columns.map(str => str.replace(/["]/g, '')); // JavaScript function call that removes all occurrences of double quotes (") from a string str
      if (columnsWithoutQuotes != null) {
        data.push(columnsWithoutQuotes);
      }
    }

    // Assess Data
    //console.log (rowsSorted);

    // Create HTML Table Element
    const table = document.createElement("table");
    const header = table.createTHead();

    // Uncomment if Header Cell Desired
    //const headerRow = header.insertRow();
    //const headerCell = document.createElement("th");
    //headerCell.textContent = "Contacts"; // Replace with appropriate header name
    //headerRow.appendChild(headerCell);

    // Create Table
    const body = table.createTBody();

    // Add Header Rows to Table
    const row1 = body.insertRow();
    for (let h = 0; h < data[0].length; h++) {
        const headerCell = row1.insertCell();
        headerCell.textContent = data[0][h]; // Add cell value to table cell
    }

    // Add Cells to Table
    for (let i = 1; i < data.length; i++) {
      const row = body.insertRow();
      for (let j = 0; j < data[i].length; j++) {
        const cell = row.insertCell();
        var infoToAddToCell = data[i][j];
        cell.textContent = infoToAddToCell; // Add cell value to table cell
      }
    }

    // Append Table to HTML Document
    const tableDiv = document.getElementById("table-div"); // Replace with appropriate div ID
    tableDiv.appendChild(table);
  };

  reader.readAsText(csvFileInput.files[0]);
});

/* PROGRAM NOTES & LIMITATIONS: 
(1) At least one row in each column header must have data.
(2) Any data with commas in it must be surrounded with quotation marks. 
(3) Ensure there are no blank rows at the end of the given csv.
(4) The last column must have data for each row in order for a cell to be pushed.
*/

/* POSSIBLE EXTENSIONS:
(1) Second Order Sort Using First Word?
(3) Search Functionality?
(4) Download Functionality?
*/

/* EDUCATIONAL NOTES: 
(1) CSS Selectors:
In CSS, you can combine the # selector with an HTML element selector to target a specific HTML element with a particular ID. 
For example, if you have an HTML div element with an ID of "my-element", and you want to apply a CSS style to only p elements inside that div, you can use the following selector:
#my-element p { 
  CSS rules for p elements inside my-element go here...
}
(2) Regex:
The * quantifier means "zero or more occurrences". For example, the regular expression /ab*c/ would match any string that has an "a" followed by zero or more "b"s, and then a "c". So it would match "ac", "abc", "abbc", "abbbc", and so on.
The + quantifier means "one or more occurrences". For example, the regular expression /ab+c/ would match any string that has an "a" followed by one or more "b"s, and then a "c". So it would match "abc", "abbc", "abbbc", and so on, but it would not match "ac" or "a".
The The "//g" flag indicates that the regular expression should be tested against all possible matches in a string. (Picks ALL occurrences.)
*/