export function filterNews(news) {
  return news
    .sort((a, b) => Number(new Date(b.publishedDate)))
}
