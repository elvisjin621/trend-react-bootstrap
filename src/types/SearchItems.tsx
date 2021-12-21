import { SearchItem } from "./SearchItem";

export interface SearchItems {
	range: string;
	label: string;
	active: boolean;
	selected: string;
	categories: SearchItem[];
}
