institutes = [];

storage = {};
async function getTeachersData() {
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
    storage[
      `${singleInstitute.Id} - ${singleInstitute.InstituteName} - ${singleInstitute.InstituteNameInBangla}`
    ] = data;
  }
}
