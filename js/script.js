const mainElement = document.getElementsByTagName("main")[0];

const data = [
  {
    title: "إنهاء الخدمة (دفعة 6)",
    targetDay: new Date("2023", "06" - 1, "01", "00", "00", "00"),
    todayID: "today1",
    resultID: "result1",
  }
];

function createBox(dataObj) {
  console.log(dataObj);
  mainElement.innerHTML += `
  <div class="box">
    <h2>${dataObj.title}</h2>
    <p class="title-box" dir="auto">
      <span class="title">الآن:</span>
      <strong class="value"><span id="${dataObj.todayID
    }">dd/mm/yyy</span></strong>
    </p>
    <p class="title-box" dir="auto">
      <span class="title">إلى:</span>
      <strong class="value"><span>${formattedDate(
      dataObj.targetDay
    )}</span></strong>
    </p>
    <p class="title-box last" dir="auto">
      <span class="title">المتبقي:</span>
      <strong class="value"><span id="${dataObj.resultID
    }">dd/mm/yyy</span></strong>
    </p>
  </div>    
  `;
}

data.forEach((element) => createBox(element));

data.forEach((element) => {
  element.todayElement = document.getElementById(element.todayID);
  element.resultElement = document.getElementById(element.resultID);
});

setInterval(() => {
  today = new Date();
  data.forEach((element) => {
    element.todayElement.innerText = `${today
      .getDate()
      .toString()
      .padStart(2, "0")}/${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${today
          .getFullYear()
          .toString()
          .padStart(4, "0")} ${today.getHours().toString().padStart(2, "0")}:${today
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${today.getSeconds().toString().padStart(2, "0")}`;

    element.resultElement.innerText = getRemainingTime(
      today,
      element.targetDay
    );
  });
}, 1000);

function formattedDate(d = new Date()) {
  return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
    .map((n) => (n < 10 ? `0${n}` : `${n}`))
    .join("-");
}

function getRemainingTime(dateNow, targetDate) {
  // get total seconds between the times
  delta = Math.abs(targetDate - dateNow) / 1000;

  // calculate (and subtract) whole days
  days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  seconds = delta % 60; // in theory the modulus is not required

  return `${days} يوم، ${hours} ساعة، ${minutes} دقيقة، ${Math.floor(
    seconds
  )} ثانية`;
}
