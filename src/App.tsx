import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useCertamenRound from "./hooks/useCertamenRound";
import Loading from "./components/Loading";
import Contents from "./components/Contents";
import CertamenRound from "./components/CertamenRound";

function App() {
	const { clearRound, contents, round, getRound, state } = useCertamenRound();

	const renderContent = () => {
		switch (state) {
			case "LOADING":
				return <Loading />;
			case "CONTENTS":
				return <Contents contents={contents!} getRound={getRound} />;
			case "ROUND":
				return <CertamenRound clearRound={clearRound} round={round!} />;
		}
	};

	return (
		<Box component="main" sx={{ py: 2, px: 5 }}>
			<Typography variant="h1">Certamen Questions App</Typography>
			{renderContent()}
		</Box>
	);
}

export default App;
