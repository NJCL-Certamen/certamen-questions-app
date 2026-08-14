import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Contents from "./components/Contents";
import CertamenRound from "./components/CertamenRound";
import { HashRouter, Route, Routes } from "react-router-dom";
import { QuestionsContextProvider } from "./context/QuestionsContext";

function App() {
	return (
		<QuestionsContextProvider>
			<Box component="main" sx={{ py: 2, px: 5 }}>
				<Typography variant="h1">Certamen Questions App</Typography>
				<HashRouter>
					<Routes>
						<Route path="/" element={<Contents />} />
						<Route path="/round" element={<CertamenRound />} />
					</Routes>
				</HashRouter>
			</Box>
		</QuestionsContextProvider>
	);
}

export default App;
