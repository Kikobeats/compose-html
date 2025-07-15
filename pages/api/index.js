'use strict'

const toArray = (input, delimiter = '/n') => [].concat(input).join(delimiter)

const composeHtml = ({ head, body }) =>
  `<!DOCTYPE html>
<html lang="en">
<head>${toArray(head)}</head>
<body>${toArray(body)}</body>
</html>`.trim()

export const config = { runtime: 'nodejs' }

export default async request => {
  const url = request.nextUrl

  if (url.pathname === '/favicon.ico' || url.pathname === '/robots.txt') {
    return new Response()
  }

  const html = composeHtml(Object.fromEntries(url.searchParams))

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8'
    }
  })
}
