type GenericObject = { id: number; [key: string]: any };

export default GenericObject;

export function getGenericObjectArrayIDs(array: GenericObject[]): number[] {
    return array.map((item) => item.id);
}
