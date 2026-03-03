export async function submitInquiry(formType, payload) {
  const record = {
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
    formType,
    payload,
  };
  try {
    const key = "praktikax_local_inquiries";
    const raw = localStorage.getItem(key);
    const existing = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(existing) ? [...existing, record] : [record];
    localStorage.setItem(key, JSON.stringify(next));
  } catch {
    // no-op: keep UI flow working even if storage is blocked
  }
  return { ok: true, data: record };
}
