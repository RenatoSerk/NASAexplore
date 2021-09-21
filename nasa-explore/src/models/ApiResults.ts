export interface ApiResults{
    collection: {
        items: ImageItem[],
        metadata: {
            total_hits: number
        }
    }
}

export interface ImageItem{
    data: [
        {
            center: string,
            date_created: string,
            description: string,
            title: string
        }
    ]
    links: [
        {
            href: string
        }
    ]
}