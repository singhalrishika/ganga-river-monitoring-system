const form = document.getElementById("reportForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    location: form.location.value,
    issue: form.issue.value,
    observation: form.observation.value
  };

  const res = await fetch("/api/submit-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.message);
  form.reset();
});