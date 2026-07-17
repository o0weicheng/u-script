export default async function(ctx) {
  const { URL, COOKIE, ACCEPT, CONTENT_TYPE, AUTHORIZATION, USER_AGENT, CONNECTION, TOKEN, TITLE } = ctx.env
  const resp = await ctx.http.post(URL, {
    headers: {
      Cookie: COOKIE,
      Accept: ACCEPT,
      "Content-Type": CONTENT_TYPE,
      Authorization: AUTHORIZATION,
      "User-Agent": USER_AGENT,
      Connection: CONNECTION
    },
    body: {
      "token": TOKEN
    }
  })
  const data = await resp.json()
  const notify_body = `签到点数：${data.points}，连续签到：${data?.streak || 0} 次，签到消息：${data?.message}`
  ctx.notify({title: TITLE, body: notify_body})
}
