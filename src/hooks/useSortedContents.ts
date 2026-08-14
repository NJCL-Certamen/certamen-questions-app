import { useMemo } from "react";
import { useQuestionsContext } from "../context/QuestionsContext";
import { Link } from "../types";
import { SORT_FUNCTIONS } from "../utilities/sortFunctions";

export const ARRANGEMENT_ORDER: (keyof Link)[] = [
	"tournament",
	"year",
	"division",
	"round"
];

const useSortedContents = () => {
	const { contents: rawContents } = useQuestionsContext();

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
									return SORT_FUNCTIONS[ARRANGEMENT_ORDER[3]](
										`${r1[ARRANGEMENT_ORDER[3]]}`,
										`${r2[ARRANGEMENT_ORDER[3]]}`
									);
								});
							});
					});
			});
	}, [rawContents]);

	return { contents };
};

export default useSortedContents;
