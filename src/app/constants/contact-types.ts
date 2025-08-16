import { DropdownOption } from "../components/dropdown/dropdown";

export const CONTACT_TYPES: DropdownOption[] = [{label: 'Person', value: 1},{label:'Public Organization', value: 2},{label:'Private Organization', value:3}]
export const MAPPED_CONTACT_TYPES = CONTACT_TYPES.reduce<Record<number, DropdownOption>>((acc, item)=>{
    acc[item.value] = item;
    return acc;
},{})
export const MAPPED_CONTACT_TYPES_AUX = CONTACT_TYPES.reduce<Record<string, DropdownOption>>((acc, item)=>{
    const key = item.label.replace(/\s+/g, "")
    acc[key] = item;
    return acc;
},{})