import fs from "fs/promises";

const failedIds = [];

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

function sanitizeFilename(filename) {
  // Replace invalid Windows filename characters
  const invalidChars = /[<>:"/\\|?*\x00-\x1f]/g;

  // Also handle special cases
  let safe = filename
    // Replace invalid characters with underscore
    .replace(invalidChars, "_")
    // Replace colon (:) which is common in your data
    .replace(/:/g, "_")
    // Replace pipe (|)
    .replace(/\|/g, "_")
    // Replace multiple spaces with single space
    .replace(/\s+/g, " ")
    // Trim spaces from start and end
    .trim()
    // Limit filename length (Windows max is 255)
    .substring(0, 200);

  // Handle Bengali specific issues
  safe = safe
    // Remove any invisible/control characters
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    // Normalize Unicode (decompose combined characters)
    .normalize("NFC");

  // Ensure filename is not empty
  if (!safe || safe === ".") {
    safe = "unnamed_file";
  }

  return safe;
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
    // downloadJSONFile(data, sanitizeFilename(fileName) + ".json");
    // storage = {};
    fs.writeFile(
      `..\\..\\ntrca-emis-leads\\teachers\\${sanitizeFilename(fileName)}.json`,
      JSON.stringify(data),
    )
      .then(() => {
        console.log(`✅ DOWNLOAD SUCCESS - ${fileName}.json`);
      })
      .catch((err) => {
        if (err) {
          console.log(`Error writing ${fileName}.json`, err);
        }
        failedIds.push(Number(singleInstitute.Id));
      });
  }
  console.log("failedIds", failedIds);
}

async function main() {
  const ZoneIds = ["6"];
  for (let ZoneId of ZoneIds) {
    const institutes = await getInstitues(ZoneId);
    await getTeachersData(institutes);
  }
}

main();

// 1 - 3228 - BARISHAL;
// 2 - 2911 - CHATTOGRAM;
// 3 - 2469 - CUMILLA;
// 4 - 4345 - DHAKA;
// 5 - 4699 - KHULNA;
// 6 - 3935 - MYMENSINGH;
// 7 - 5485 - RAJSHAHI;
// 8 - 5408 - RANGPUR;
// 9 - 1578 - SYLHET;
