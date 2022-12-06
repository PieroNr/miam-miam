export default class Restaurant {
    private _name: string;
    private _coord: [number, number] = [0,0]

    constructor(name: string, coord: [number, number]) {
        this._name = name;
        this._coord = coord;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get coord(): [number, number] {
        return this._coord;
    }

    set coord(value: [number, number]) {
        this._coord = value;
    }



}