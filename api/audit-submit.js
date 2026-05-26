module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const payload = request.body || {};
  const email = payload.contact?.email;
  const website = payload.contact?.website;

  if (!email || !website) {
    return response.status(400).json({ ok: false, error: "Work email and company website are required." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DESAAS_AUDIT_TO || "hello@desaas.com";

  if (!apiKey) {
    return response.status(503).json({
      ok: false,
      error: "Verification email is not configured yet. The proposal remains visible on screen."
    });
  }

  const subject = `New DeSaaS audit draft: ${website}`;
  const summary = payload.proposalSummary || "No summary provided.";
  const html = `
    <h1>New DeSaaS audit draft</h1>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Website:</strong> ${escapeHtml(website)}</p>
    <p><strong>Name:</strong> ${escapeHtml(payload.contact?.name || "")}</p>
    <h2>Summary</h2>
    <p>${escapeHtml(summary)}</p>
    <h2>Payload</h2>
    <pre style="white-space:pre-wrap">${escapeHtml(JSON.stringify(payload, null, 2))}</pre>
  `;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "DeSaaS Audit <onboarding@resend.dev>",
        to,
        reply_to: email,
        subject,
        html
      })
    });

    if (!resendResponse.ok) {
      const detail = await resendResponse.text();
      return response.status(502).json({ ok: false, error: `Email provider rejected the submission. ${detail}` });
    }

    return response.status(200).json({ ok: true });
  } catch {
    return response.status(502).json({ ok: false, error: "Could not submit the verification email." });
  }
};

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}
