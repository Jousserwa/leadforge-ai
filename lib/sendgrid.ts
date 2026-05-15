import sgMail from "@sendgrid/mail";

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function sendColdEmail(to: string, subject: string, body: string, leadId?: string) {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL || "hello@leadforge-ai.com",
    subject,
    text: body,
    html: body.replace(/\n/g, '<br>'),
    customArgs: leadId ? { leadId } : undefined,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error("SendGrid error:", error);
    return { success: false, error };
  }
}
