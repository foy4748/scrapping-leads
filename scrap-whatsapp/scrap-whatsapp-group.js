// Project - Grab WhatsApp numbers from group
storage = new Map();
function GrabWhatsAppGroupParticipantsNumbers() {
  numberContainer = document.querySelector(
    ".x9f619.x78zum5.xdt5ytf.x16w0wmm.x6ikm8r.x10wlt62.x1xn7y0n.x1uxb8k9.x1vmbcc8.x16xm01d.xs2e80n.x1n2onr6.x1iyjqo2.xs83m0k.x1l7klhg.xs8rnei.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x1coevs8.x14z9mp.xui9b5u.x1lziwak.xg3pqpk.xusj4dd.x1a6k631.x1fwmvtr.x1n7bigs.x6ln8mz.x12v3509.xf35npv",
  );

  allRows = numberContainer.querySelectorAll(".x10l6tqk.xh8yej3.x1g42fcv");

  for (let i = 0; i < allRows.length; i++) {
    const singleRow = allRows[i];
    const numberOwner = singleRow.querySelector(
      '[data-testid="cell-frame-title"]',
    );

    if (numberOwner || numberOwner?.querySelector(".x78zum5")?.textContent) {
      const numberOwnerStr =
        numberOwner?.querySelector(".x78zum5")?.textContent;
      let phoneNumber;
      let name;

      if (numberOwnerStr[0] == "+") phoneNumber = numberOwnerStr;
      else {
        name = numberOwnerStr;
        const numberContainer = singleRow.querySelector(
          "span.x1rg5ohu.x158ke7r.xdod15v",
        );
        phoneNumber = numberContainer?.textContent;
      }
      const newEntry = {
        name,
        phoneNumber,
      };
      // console.log(phoneNumber);
      storage.set(newEntry.phoneNumber, newEntry);
    }
  }
}
