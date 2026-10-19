# Button

Use buttons for calls to action, which are always an imperative phrase in title case followed by an arrow.

**Provide:** an `<a>` (navigation) or `<button>` (action) with `ps-btn` plus one variant class, the label text, and `<span class="ps-arrow" aria-hidden="true">→</span>` as the last child.

| Class | Use |
| --- | --- |
| `ps-btn--primary` | One per view: *Build Your Growth System →*, *Start a Conversation →*. It has an `ink` fill and turns `signal` on hover. |
| `ps-btn--secondary` | The companion CTA: *Explore Our Work →*. It has a `line-strong` outline. |
| `ps-link` | An inline or tertiary CTA: *See What We've Built →*. |
| `ps-btn--sm` | Add for the 40px size used in SiteNav. |

- Do pair a primary with a secondary in the hero and final CTA.
- Don't put two primaries side by side, use a signal fill at rest, or write "Click here", "Learn more" or a CTA without an arrow.
- On `surface-inverse`, use the secondary style. Its colours follow the band's `ink-inverse`.
- Use `disabled` on `<button>` and `aria-disabled="true"` on `<a>`.
