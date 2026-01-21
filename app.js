(() => {
  const bookEl = document.getElementById("book");
  const pages = document.querySelectorAll(".page");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageIndicator = document.getElementById("pageIndicator");

  // ✅ กรณีใช้ <script src="...page-flip.browser.js"> จะเรียกผ่าน St.PageFlip :contentReference[oaicite:2]{index=2}
  const pageFlip = new St.PageFlip(bookEl, {
    width: 420,     // base page size (required)
    height: 600,    // base page size (required)
    size: "stretch",
    // เมื่อใช้ stretch แนะนำกำหนด min/max :contentReference[oaicite:3]{index=3}
    minWidth: 320,
    maxWidth: 1100,
    minHeight: 480,
    maxHeight: 1400,

    showCover: true,
    mobileScrollSupport: true,
    flippingTime: 800
  });

  // โหลดหน้าจาก HTML elements :contentReference[oaicite:4]{index=4}
  pageFlip.loadFromHTML(pages);

  function updateUI() {
    const current = pageFlip.getCurrentPageIndex() + 1;
    const total = pageFlip.getPageCount();
    pageIndicator.textContent = `${current} / ${total}`;

    prevBtn.disabled = current <= 1;
    nextBtn.disabled = current >= total;
  }

  prevBtn.addEventListener("click", () => pageFlip.flipPrev());
  nextBtn.addEventListener("click", () => pageFlip.flipNext());

  // คีย์บอร์ด
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") pageFlip.flipPrev();
    if (e.key === "ArrowRight") pageFlip.flipNext();
  });

  // อัปเดตเมื่อมีการ flip :contentReference[oaicite:5]{index=5}
  pageFlip.on("flip", updateUI);

  updateUI();
})();
