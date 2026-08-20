import React, { useMemo, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Tossup from "./Tossup";
import { Round } from "../types";

const QuestionSlideShow = ({ round }: { round: Round }) => {
	const theme = useTheme();
	const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
	const [currentQuestion, setCurrentQuestion] = useState(0);

	const tossupWidth = useMemo(() => {
		if (isExtraLargeScreen) {
			return "50%";
		} else if (isLargeScreen) {
			return "60%";
		} else if (isMediumScreen) {
			return "80%";
		} else {
			return undefined;
		}
	}, [isMediumScreen, isLargeScreen, isExtraLargeScreen]);

	return (
		<Stack
			component="section"
			direction="row"
			spacing={1}
			sx={{
				justifyContent: "center"
			}}
		>
			<IconButton
				onClick={() => {
					setCurrentQuestion(cq =>
						cq === 0 ? round.questions.length - 1 : cq - 1
					);
				}}
			>
				<ArrowBackIcon />
			</IconButton>
			{round.questions.map((question, idx) => (
				<Slide
					key={`slide${idx}`}
					in={idx === currentQuestion}
					direction="right"
					mountOnEnter
					unmountOnExit
					easing={{
						enter: theme.transitions.easing.easeIn,
						exit: theme.transitions.easing.sharp
					}}
				>
					<Tossup
						key={idx}
						question={question}
						width={tossupWidth}
						number={idx + 1}
					/>
				</Slide>
			))}
			<IconButton
				onClick={() => {
					setCurrentQuestion(cq => (cq + 1) % round.questions.length);
				}}
			>
				<ArrowForwardIcon />
			</IconButton>
		</Stack>
	);
};

export default QuestionSlideShow;
