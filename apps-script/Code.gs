/**
 * PlutoSolve lead intake (Google Apps Script web app).
 *
 * Setup: create a Google Sheet, Extensions → Apps Script, paste this file, set TEAM_EMAIL,
 * then Deploy → New deployment → Web app (execute as Me, access: Anyone). Put the /exec URL in
 * VITE_ENQUIRY_ENDPOINT. Handles two kinds of POST (JSON sent as text/plain):
 *   - type "portfolio_request"  → the Our Work "Request the complete portfolio" form
 *   - anything else             → the Contact page enquiry form
 */
const TEAM_EMAIL = 'contact@plutosolve.com'; // confirm the official contact address
const SITE_URL = 'https://plutosolve.com';

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.type === 'portfolio_request') return handlePortfolio(d);
  return handleEnquiry(d);
}

function sheet(name, header) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(header); }
  return sh;
}

/* ───────── Our Work: portfolio request ───────── */
function handlePortfolio(d) {
  const now = new Date();
  // CRM / lead-sheet fields
  sheet('Leads', [
    'Created', 'Lead source', 'Lead type', 'Lead status', 'Interest category',
    'Full name', 'Work email', 'Company', 'Phone', 'Project context', 'Source page',
  ]).appendRow([
    now, 'Website', 'Portfolio Request', 'New', d.area_of_interest || '',
    d.full_name, d.work_email, d.company_name || '', d.phone_number || '', d.project_context || '',
    d.source_page || 'Our Work — Complete Portfolio Request',
  ]);

  const firstName = String(d.full_name || '').trim().split(/\s+/)[0] || 'there';

  // Visitor confirmation email
  MailApp.sendEmail({
    to: d.work_email,
    replyTo: TEAM_EMAIL,
    name: 'PlutoSolve',
    subject: "We've received your PlutoSolve portfolio request",
    body:
      'Hi ' + firstName + ',\n\n' +
      'Thank you for your interest in PlutoSolve.\n\n' +
      "We've received your request for our detailed portfolio. Our team will review your area of interest and get back to you with relevant examples of our work and capabilities.\n\n" +
      'In the meantime, you can explore more about what we do on our website: ' + SITE_URL + '\n\n' +
      'Looking forward to connecting.\n\n' +
      'Regards,\nTeam PlutoSolve\nIdeas to Impact.',
  });

  // Internal lead notification
  MailApp.sendEmail({
    to: TEAM_EMAIL,
    replyTo: d.work_email,
    subject: 'New portfolio request — ' + d.full_name,
    body:
      'Name: ' + d.full_name + '\n' +
      'Work email: ' + d.work_email + '\n' +
      'Company: ' + (d.company_name || '') + '\n' +
      'Phone: ' + (d.phone_number || '') + '\n' +
      'Area of interest: ' + (d.area_of_interest || '') + '\n' +
      'Project context: ' + (d.project_context || '') + '\n' +
      'Submitted at: ' + now.toISOString() + '\n' +
      'Source page: Our Work — Complete Portfolio Request',
  });
  return ContentService.createTextOutput('ok');
}

/* ───────── Contact page enquiry ───────── */
function handleEnquiry(d) {
  sheet('Enquiries', ['Created', 'Name', 'Email', 'Company', 'Needs', 'Message', 'Page']).appendRow([
    new Date(), d.n, d.e, d.c || '', d.s, d.m, d.page || '',
  ]);
  MailApp.sendEmail({
    to: TEAM_EMAIL,
    replyTo: d.e,
    subject: 'New enquiry from ' + d.n,
    body: 'Name: ' + d.n + '\nEmail: ' + d.e + '\nCompany: ' + (d.c || '') + '\nNeeds: ' + d.s + '\n\n' + d.m,
  });
  return ContentService.createTextOutput('ok');
}
