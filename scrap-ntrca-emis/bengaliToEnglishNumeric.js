const bengaliToEnglishNumeric = (str) => {
  const map = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };
  return str.replace(/[০-৯]/g, (m) => map[m]);
};

console.log(bengaliToEnglishNumeric("১২৩৪৫৬৭৮৯০")); // "1234567890"
console.log(bengaliToEnglishNumeric("মোবাইল নম্বর: ০১৭১২৩৪৫৬৭৮")); // "মোবাইল নম্বর: 01712345678"
console.log(bengaliToEnglishNumeric("দাম: ৫০০ টাকা")); // "দাম: 500 টাকা"
