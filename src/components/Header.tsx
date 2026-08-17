import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import SortingDialog from "./SortingDialog";

const Header = () => {
	const [showSortingDialog, setShowSortingDialog] = useState(false);

	return (
		<>
			<AppBar sx={{ flexDirection: "row", justifyContent: "space-between" }}>
				<Typography component="h1" variant="h2" sx={{ p: "1rem" }}>
					Certamen Questions App
				</Typography>
				<IconButton
					size="large"
					sx={{ mr: "2rem" }}
					onClick={() => {
						setShowSortingDialog(true);
					}}
				>
					<SettingsIcon color="action" />
				</IconButton>
			</AppBar>
			<div className="placeholder" style={{ height: "5rem" }}></div>
			<SortingDialog
				isOpen={showSortingDialog}
				close={() => setShowSortingDialog(false)}
			/>
		</>
	);
};

export default Header;
