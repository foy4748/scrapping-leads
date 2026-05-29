// let institutes = [];

// storage = {};

function convertToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr);

  return array
    .map((it) => {
      return Object.values(it).toString();
    })
    .join("\n");
}
function downloadTableAsCSV(csvData, filename) {
  const csv = csvData;

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

function downloadJSONFile(jsonData, filename) {
  // Convert JSON object to string
  const jsonString = JSON.stringify(jsonData, null, 2); // Pretty print with 2 spaces

  // Create download link
  const blob = new Blob([jsonString], {
    type: "application/json;charset=utf-8;",
  });
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

async function getInstitues(ZoneId) {
  const payload = new URLSearchParams({
    ZoneId,
  });
  const res = await fetch("https://emis.gov.bd/emis/Portal/GetInstitute", {
    method: "POST",
    body: payload,
  });
  const { Entities: data } = await res.json();
  return data;
}

async function getTeachersData(institutes) {
  for (let singleInstitute of institutes) {
    const payload = new URLSearchParams({
      instituteId: singleInstitute.Id,
      EIIN: "",
      isTeacher: "",
    });
    const res = await fetch(
      "https://emis.gov.bd/emis/Portal/GetTeacherDetails",
      {
        method: "POST",
        body: payload,
      },
    );
    const data = await res.json();
    const fileName = `${singleInstitute.Id} - ${singleInstitute.InstituteName} - ${singleInstitute.InstituteNameInBangla}`;
    // storage[fileName] = data;
    // const csvData = convertToCSV(data);
    console.log(`Downloading - ${fileName}`);
    // downloadTableAsCSV(csvData, fileName + ".csv");
    downloadJSONFile(data, fileName + ".json");
    // storage = {};
  }
}

async function main() {
  const ZoneIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (let ZoneId of ZoneIds) {
    const institutes = await getInstitues(ZoneId);
    await getTeachersData(institutes);
  }
}
