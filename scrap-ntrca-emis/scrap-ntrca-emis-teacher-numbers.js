function downloadTableAsCSV(tableElement, filename = "table_data.csv") {
  // Convert table to CSV
  const rows = tableElement.querySelectorAll("tr");
  const csvData = [];

  rows.forEach((row) => {
    const rowData = [];
    const cells = row.querySelectorAll("td, th");

    cells.forEach((cell, idx) => {
      let text = cell?.textContent?.trim();

      // Checking for image src
      if (idx == 1) {
        const img = cell?.querySelector("img");
        if (img) {
          text = img?.src?.trim();
        }
      }

      // Escape quotes and wrap in quotes if needed
      if (text.includes(",") || text.includes('"') || text.includes("\n")) {
        text = text.replace(/"/g, '""');
        text = `"${text}"`;
      }

      rowData.push(text);
    });

    csvData.push(rowData.join(","));
  });

  const csv = csvData.join("\n");

  // Create download link
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Usage
teachersInformationTable = document.querySelector("#empTable");
instituteName = document.querySelector("#select2-chosen-2").textContent;
downloadTableAsCSV(
  teachersInformationTable,
  `${instituteName || "exported_data"}.csv`,
);
