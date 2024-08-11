const 文字欄 = document.querySelector(".文字欄");
const 清單 = document.querySelector(".清單");
const 按鈕 = document.querySelector(".按鈕");

function 儲存任務() {
  const 任務紀錄 = Array.from(清單.children).map(任務元素 => 
    //Array.from可以將()內的資料轉換為數組，清單.childeren指的是清單底下的元素。
    //任務元素指的就是li
    ({
    text: 任務元素.querySelector('label').textContent.trim(),
    completed: 任務元素.querySelector('.打勾方塊').checked
  }));
  localStorage.setItem('任務紀錄', JSON.stringify(任務紀錄));
}

function 新任務(文字 = 文字欄.value, 是否完成 = false) {
  if (文字 === "") {
    return;
  }
  const 任務 = document.createElement("li");
  任務.innerHTML = `
    <input type="checkbox" class="打勾方塊" ${是否完成 ? "checked" : ""}>
    <label>${文字}</label>
    <button class="垃圾桶">🗑</button>
  `;
  // ? : 是三元運算符(條件 ? 如果為真時的值 : 如果為假時的值)，第一項條件若為ture(是否完成)，則會返回第二項(checked，是input元素的狀態，當ture時為打勾狀態，反之無打勾)，false則回傳第三項結果("")。
  if (是否完成) {
    任務.style.textDecoration = "line-through";
    任務.style.color = "#999";
  }
  清單.append(任務); //透過這行就能知道要將任務新增在哪邊，append指的就是放在最下方。

  文字欄.value = "";

  const 垃圾桶 = 任務.querySelector(".垃圾桶");
  const 打勾方塊 = 任務.querySelector(".打勾方塊");

  垃圾桶.addEventListener("click", function () {
    任務.remove();
    儲存任務();
  });

  打勾方塊.addEventListener("change", function () {
    if (打勾方塊.checked) {
      任務.style.textDecoration = "line-through";
      任務.style.color = "#999";
      清單.append(任務);
    } else {
      任務.style.textDecoration = "none";
      任務.style.color = "";
      清單.prepend(任務);
    }
    儲存任務();
  });

  儲存任務();
}

按鈕.addEventListener("click", 新任務);

文字欄.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    新任務();
  }
});

window.onload = () => {
  const 任務紀錄 = JSON.parse(localStorage.getItem('任務紀錄')) || [];
  任務紀錄.forEach(任務元素 => {
    新任務(任務元素.text, 任務元素.completed, true);
  });
};
