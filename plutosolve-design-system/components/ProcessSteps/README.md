# ProcessSteps

ProcessSteps shows the "How we build" sequence as columns on a shared timeline rule. Each step has an index, a title, a chain and a description.

**Provide:** an `<ol class="ps-steps">` with one `<li class="ps-step">` per step, containing a `ps-step__index`, a `ps-step__title`, a `ps-step__chain` and a `ps-step__desc`. Add `ps-step--current` to at most one step to mark its node in `signal`.

- There are five steps in the source: Understand, Strategize, Build, Launch and Optimize. Close with the Statement *Build once. Learn continuously. Grow systematically.*
- The columns wrap to rows on narrow screens, so the ↓ arrows in the copy aren't drawn.
- Keep each description to one sentence.
