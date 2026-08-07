import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Round } from "../types";
import QuestionAnswerGrid from "./QuestionAnswerGrid";

const CertamenRound = ({
	clearRound,
	round
}: {
	clearRound: VoidFunction;
	round: Round;
}) => (
	<Stack component="article" direction="column" spacing={5}>
		<Stack
			component="section"
			direction="row"
			sx={{ justifyContent: "space-between", alignItems: "center" }}
		>
			<Typography variant="h2">{`${round.year} ${round.tournament} ${round.division} Division ${round.round}`}</Typography>
			<Box>
				<Button variant="contained" onClick={clearRound} size="large">
					Back
				</Button>
			</Box>
		</Stack>
		{round.questions.map((q, idx) => (
			<Card key={idx} variant="outlined" sx={{ p: 2 }}>
				<Stack direction="column" spacing={2}>
					<QuestionAnswerGrid prefix={`TU${idx + 1}`} question={q.tossup} />
					{q.boni.map((b, bIdx) => (
						<QuestionAnswerGrid
							key={`Bonus${bIdx}`}
							prefix={`B${bIdx + 1}`}
							question={b}
						/>
					))}
				</Stack>
			</Card>
		))}
	</Stack>
);

export default CertamenRound;
