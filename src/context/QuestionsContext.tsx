import React, { ReactNode, useEffect, useState } from "react";
import { Link, Round } from "../types";
import {
	retrieveContents,
	retrieveRound
} from "../client/certamenCatalogueApi";

const QuestionsContext = React.createContext<{
	clearRound: VoidFunction;
	contents?: Link[];
	errorMsg?: string;
	getRound: (href: string) => void;
	isLoading: boolean;
	round?: Round;
}>({
	clearRound: () => {},
	getRound: () => {},
	isLoading: true
});

export const QuestionsContextProvider = ({
	children
}: {
	children: ReactNode | ReactNode[] | string;
}) => {
	const [contents, setContents] = useState<Link[] | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [round, setRound] = useState<Round | undefined>();
	const [errorMsg, setErrorMsg] = useState<string | undefined>();

	useEffect(() => {
		setIsLoading(true);
		retrieveContents()
			.then(setContents)
			.catch(err => {
				console.error(err);
				setErrorMsg("Error retrieving the list of rounds");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const getRound = (href: string) => {
		setErrorMsg(undefined);
		setIsLoading(true);
		retrieveRound(href)
			.then(setRound)
			.catch(err => {
				console.error(err);
				setErrorMsg("Error retrieving round");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<QuestionsContext.Provider
			value={{
				clearRound: () => {
					setRound(undefined);
				},
				contents,
				errorMsg,
				getRound,
				isLoading,
				round
			}}
		>
			{children}
		</QuestionsContext.Provider>
	);
};

export const useQuestionsContext = () => React.useContext(QuestionsContext);
