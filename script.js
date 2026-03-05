// ===== QUIZ (Подобрать услугу) =====
const BOT_TOKEN = "8708994072:AAH7qBe2PmX3MYZEONS8SKdUbpt1zoXgqXI";
const CHAT_ID = 2033289831;
const quizModal = document.getElementById("quizModal");
const openQuiz = document.getElementById("openQuiz");
const closeQuiz = document.getElementById("closeQuiz");
const quizForm = document.getElementById("quizForm");
const quizStatus = document.getElementById("quizStatus");

if (openQuiz && quizModal && closeQuiz && quizForm && quizStatus) {
  openQuiz.addEventListener("click", () => {
    quizModal.classList.add("show");
  });

  closeQuiz.addEventListener("click", () => {
    quizModal.classList.remove("show");
  });

  quizModal.addEventListener("click", (e) => {
    if (e.target === quizModal) quizModal.classList.remove("show");
  });

  quizForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(quizForm);
    const service = data.get("service");
    const time = data.get("time");
    const phone = data.get("phone");

    let recommendation = "";
    if (service === "Стрижка") recommendation = "Рекомендуем: стрижка + укладка";
    if (service === "Маникюр") recommendation = "Рекомендуем: маникюр + покрытие гель-лак";
    if (service === "Брови") recommendation = "Рекомендуем: коррекция + окрашивание";

    const text =
      `🧠 Квиз (подбор услуги)\n` +
      `💅 Интересует: ${service}\n` +
      `⏰ Когда удобно: ${time}\n` +
      `📞 Телефон: ${phone}\n` +
      `✅ ${recommendation}`;

    quizStatus.textContent = "Отправляю...";

    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),
      });

      const json = await res.json();
      if (!json.ok) throw new Error(JSON.stringify(json));

      quizStatus.textContent = "Готово ✅ Мы скоро свяжемся!";
      quizForm.reset();

      setTimeout(() => {
        quizModal.classList.remove("show");
        quizStatus.textContent = "";
      }, 1000);

    } catch (err) {
      quizStatus.textContent = "Ошибка ❌ Открой Console (F12)";
      console.error("Ошибка квиза:", err);
    }
  });

} else {
  console.log("Квиз: не найден элемент. Проверь id openQuiz/quizModal/closeQuiz/quizForm/quizStatus в HTML");
}
// ===== BEFORE / AFTER slider =====
document.querySelectorAll(".before-after").forEach((block) => {
  const after = block.querySelector(".ba-after");
  const range = block.querySelector(".ba-range");
  const line = block.querySelector(".ba-line");

  const update = (value) => {
    after.style.width = value + "%";
    line.style.left = value + "%";
  };

  update(range.value);

  range.addEventListener("input", (e) => {
    update(e.target.value);
  });
});
// ===== PROMO POPUP (-10%) =====
const promoPopup = document.getElementById("promoPopup");
const closePromo = document.getElementById("closePromo");
const promoForm = document.getElementById("promoForm");
const promoStatus = document.getElementById("promoStatus");

// показать попап 1 раз в день
function canShowPromo() {
  const last = localStorage.getItem("promo_last_shown");
  if (!last) return true;

  const lastTime = Number(last);
  const oneDay = 24 * 60 * 60 * 1000;
  return Date.now() - lastTime > oneDay;
}

function markPromoShown() {
  localStorage.setItem("promo_last_shown", String(Date.now()));
}

if (promoPopup && closePromo && promoForm && promoStatus) {
  // показать через 5 секунд
  if (canShowPromo()) {
    setTimeout(() => {
      promoPopup.classList.add("show");
      markPromoShown();
    }, 5000);
  }

  closePromo.addEventListener("click", () => {
    promoPopup.classList.remove("show");
  });

  promoPopup.addEventListener("click", (e) => {
    if (e.target === promoPopup) promoPopup.classList.remove("show");
  });

  promoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(promoForm);
    const phone = data.get("phone");

    const text =
      `🎁 Заявка на скидку -10%\n` +
      `📞 Телефон: ${phone}\n` +
      `✅ Промокод: BEAUTY10`;

    promoStatus.textContent = "Отправляю...";

    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),
      });

      const json = await res.json();
      if (!json.ok) throw new Error(JSON.stringify(json));

      promoStatus.textContent = "Готово ✅ Промокод: BEAUTY10";
      promoForm.reset();

      setTimeout(() => {
        promoPopup.classList.remove("show");
        promoStatus.textContent = "";
      }, 1200);

    } catch (err) {
      promoStatus.textContent = "Ошибка ❌ Открой Console (F12)";
      console.error("Ошибка промо:", err);
    }
  });
} else {
  console.log("Промо: не найден элемент. Проверь id promoPopup/closePromo/promoForm/promoStatus");
}