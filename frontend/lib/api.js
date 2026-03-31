const BASE_URL = "http://127.0.0.1:8000";


export async function extractData(formData) {
  const res = await fetch(`${BASE_URL}/extract`, {
    method: "POST",
    body:formData,
  });
  return res.json();
}

export async function queryData(question, context) {
  const res = await fetch(`${BASE_URL}/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, context }),
  });
  return res.json();
}