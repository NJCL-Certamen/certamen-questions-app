import { useState, useEffect, useMemo } from "react";
import axios, { AxiosResponse } from "axios";
import YAML from "yaml";
import { Link, Round } from "../types";

const CONTENTS_URL =
	"https://raw.githubusercontent.com/NJCL-Certamen/certamen-catalogue/refs/heads/main/questions/index.yaml";

export const ARRANGEMENT_ORDER: (keyof Link)[] = [
	"tournament",
	"year",
	"division",
	"round"
];

const ORDER_SORT = (order: string[]) => (r1: string, r2: string) => {
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

const SORT_FUNCTIONS: Record<keyof Link, (r1: string, r2: string) => number> = {
	tournament: ORDER_SORT(["NJCL Certamen"]),
	year: (r1: string, r2: string) => {
		return r1.localeCompare(r2);
	},
	division: ORDER_SORT(["Middle School", "Novice", "Intermediate", "Advanced"]),
	round: ORDER_SORT([
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

const useCertamenRound = (): {
	clearRound: VoidFunction;
	contents?: Link[][][][];
	getRound: (href: string) => void;
	round?: Round;
	state: "LOADING" | "CONTENTS" | "ROUND";
} => {
	const [rawContents, setRawContents] = useState<Link[] | undefined>();
	const [round, setRound] = useState<Round | undefined>();

	useEffect(() => {
		axios
			.get(CONTENTS_URL, {
				headers: {
					Accept: "application/yml"
				}
			})
			.then((response: AxiosResponse<string>) => {
				if (response.status !== 200) {
					throw new Error(`Invalid response ${response.data}`);
				}

				setRawContents(YAML.parse(response.data).links);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	const getRound = (href: string) => {
		axios
			.get(href, {
				headers: { Accept: "application/yml" }
			})
			.then((response: AxiosResponse<string>) => {
				if (response.status !== 200) {
					throw new Error(`Invalid response ${response}`);
				}

				setRound(YAML.parse(response.data));
			});
	};

	const contents: Link[][][][] = useMemo(() => {
		if (!rawContents) {
			return [] as Link[][][][];
		}

		const firstSort: Record<string, Link[]> = rawContents.reduce(
			(acc: Record<string, Link[]>, r: Link) => {
				if (!acc[r[ARRANGEMENT_ORDER[0]]]) {
					acc[r[ARRANGEMENT_ORDER[0]]] = [];
				}
				acc[r[ARRANGEMENT_ORDER[0]]].push(r);
				return acc;
			},
			{} as Record<string, Link[]>
		);

		const secondSort: Record<string, Record<string, Link[]>> = Object.keys(
			firstSort
		).reduce(
			(acc, key) => {
				acc[key] = firstSort[key].reduce(
					(innerAcc, r) => {
						if (!innerAcc[r[ARRANGEMENT_ORDER[1]]]) {
							innerAcc[r[ARRANGEMENT_ORDER[1]]] = [];
						}
						innerAcc[r[ARRANGEMENT_ORDER[1]]].push(r);
						return innerAcc;
					},
					{} as Record<string, Link[]>
				);
				return acc;
			},
			{} as Record<string, Record<string, Link[]>>
		);

		const thirdSort: Record<
			string,
			Record<string, Record<string, Link[]>>
		> = Object.keys(secondSort).reduce(
			(acc, key) => {
				acc[key] = Object.keys(secondSort[key]).reduce(
					(innerAcc, innerKey) => {
						innerAcc[innerKey] = secondSort[key][innerKey].reduce(
							(innerestAcc, r) => {
								if (!innerestAcc[r[ARRANGEMENT_ORDER[2]]]) {
									innerestAcc[r[ARRANGEMENT_ORDER[2]]] = [];
								}
								innerestAcc[r[ARRANGEMENT_ORDER[2]]].push(r);
								return innerestAcc;
							},
							{} as Record<string, Link[]>
						);
						return innerAcc;
					},
					{} as Record<string, Record<string, Link[]>>
				);
				return acc;
			},
			{} as Record<string, Record<string, Record<string, Link[]>>>
		);

		return Object.keys(thirdSort)
			.sort(SORT_FUNCTIONS[ARRANGEMENT_ORDER[0]])
			.map(key1 => {
				return Object.keys(thirdSort[key1])
					.sort(SORT_FUNCTIONS[ARRANGEMENT_ORDER[1]])
					.map(key2 => {
						return Object.keys(thirdSort[key1][key2])
							.sort(SORT_FUNCTIONS[ARRANGEMENT_ORDER[2]])
							.map(key3 => {
								return thirdSort[key1][key2][key3].sort((r1, r2) => {
									return SORT_FUNCTIONS[ARRANGEMENT_ORDER[3]](`${r1}`, `${r2}`);
								});
							});
					});
			});
	}, [rawContents]);

	const state: "LOADING" | "CONTENTS" | "ROUND" = useMemo(() => {
		let result: "LOADING" | "CONTENTS" | "ROUND" = "LOADING";
		if (round) {
			result = "ROUND";
		} else if (contents) {
			result = "CONTENTS";
		}
		return result;
	}, [round, contents]);

	return {
		clearRound: () => {
			setRound(undefined);
		},
		contents,
		getRound,
		round,
		state
	};
};

export default useCertamenRound;
