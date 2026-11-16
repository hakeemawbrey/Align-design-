// Pisces' tears (house rule: Pisces cries whenever it appears). Pure f(t).
// r = the value drawStarChar returns ({ x, y, size }); streams fall from both eyes from t0 on.
export function tears(x, t, r, t0, { rate = 0.12, col = '#8fd8ff', alpha = 1 } = {}) {
  if (!r || !r.size || t < t0 || alpha <= 0) return
  const cell = r.size / 36, c = Math.max(3, Math.round(cell * 0.9))
  const eyeY = r.y + 1.2 * cell, dx = 4.6 * cell
  x.save()
  for (const sd of [-1, 1]) for (let i = 0; i < 6; i++) {
    const born = t0 + i * rate + (sd > 0 ? rate / 2 : 0), life = rate * 6
    let k = (t - born) / life
    if (k < 0) continue
    k = k % 1
    const px = r.x + sd * (dx + cell * 2 + k * cell * 5), py = eyeY + cell * 2 + k * k * cell * 16
    x.globalAlpha = alpha * (1 - k)
    x.fillStyle = col; x.fillRect(Math.round(px), Math.round(py), c, c * 1.4)
  }
  x.restore()
}
