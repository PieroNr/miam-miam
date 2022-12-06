import L from "leaflet";
import sophie from "@/assets/img/avatar3.png";
export default class User {
    private _FirstName: string;
    private _LastName: string;
    private _coord: [number, number] = [0,0]
    private _icon: L.Icon = L.icon({
        iconUrl: "",
    });

    constructor(fname: string, lname: string, coord: [number, number], icon: L.Icon)
    {
        this._FirstName = fname;
        this._LastName = lname;
        this._coord = coord;
        this._icon = icon;
    }

    get FirstName(): string {
        return this._FirstName;
    }

    set FirstName(value: string) {
        this._FirstName = value;
    }

    get LastName(): string {
        return this._LastName;
    }

    set LastName(value: string) {
        this._LastName = value;
    }

    get coord(): [number, number] {
        return this._coord;
    }

    set coord(value: [number, number]) {
        this._coord = value;
    }

    get icon(): L.Icon {
        return this._icon;
    }

    set icon(value: L.Icon) {
        this._icon = value;
    }

}