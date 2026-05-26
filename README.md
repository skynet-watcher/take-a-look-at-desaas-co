# DeSaaS Stack Audit Prototype

Static prototype for the DeSaaS 12-month conversion estimator and 8-minute SaaS stack audit.

## Pages

- `/` - 12-month estimated conversion plan
- `/audit.html` - guided stack audit with known-tool picker, company-size predictions, local logo marks, and proposal submission flow

## Notes

- Shared browser state is stored in `localStorage` under `desaas_audit_v1`.
- The audit and estimator pass handoff values through URL parameters.
- Tool logo marks are local SVGs in `assets/tool-logos/`.
- `api/audit-submit.js` expects `RESEND_API_KEY` and optional `DESAAS_AUDIT_TO` in Vercel.

## Deploy

This project is already compatible with Vercel as a static site plus one serverless function.
