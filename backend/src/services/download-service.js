export function createSignedDownloadUrl(ebook) {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()
  const token = Buffer.from(`${ebook.id}:${expiresAt}`).toString('base64url')

  return {
    url: `/api/downloads/${ebook.id}/file?token=${token}`,
    expiresAt,
  }
}
