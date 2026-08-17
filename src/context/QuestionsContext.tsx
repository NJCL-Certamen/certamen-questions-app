import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState
} from "react";
import { Link, Round } from "../types";
import {
	retrieveContents,
	retrieveRound
} from "../client/certamenCatalogueApi";

export const ARRANGEMENT_ORDER_STORAGE_KEY =
	"certamen-questions-app.arrangement-order";

const QuestionsContext = React.createContext<{
	arrangementOrder: (keyof Link)[];
	clearRound: VoidFunction;
	contents?: Link[];
	errorMsg?: string;
	getRound: (href: string) => void;
	isLoading: boolean;
	round?: Round;
	setArrangementOrder: Dispatch<SetStateAction<(keyof Link)[]>>;
}>({
	arrangementOrder: ["tournament", "year", "division", "round"],
	clearRound: () => {},
	getRound: () => {},
	isLoading: true,
	setArrangementOrder: order => {}
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

	const storedArrangementOrder = localStorage.getItem(
		ARRANGEMENT_ORDER_STORAGE_KEY
	);
	const [arrangementOrder, setArrangementOrder] = useState<(keyof Link)[]>(
		storedArrangementOrder
			? JSON.parse(storedArrangementOrder)
			: ["tournament", "year", "division", "round"]
	);

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
				arrangementOrder,
				clearRound: () => {
					setRound(undefined);
				},
				contents,
				errorMsg,
				getRound,
				isLoading,
				round,
				setArrangementOrder
			}}
		>
			{children}
		</QuestionsContext.Provider>
	);
};

export const useQuestionsContext = () => React.useContext(QuestionsContext);
