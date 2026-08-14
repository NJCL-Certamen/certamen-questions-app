import { Link } from "../types";

const orderSort = (order: string[]) => (r1: string, r2: string) => {
	if (r1 === r2) {
		return 0;
	}

	for (let v of order) {
		if (r1 === v) {
			return -1;
		} else if (r2 === v) {
			return 1;
		}
	}

	return r1.localeCompare(r2);
};

export const SORT_FUNCTIONS: Record<
	keyof Link,
	(r1: string, r2: string) => number
> = {
	tournament: orderSort(["NJCL Certamen"]),
	year: (r1: string, r2: string) => {
		return r1.localeCompare(r2);
	},
	division: orderSort(["Middle School", "Novice", "Intermediate", "Advanced"]),
	round: orderSort([
		"Round 1",
		"Round 2",
		"Round 3",
		"Round 4",
		"Round 5",
		"Round 6",
		"Semifinals",
		"Semifinals 2",
		"Semifinals 3",
		"Third Place Round",
		"Finals"
	]),
	rel: (r1: string, r2: string) => r1.localeCompare(r2),
	href: (r1: string, r2: string) => r1.localeCompare(r2)
};
