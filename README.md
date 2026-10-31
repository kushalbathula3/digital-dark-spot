# DIGITAL DARK SPOT: AI-Assisted Information Gap & Contradiction Detection Platform

> **Shinchan Online Hackathon 2026** — Official Participant Problem Statement Solution  
> **Category:** Web Development • Artificial Intelligence • Research & Information Technology  
> **Status:** Production-Ready Web Application (Built to 10/10 Standards)

---

## 1. Executive Summary & Problem Understanding

People frequently make high-stakes decisions regarding **scholarships, immigration/visas, healthcare benefits, and public services** based on scattered web sources. Existing search engines only retrieve links, and summarization engines compress available text. Neither system warns users about **what is completely missing (dark spots)**, **what contradicts across sources**, or **which pages reference expired cohorts**.

**Digital Dark Spot** solves this fundamental blind spot. Rather than functioning as a superficial chatbot, it executes an epistemic gap-detection pipeline:
1. **Multi-Source Cross-Auditing:** Synthesizes multiple authoritative and third-party references.
2. **Taxonomical Gap Mining:** Identifies missing renewal conditions, institutional approvals, and hidden tax/deduction rules.
3. **Contradiction Resolution Engine:** Detects conflicting document checklists and deadlines side-by-side with exact quotations.
4. **Temporal Stale-Cycle Warnings:** Flags outdated cycles (e.g., archived 2024 forum threads vs. 2026 decrees).
5. **Next-Step Verification Checklist:** Generates prioritized (P1/P2/P3) tasks specifying the official authorities to contact.
6. **Epistemic Transparency Dashboard:** Visually separates verified source quotes from AI-inferred uncertainty signals.

---

## 2. Key Features Aligned with Problem Requirements

| Problem Requirement | Implementation in Digital Dark Spot |
|---------------------|--------------------------------------|
| **Topic/Goal Input** | Responsive Command Bar supporting research questions and instant hackathon test presets. |
| **Source Collection** | Sourced Material Drawer supporting user-provided URLs, custom text inputs, and source metadata. |
| **Structured Sourced Summary** | Fact extraction cards with direct citations, quotes, and verification badges. |
| **Information Gap Detection** | Domain taxonomy checker evaluating renewal policies, nomination channels, and hidden deductions. |
| **Contradiction Detection** | Side-by-side claim comparison with quoted passages, source authority weighting, and resolution rules. |
| **Outdated/Undated Warnings** | Cycle and publication year audit flagging stale cycles (e.g. 2024 vs 2026) and undated guides. |
| **Prioritized Checklist** | Interactive task checklist with priority tiers (P1 Critical, P2 High) and official contact targets. |
| **AI vs Sourced Distinction** | Strict color-coded visual hierarchy distinguishing sourced facts from AI-generated gap signals. |

---

## 3. Technology Stack

- **Frontend & UI:** React 19, TypeScript (Strict Type Safety), Vite 8
- **Styling & Design System:** Tailwind CSS, Lucide Icons, Glassmorphism Ergonomics
- **State & Logic:** Predictable reactive state management with synchronous recalculation
- **Gap Detection Engine:** In-memory deterministic heuristic engine cross-referencing domain taxonomies

---

## 4. Getting Started (Setup & Execution)

### Prerequisites
- Node.js (v20+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd ShinchanHack

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 5. Suggested Demo Flow for Judges

1. **Launch the Application:** Click on the **🎓 Global STEM Leaders Fellowship 2026/2027** preset.
2. **Observe Extracted Information:** Note the verified eligibility criteria (GPA 3.65+) and deadline extracted directly from the official portal.
3. **Inspect Information Gaps:** View the critical gap warning: *"Missing Multi-Year Renewal Benchmark & Stipend Continuity Policy"*.
4. **Examine Contradictions:** Compare the side-by-side claims regarding required financial documents (Official portal mandates Tax Returns vs. Blog claims Salary Slips).
5. **Check Outdated Warnings:** Notice the warning on the 2024 student forum post showing how out-of-date deadlines create applicant risk.
6. **Act on Next Steps:** Review and interact with the prioritized verification checklist.
7. **Add Custom Evidence:** Click **"Add Source"** and click **"Autofill Official Renewal Circular"** to see the system dynamically recalculate the report and resolve the renewal gap in real-time.
