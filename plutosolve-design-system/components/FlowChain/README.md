# FlowChain

FlowChain draws an "A → B → C" chain as outlined nodes joined by hairline edges. It is the brand's main visual metaphor of nodes, flows and connected systems.

**Provide:** an `<ol class="ps-flow">` with one `<li>` per step. Each `<li>` holds a `<span class="ps-flow__node">` with the step label. Add `ps-flow__node--outcome` to the last node only. An optional `<p class="ps-flow-caption">` goes before it, and an `aria-label` on the list names the system.

- Use it for the systems in "What a growth system can look like" and anywhere the copy chains with →.
- Keep 3–7 nodes. On narrow screens the chain wraps.
- Only the outcome node uses `signal`. Every other node stays monochrome.
- For the small inline chains in ProcessSteps, keep plain `body-strong` text with →.
