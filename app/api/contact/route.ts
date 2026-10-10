import { Resend } from "resend";
import { NextResponse } from "next/server";

const recipient = process.env.RESEND_TO_EMAIL || "ukoohomes@gmail.com";

function redirectWithStatus(request: Request, status: "success" | "error") {
  const referer = request.headers.get("referer");
  const url = new URL(referer || "/site-visit", request.url);
  url.searchParams.set("submitted", status);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const formType = String(formData.get("formType") || "");
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const property = String(formData.get("property") || "").trim();
  const preferredDate = String(formData.get("preferredDate") || "").trim();
  const development = String(formData.get("development") || "").trim();

  if (!["site-visit", "property-enquiry"].includes(formType) || !name || !phone) {
    return redirectWithStatus(request, "error");
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    console.error("Resend is not configured: missing RESEND_API_KEY or RESEND_FROM_EMAIL");
    return redirectWithStatus(request, "error");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const subject = formType === "site-visit"
    ? `New site visit request from ${name}`
    : `New property enquiry from ${name}`;
  const details = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || "Not provided"}`,
    formType === "site-visit" ? `Preferred date: ${preferredDate || "Not provided"}` : `Property: ${property || "Not provided"}`,
    formType === "site-visit" ? `Development: ${development || "Not selected"}` : null,
  ].filter(Boolean).join("\n");

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: recipient,
    replyTo: email || undefined,
    subject,
    text: details,
  });

  if (error) {
    console.error("Unable to send contact form email", error);
    return redirectWithStatus(request, "error");
  }

  return redirectWithStatus(request, "success");
}
