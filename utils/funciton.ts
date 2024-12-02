import type { Item } from '~/types/selection';

export function handleSelectedValue(
    value: number | string,
    selections: Item[],
) {
    const result = selections.find((element: Item) => {
        if (element.value == value) {
            return element;
        }
    });

    return result?.label
}
