import React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "../types";

const Contents = ({
	contents,
	getRound
}: {
	contents: Link[];
	getRound: (href: string) => void;
}) => (
	<List>
		{contents.map((link: Link) => (
			<ListItem
				component={Button}
				key={link.rel}
				onClick={() => {
					getRound(link.href);
				}}
			>
				{link.rel}
			</ListItem>
		))}
	</List>
);

export default Contents;
