import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "../types";
import { ARRANGEMENT_ORDER } from "../hooks/useSortedContents";
import { useNavigate } from "react-router-dom";
import { useQuestionsContext } from "../context/QuestionsContext";
import useSortedContents from "../hooks/useSortedContents";

const Contents = () => {
	const navigate = useNavigate();
	const { getRound } = useQuestionsContext();
	const { contents } = useSortedContents();

	return (
		<Stack direction="column" sx={{ gap: 2, mt: "2rem" }}>
			{contents.map((manyManyLinks: Link[][][], idx: number) => (
				<Card key={`1.${idx}`} variant="elevation">
					<CardHeader title={manyManyLinks[0][0][0][ARRANGEMENT_ORDER[0]]} />
					<CardContent>
						<Stack direction="row" sx={{ flexWrap: "wrap", gap: 2 }}>
							{manyManyLinks.map((manyLinks: Link[][], idx2: number) => (
								<Card key={`2.${idx2}`} variant="outlined">
									<CardHeader title={manyLinks[0][0][ARRANGEMENT_ORDER[1]]} />
									<CardContent>
										{manyLinks.map((links: Link[], idx3: number) => (
											<Accordion key={`3.${idx3}`}>
												<AccordionSummary>
													<Typography variant="body1">
														{links[0][ARRANGEMENT_ORDER[2]]}
													</Typography>
												</AccordionSummary>
												<AccordionDetails>
													<List>
														{links.map((link: Link) => (
															<ListItem
																component={Button}
																key={link.rel}
																onClick={() => {
																	getRound(link.href);
																	navigate(`/round?path="${link.href}"`);
																}}
															>
																{link.rel}
															</ListItem>
														))}
													</List>
												</AccordionDetails>
											</Accordion>
										))}
									</CardContent>
								</Card>
							))}
						</Stack>
					</CardContent>
				</Card>
			))}
		</Stack>
	);
};

export default Contents;
