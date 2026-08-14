import axios, { AxiosResponse } from "axios";
import YAML from "yaml";
import { Link, Round } from "../types";

const CONTENTS_URL =
	"https://raw.githubusercontent.com/NJCL-Certamen/certamen-catalogue/refs/heads/main/questions/index.yaml";

export const retrieveContents = async (): Promise<Link[]> => {
	const response: AxiosResponse<string> = await axios.get(CONTENTS_URL, {
		headers: {
			Accept: "application/yml"
		}
	});

	if (response.status === 200) {
		return YAML.parse(response.data).links;
	} else {
		throw new Error("Invalid response from contents call: " + response.status);
	}
};

export const retrieveRound = async (href: string): Promise<Round> => {
	const response: AxiosResponse<string> = await axios.get(href, {
		headers: { Accept: "application/yml" }
	});

	if (response.status === 200) {
		return YAML.parse(response.data);
	} else {
		throw new Error(
			`Invalid response getting round ${href}: ${response.status}`
		);
	}
};
