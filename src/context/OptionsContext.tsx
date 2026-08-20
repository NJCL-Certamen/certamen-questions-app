import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState
} from "react";
import { Link } from "../types";

export const ARRANGEMENT_ORDER_STORAGE_KEY =
	"certamen-questions-app.arrangement-order";

export const HIDE_ANSWERS_STORAGE_KEY = "certamen-questions-app.hide-answers";
export const HIDE_BONI_STORAGE_KEY = "certamen-questions-app.hide-boni";
export const SHOW_QUESTIONS_ONE_AT_A_TIME_STORAGE_KEY =
	"certamen-questions-app.show-questions-one-at-a-time";

const OptionsContext = React.createContext<{
	arrangementOrder: (keyof Link)[];
	hideAnswers: boolean;
	hideBoni: boolean;
	setArrangementOrder: Dispatch<SetStateAction<(keyof Link)[]>>;
	setHideAnswers: Dispatch<SetStateAction<boolean>>;
	setHideBoni: Dispatch<SetStateAction<boolean>>;
	setShowQuestionsOneAtATime: Dispatch<SetStateAction<boolean>>;
	showQuestionsOneAtATime: boolean;
}>({
	arrangementOrder: ["tournament", "year", "division", "round"],
	hideAnswers: false,
	hideBoni: false,
	setArrangementOrder: () => {},
	setHideAnswers: () => {},
	setHideBoni: () => {},
	setShowQuestionsOneAtATime: () => {},
	showQuestionsOneAtATime: false
});

export const OptionsContextProvider = ({
	children
}: {
	children: ReactNode | ReactNode[] | string;
}) => {
	const storedHideAnswers = localStorage.getItem(HIDE_ANSWERS_STORAGE_KEY);
	const storedHideBoni = localStorage.getItem(HIDE_BONI_STORAGE_KEY);
	const storedArrangementOrder = localStorage.getItem(
		ARRANGEMENT_ORDER_STORAGE_KEY
	);
	const storedShowQuestionsOneAtATime = localStorage.getItem(
		SHOW_QUESTIONS_ONE_AT_A_TIME_STORAGE_KEY
	);
	const [hideAnswers, setHideAnswers] = useState(storedHideAnswers === "true");
	const [hideBoni, setHideBoni] = useState(storedHideBoni === "true");
	const [showQuestionsOneAtATime, setShowQuestionsOneAtATime] = useState(
		storedShowQuestionsOneAtATime === "true"
	);
	const [arrangementOrder, setArrangementOrder] = useState<(keyof Link)[]>(
		storedArrangementOrder
			? JSON.parse(storedArrangementOrder)
			: ["tournament", "year", "division", "round"]
	);

	useEffect(() => {
		localStorage.setItem(HIDE_ANSWERS_STORAGE_KEY, `${hideAnswers}`);
	}, [hideAnswers]);

	useEffect(() => {
		localStorage.setItem(HIDE_BONI_STORAGE_KEY, `${hideBoni}`);
	}, [hideBoni]);

	useEffect(() => {
		localStorage.setItem(
			SHOW_QUESTIONS_ONE_AT_A_TIME_STORAGE_KEY,
			`${showQuestionsOneAtATime}`
		);
	}, [showQuestionsOneAtATime]);

	return (
		<OptionsContext.Provider
			value={{
				arrangementOrder,
				hideAnswers,
				hideBoni,
				setArrangementOrder,
				setHideAnswers,
				setHideBoni,
				setShowQuestionsOneAtATime,
				showQuestionsOneAtATime
			}}
		>
			{children}
		</OptionsContext.Provider>
	);
};

export const useOptionsContext = () => React.useContext(OptionsContext);
