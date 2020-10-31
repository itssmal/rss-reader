export interface RSSSource {
  shortTitle: string,
  link: string
}

export interface RSS {
  feed: {
    url?: string,
    title: string,
    description?: string,
    image?: string,
    link?: string,
  },
  items: RSSItem[]
  status?: string,
  shortTitle?: string
}

export interface RSSItem {
  author?: string
  categories?: []
  content?: string
  description: string
  enclosure?: {
    length: number
    link: string
    type: string
  }
  guid?: string
  link?: string
  pubDate?: string
  thumbnail?: string
  title: string
}
