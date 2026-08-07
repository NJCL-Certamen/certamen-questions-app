import { useState, useEffect, useMemo } from "react";
import axios, { AxiosResponse } from "axios";
import YAML from "yaml";
import { Link, Round } from "../types";

const CONTENTS_URL =
	"https://raw.githubusercontent.com/NJCL-Certamen/certamen-catalogue/refs/heads/main/questions/index.yaml";

const useCertamenRound = (): {
	clearRound: VoidFunction;
	contents?: Link[];
	getRound: (href: string) => void;
	round?: Round;
	state: "LOADING" | "CONTENTS" | "ROUND";
} => {
	const [contents, setContents] = useState<Link[] | undefined>();
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

				setContents(YAML.parse(response.data).links);
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
