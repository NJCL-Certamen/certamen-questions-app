import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Link } from "../types";

export const ARRANGEMENT_ORDER_STORAGE_KEY =
	"certamen-questions-app.arrangement-order";

const OptionsContext = React.createContext<{
	arrangementOrder: (keyof Link)[];
	hideAnswers: boolean;
	hideBoni: boolean;
	setArrangementOrder: Dispatch<SetStateAction<(keyof Link)[]>>;
	setHideAnswers: Dispatch<SetStateAction<boolean>>;
	setHideBoni: Dispatch<SetStateAction<boolean>>;
}>({
	arrangementOrder: ["tournament", "year", "division", "round"],
	hideAnswers: false,
	hideBoni: false,
	setArrangementOrder: () => {},
	setHideAnswers: () => {},
	setHideBoni: () => {}
});

export const OptionsContextProvider = ({
	children
}: {
	children: ReactNode | ReactNode[] | string;
}) => {
	const [hideAnswers, setHideAnswers] = useState(false);
	const [hideBoni, setHideBoni] = useState(false);
	const storedArrangementOrder = localStorage.getItem(
		ARRANGEMENT_ORDER_STORAGE_KEY
	);
	const [arrangementOrder, setArrangementOrder] = useState<(keyof Link)[]>(
		storedArrangementOrder
			? JSON.parse(storedArrangementOrder)
			: ["tournament", "year", "division", "round"]
	);

	return (
		<OptionsContext.Provider
			value={{
				arrangementOrder,
				hideAnswers,
				hideBoni,
				setArrangementOrder,
				setHideAnswers,
				setHideBoni
			}}
		>
			{children}
		</OptionsContext.Provider>
	);
};

export const useOptionsContext = () => React.useContext(OptionsContext);
