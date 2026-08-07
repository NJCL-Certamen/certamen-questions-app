import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { QuestionAnswer } from "../types";
import parsePseudoTags from "../utilities/parsePseudoTags";

const QuestionAnswerGrid = ({
	prefix,
	question
}: {
	prefix: string;
	question: QuestionAnswer;
}) => (
	<Grid container>
		<Grid size={{ xs: 12, md: 1 }}>
			<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
				{prefix}
			</Typography>
		</Grid>
		<Grid size={{ xs: 12, md: 8 }}>{parsePseudoTags(question.question)}</Grid>
		<Grid size={{ xs: 12, md: 3 }}>{parsePseudoTags(question.answer)}</Grid>
	</Grid>
);

export default QuestionAnswerGrid;
