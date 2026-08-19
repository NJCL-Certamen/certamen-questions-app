import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Link } from "../types";
import { useState } from "react";
import {
	ARRANGEMENT_ORDER_STORAGE_KEY,
	useOptionsContext
} from "../context/OptionsContext";

const SortingDialog = ({
	close,
	isOpen
}: {
	close: VoidFunction;
	isOpen: boolean;
}) => {
	const { arrangementOrder, setArrangementOrder } = useOptionsContext();
	const [newArrangementOrder, setNewArrangementOrder] =
		useState<(keyof Link)[]>(arrangementOrder); // don't want to re-sort on every click

	return (
		<Dialog open={isOpen} onClose={close}>
			<DialogTitle>Alter How the Contests are Sorted</DialogTitle>
			<DialogContent>
				<List>
					{newArrangementOrder.map((attr, idx) => (
						<ListItem key={attr}>
							<ListItemIcon>
								<IconButton
									disabled={idx === 0}
									onClick={() => {
										setNewArrangementOrder(order => [
											...order.slice(0, idx - 1),
											attr,
											order[idx - 1],
											...order.slice(idx + 1)
										]);
									}}
								>
									<ArrowUpwardIcon />
								</IconButton>
							</ListItemIcon>
							<ListItemText>{`${attr.at(0)?.toUpperCase()}${attr.substring(1)}`}</ListItemText>
						</ListItem>
					))}
				</List>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					onClick={() => {
						setArrangementOrder(newArrangementOrder);
						localStorage.setItem(
							ARRANGEMENT_ORDER_STORAGE_KEY,
							JSON.stringify(newArrangementOrder)
						);
						close();
					}}
				>
					Done
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SortingDialog;
