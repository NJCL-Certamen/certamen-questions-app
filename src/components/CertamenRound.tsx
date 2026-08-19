import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useQuestionsContext } from "../context/QuestionsContext";
import Tossup from "./Tossup";

const CertamenRound = () => {
	const navigate = useNavigate();
	const { clearRound, errorMsg, isLoading, round, getRound } =
		useQuestionsContext();
	const { search } = useLocation();

	useEffect(() => {
		const pathIdx = search.indexOf("path=");
		if (pathIdx >= 0) {
			const path = search.substring(pathIdx + "path=".length);
			const andIdx = path.indexOf("&");
			if (andIdx < 0) {
				getRound(path);
			} else {
				getRound(path.substring(andIdx));
			}
		}
		// ignoring getRound dependency to avoid multiple runs
		// eslint-disable-next-line
	}, [search]);

	if (errorMsg) {
		return (
			<Alert variant="standard" color="error">
				{errorMsg}
			</Alert>
		);
	} else if (isLoading || !round) {
		return <Loading />;
	} else {
		return (
			<Stack component="article" direction="column" spacing={5}>
				<Stack
					component="section"
					direction="row"
					sx={{ justifyContent: "space-between", alignItems: "center" }}
				>
					<Typography variant="h2">{`${round.year} ${round.tournament} ${round.division} Division ${round.round}`}</Typography>
					<Box>
						<Button
							variant="contained"
							onClick={() => {
								clearRound();
								navigate("/");
							}}
							size="large"
						>
							Back
						</Button>
					</Box>
				</Stack>
				{round.questions.map((q, idx) => (
					<Tossup key={idx} question={q} number={idx + 1} />
				))}
			</Stack>
		);
	}
};

export default CertamenRound;
