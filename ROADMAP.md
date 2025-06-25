
1. **Dev server now runs on `PORT 3002`**
2. **Dashboard skeleton follows your layout sketch**

   * **Left panel (Present)** – report + recommendations + interactive sliders / goal inputs
   * **Top-right (Future Forecasts)** – 10 / 30 / 60 / 90-day outlook table
   * **Bottom-right (Past Performance)** – data visualising historical results

---

### Lamina UI Prototype – 5-Day Build Plan (updated)

| Day   | Issue title                            | Pseudo-steps (Cursor ↔ terminal)                                                                                                                                                                                                                                                                                                               | Acceptance check                                                                                                                                            |
| ----- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | **Scaffold & Repo**                    | `bash<br># create project<br>npx create-next-app lamina-ui-prototype --typescript --tailwind --eslint --src-dir --app<br>cd lamina-ui-prototype<br># init git & first commit<br>git init && git add . && git commit -m \"feat: scaffold\"<br># create remote<br>gh repo create lamina-ui-prototype --public --source=. --remote=origin --push` | • Repo on GitHub<br>• Default Next.js page renders at `localhost:3002` when run with:<br>`PORT=3002 npm run dev`                                            |
| **2** | **Layout Skeleton (3 zones)**          | `tsx\n// src/app/dashboard/page.tsx\n<Grid 12-cols gap-6>\n  <PresentPanel className=\"col-span-4\" />\n  <FuturePanel  className=\"col-span-8 grid grid-rows-2 gap-6\" />\n</Grid>\n`\nCreate placeholder components:<br>`PresentPanel`, `FuturePanel.Top`, `FuturePanel.Bottom`.                                                             | • Blank 3-zone grid appears:<br>  ▸ Left 4 cols, full height<br>  ▸ Top-right 8×1 row<br>  ▸ Bottom-right 8×1 row                                           |
| **3** | **Present Panel – Actions & Controls** | `tsx\n// components/PresentActions.tsx\nrender Markdown -> recommendations\n<Slider> budgetShift  </Slider>\n<NumberInput> goalROAS </NumberInput>\n`                                                                                                                                                                                          | • Report text from `mock-brief.json` displays<br>• Sliders & number inputs emit console logs                                                                |
| **4** | **Future & Past Panels**               | `tsx\n// FuturePanel.Top\n<HorizonTable windows={outlook} />\n// FuturePanel.Bottom\n<AreaBandChart series={forecastSeries} />\n// PastPerformance\n<BarChart data={historicalMetrics} />\n`                                                                                                                                                   | • Top-right table shows 10/30/60/90-day rows w/ confidence badges<br>• Bottom-right chart renders forecast band<br>• Past bar/line chart shows last 60 days |
| **5** | **Polish, Port, Deploy**               | `bash\nnpm run lint && npm run build\nPORT=3002 npm run dev   # final local check\n`<br>Push → Vercel auto-deploy                                                                                                                                                                                                                              | • No lint/TS errors<br>• Live Vercel URL shows complete layout<br>• README documents `PORT=3002` tip                                                        |

**Component hints**

```tsx
// src/components/PresentPanel.tsx  (client)
"use client";
export default function PresentPanel({ brief }) {
  return (
    <section className="h-full flex flex-col gap-4 bg-slate-800 p-4 rounded-2xl">
      <Markdown>{brief.recommendationsMd}</Markdown>
      <Slider defaultValue={[20]} max={100} step={5} aria-label="Budget shift" />
      <NumberInput label="Target ROAS" defaultValue={1.5} />
    </section>
  );
}
```

> Replace `mock-brief.json` with live Lamina API later; props stay identical.


