import React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useCertamenRound from "./hooks/useCertamenRound";
import Loading from "./components/Loading";
import Contents from "./components/Contents";
import CertamenRound from "./components/CertamenRound";
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
	const { clearRound, contents, errorMsg, round, getRound, state } =
		useCertamenRound();

	return (
		<Box component="main" sx={{ py: 2, px: 5 }}>
			<Typography variant="h1">Certamen Questions App</Typography>
			{errorMsg && (
				<Alert variant="standard" color="error">
					{errorMsg}
				</Alert>
			)}
			<HashRouter>
				{state === "LOADING" ? (
					<Loading />
				) : (
					<Routes>
						<Route
							path="/"
							element={<Contents contents={contents!} getRound={getRound} />}
						/>
						<Route
							path="/round"
							element={<CertamenRound clearRound={clearRound} round={round} />}
						/>
					</Routes>
				)}
			</HashRouter>
		</Box>
	);
}

export default App;
