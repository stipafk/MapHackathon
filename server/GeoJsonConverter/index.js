const fs = require("fs");

function isSeporator(char) {
  return char === ";";
}

function seporatorAmount(data) {
  let lastIndex = 0;
  let amount = 0;

  while (data[lastIndex] !== "\n") {
    if (isSeporator(data[lastIndex])) {
      amount++;
    }
    lastIndex++;
  }

  lastIndex++;

  return { lastIndex, amount };
}

function getItems(data, amount) {
  let seporatorIndex = 0,
    accum = 0,
    index = 0,
    line = "",
    items = [];
  const rows = [];

  while (data[index]) {
    if (isSeporator(data[index])) {
      seporatorIndex++;
      items.push(line);

      if (seporatorIndex % amount === 0) {
        rows.push(items);
        items = [];
        seporatorIndex = 0;
      }

      line = "";
      accum = 0;
    } else {
      line += data[index];
    }
    index++;
  }

  return rows;
}

function main() {
  fs.readFile("./data-131-structure-1.csv", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const { lastIndex, amount } = seporatorAmount(data);
    const items = getItems(data.slice(lastIndex), amount);
    console.log(items[0]);
    return;
    items.map(item => {
      const [
        accredititationAgency,
        fullName,
        location,
        geodata,
        workingTime,
        regNumber,
        inn,
        date,
        requisites,
        expirationDate,
        programsList,
        reissueDate,
        groundsSuspendingCertificate,
        groundsDeprivationCertificate
      ] = getFeature(item);

      console.log(location);
    });
  });
}

main();
