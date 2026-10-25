const savedName = localStorage.getItem("visitorName");
if (savedName) {
  document.getElementById("greeting").textContent = `Hello, ${savedName}!`;
}

let count = 0;
document.getElementById("btn").addEventListener("click", () => {
  count++;
  document.getElementById("msg").textContent = `Clicked ${count} time${count === 1 ? "" : "s"}!`;
});

document.getElementById("apiBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const out = document.getElementById("apiMsg");
  try {
    const res = await fetch(`/api/hello?name=${encodeURIComponent(name)}`);
    const data = await res.json();
    out.textContent = `${data.message} (server time: ${data.time})`;
    if (name) {
      document.getElementById("greeting").textContent = `Hello, ${name}!`;
      localStorage.setItem("visitorName", name);
    }
  } catch (err) {
    out.textContent = "API not available. Run `vercel dev` locally or deploy to Vercel.";
  }
});
