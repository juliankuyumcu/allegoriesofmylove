export type MediaType = {
    data: {
        attributes: {
            url: string;
        }
    }
};

export type WritingPreviewType = {
    data: {
        attributes: {
            title: string;
            slug: string;
        }
    }
};

export type WritingType = {
    data: {
        attributes: {
            title: string;
            slug: string;
            content: string;
            media?: MediaType;
        }
    }
};