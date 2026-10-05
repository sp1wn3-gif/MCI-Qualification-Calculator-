# MCI Copilot Qualification Calculator

Standalone, single-file HTML tool for qualifying customers for Microsoft Commerce
Incentives funding under Frontier Accelerate for Copilot (FY27). `index.html` is
fully self-contained (no build step), so it can be served by any static host.

## Source of truth

Figures follow the **Microsoft Commercial Partner Incentives Guide, edition 5 October 2026**.

That edition repriced the Copilot engagements with effect from 1 October 2026:

- **Pot 01 Envisioning & POC** — payments cut at XS, S and M; attainment targets cut with them.
- **Pot 02 M365 Copilot Deployment Accelerator** and **Pot 03 Cowork and Agent Solution
  Deployment Accelerator** — headline totals unchanged, but now two-stage nomination
  engagements: 65% guaranteed on POE approval, 35% conditional on reaching the nominated
  band within a six-month evaluation window.
- Approved claims per customer tenant reduced from four to two.

Claims nominated on or before 30 September 2026 keep the previous rates.

## Deploy

Hosted on Vercel as a static site. Every push to the connected branch triggers a new deployment.

## Local use

Open `index.html` directly in a browser.
