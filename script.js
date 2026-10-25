function timeGreeting() {
  const hour = new Date().getHours(); // visitor's local time
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function showGreeting(name) {
  const text = name ? `${timeGreeting()}, ${name}!` : `${timeGreeting()}!`;
  document.getElementById("greeting").textContent = text;
}

showGreeting(localStorage.getItem("visitorName"));

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
      showGreeting(name);
      localStorage.setItem("visitorName", name);
    }
  } catch (err) {
    out.textContent = "API not available. Run `vercel dev` locally or deploy to Vercel.";
  }
});
