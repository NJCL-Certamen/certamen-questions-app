import React, { useMemo } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { QuestionAnswer } from "../types";
import parsePseudoTags from "../utilities/parsePseudoTags";

const QuestionAnswerGrid = ({
	prefix,
	question,
	setShowAnswer,
	showAnswer
}: {
	prefix: string;
	question: QuestionAnswer;
	setShowAnswer: (show: boolean) => void;
	showAnswer: boolean;
}) => {
	const parsedQuestion = useMemo(
		() => parsePseudoTags(question.question),
		[question.question]
	);
	const parsedAnswer = useMemo(
		() => parsePseudoTags(question.answer),
		[question.answer]
	);

	return (
		<Grid container>
			<Grid size={{ xs: 12, md: 1 }}>
				<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
					{prefix}
				</Typography>
			</Grid>
			<Grid size={{ xs: 12, md: 8 }}>{parsedQuestion}</Grid>
			<Grid size={{ xs: 12, md: 3 }}>
				{showAnswer ? (
					parsedAnswer
				) : (
					<Button
						component="button"
						variant="contained"
						onClick={() => setShowAnswer(true)}
					>
						Show Answer
					</Button>
				)}
			</Grid>
		</Grid>
	);
};

export default QuestionAnswerGrid;
