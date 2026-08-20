import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import SortingDialog from "./SortingDialog";
import { useLocation } from "react-router-dom";
import { useOptionsContext } from "../context/OptionsContext";

const Header = () => {
	const location = useLocation();
	const {
		hideAnswers,
		hideBoni,
		setHideAnswers,
		setHideBoni,
		setShowQuestionsOneAtATime,
		showQuestionsOneAtATime
	} = useOptionsContext();
	const [showSortingDialog, setShowSortingDialog] = useState(false);
	const [anchor, setAnchor] = useState<HTMLButtonElement | undefined>();

	return (
		<>
			<AppBar sx={{ flexDirection: "row", justifyContent: "space-between" }}>
				<Typography component="h1" variant="h2" sx={{ p: "1rem" }}>
					Certamen Questions App
				</Typography>
				<IconButton
					size="large"
					sx={{ mr: "2rem" }}
					onClick={e => {
						if (location.pathname.includes("/round")) {
							setAnchor(e.currentTarget);
						} else {
							setShowSortingDialog(true);
						}
					}}
				>
					<SettingsIcon color="action" />
				</IconButton>
				<Menu
					id="round-settings-menu"
					open={!!anchor}
					anchorEl={anchor}
					onClose={() => setAnchor(undefined)}
				>
					<MenuItem
						role="menuitemcheckbox"
						selected={hideAnswers}
						onClick={() => setHideAnswers(ha => !ha)}
					>
						<ListItemIcon>
							{hideAnswers && <Check fontSize="small" />}
						</ListItemIcon>
						<ListItemText>Hide Answers (until clicked)</ListItemText>
					</MenuItem>
					<MenuItem
						role="menuitemcheckbox"
						selected={hideBoni}
						onClick={() => setHideBoni(ha => !ha)}
					>
						<ListItemIcon>
							{hideBoni && <Check fontSize="small" />}
						</ListItemIcon>
						<ListItemText>Hide Boni (until clicked)</ListItemText>
					</MenuItem>
					<MenuItem
						role="menuitemcheckbox"
						selected={showQuestionsOneAtATime}
						onClick={() => setShowQuestionsOneAtATime(ssqoaat => !ssqoaat)}
					>
						<ListItemIcon>
							{showQuestionsOneAtATime && <Check fontSize="small" />}
						</ListItemIcon>
						<ListItemText>Show Questions One at a Time</ListItemText>
					</MenuItem>
				</Menu>
			</AppBar>
			<div className="placeholder" style={{ height: "6rem" }}></div>
			<SortingDialog
				isOpen={showSortingDialog}
				close={() => setShowSortingDialog(false)}
			/>
		</>
	);
};

export default Header;
