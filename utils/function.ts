import type { Item } from '~/types/selection';

export function handleSelectedValue(
    value: number | string,
    options: Item[] | null | undefined,
) {
    if (options == null || options == undefined) {
        return '';
    }
    const result = options.find((element: Item) => {
        if (element.value == value) {
            return element;
        }
    });

    return result?.label;
}

export function formatNumberWithCommas(number: number | null): string {
    if (number == null) {
        return '';
    }
    return number.toLocaleString('it-IT'); // 'it-IT' là mã ngôn ngữ của Ý, sử dụng dấu chấm làm phân cách hàng nghìn
}

export function extractFirstImageUrl(markdownContent: string): string {
    // Regular Expression để tìm URL của ảnh trong cú pháp Markdown
    const regex = /!\[.*?\]\((.*?)\)/g;

    // Tìm tất cả các match với URL ảnh
    const matches = [...markdownContent.matchAll(regex)];

    // Trả về URL ảnh đầu tiên nếu có
    return matches.length > 0 ? matches[0][1] : '';
}

export function truncateDescription(str: string | null, length = 20) {
    if (str == null) return;

    return str.length > length ? str.substring(0, length) + '...' : str;
}
