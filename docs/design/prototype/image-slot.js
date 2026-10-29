// image-slot.js — reconstructed. The handoff bundle referenced this file but did
// not embed it, so the prototype could not render standalone. Implements the
// blank rule from design-spec.json: a dashed outline plus the needed-photo label.
class ImageSlot extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute('placeholder') || 'Photo: to be supplied';
    const shape = this.getAttribute('shape') || 'rect';
    this.style.display = 'block';
    this.style.position = this.style.position || 'relative';
    this.innerHTML = `
      <div role="img" aria-label="${label.replace(/"/g, '&quot;')}" style="
        position:absolute; inset:0; display:flex; align-items:center;
        justify-content:center; text-align:center; padding:16px;
        border:1px dashed var(--border); border-radius:${shape === 'circle' ? '50%' : 'var(--radius, 8px)'};
        background:var(--surface, #16191A); color:var(--text-muted, #D4D4D4);
        font:500 11px/1.5 var(--font-mono, ui-monospace, monospace);
        letter-spacing:.06em; text-transform:uppercase; box-sizing:border-box;
      ">${label}</div>`;
  }
}
customElements.define('image-slot', ImageSlot);
