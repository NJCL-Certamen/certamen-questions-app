import React, { Ref, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import QuestionAnswerGrid from "./QuestionAnswerGrid";
import { QuestionAnswer } from "../types";
import { useOptionsContext } from "../context/OptionsContext";

const Tossup = ({
	question,
	width,
	number,
	ref
}: {
	question: { tossup: QuestionAnswer; boni: QuestionAnswer[] };
	width?: string;
	number: number;
	ref?: Ref<HTMLDivElement>;
}) => {
	const { hideAnswers, hideBoni } = useOptionsContext();
	const [showTossupAnswer, setShowTossupAnswer] = useState(!hideAnswers);
	const [showBonusAnswer, setShowBonusAnswer] = useState<boolean[]>(
		question.boni.map(b => !hideAnswers)
	);
	const [showBonus, setShowBonus] = useState<boolean[]>(
		question.boni.map(b => !hideBoni)
	);

	useEffect(() => {
		setShowTossupAnswer(!hideAnswers);
		setShowBonusAnswer(sba => sba.map(a => !hideAnswers));
	}, [hideAnswers]);

	useEffect(() => {
		setShowBonus(sb => sb.map(b => !hideBoni));
	}, [hideBoni]);

	return (
		<Card
			key={`card${number}`}
			variant="outlined"
			sx={{ p: 2, width }}
			ref={ref}
		>
			<Stack direction="column" spacing={2} key={`stack${number}`}>
				<QuestionAnswerGrid
					key={`Tossup${number}`}
					prefix={`TU${number}`}
					question={question.tossup}
					setShowAnswer={setShowTossupAnswer}
					showAnswer={showTossupAnswer}
				/>
				{question.boni.map((b, bIdx) => {
					if (showBonus[bIdx]) {
						return (
							<QuestionAnswerGrid
								key={`Bonus${bIdx}`}
								prefix={`B${bIdx + 1}`}
								question={b}
								showAnswer={showBonusAnswer[bIdx]}
								setShowAnswer={(show: boolean) =>
									setShowBonusAnswer([
										...showBonusAnswer.slice(0, bIdx),
										show,
										...showBonusAnswer.slice(bIdx + 1)
									])
								}
							/>
						);
					} else {
						return (
							<Button
								key={`Button${bIdx}`}
								component="button"
								variant="outlined"
								onClick={() =>
									setShowBonus([
										...showBonus.slice(0, bIdx),
										true,
										...showBonus.slice(bIdx + 1)
									])
								}
							>
								Show Bonus {bIdx + 1}
							</Button>
						);
					}
				})}
			</Stack>
		</Card>
	);
};

export default Tossup;
