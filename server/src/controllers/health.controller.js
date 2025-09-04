export async function health(req, res) {
  res.json({ message: "OK", time: new Date().toISOString() });
}
