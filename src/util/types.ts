export type MediaType = {
    url: string;
    name: string;
    width: number;
    height: number;
};

export type WritingPreviewType = {
    title: string;
    slug: string;
};

export type WritingType = {
    title: string;
    slug: string;
    content: string;
    media?: MediaType;
};