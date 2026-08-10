import React, { ReactNode } from "react";
import Typography, { TypographyTypeMap } from "@mui/material/Typography";

const TAGS: Record<string, string> = {
	latin: "bold",
	title: "italics",
	emphasis: "underline"
};

const START_TAG_REGEX = new RegExp(`<(${Object.keys(TAGS).join("|")})>`, "i");

const parseSection = (text: string): string | ReactNode | ReactNode[] => {
	const regexResult = START_TAG_REGEX.exec(text);
	if (!regexResult) {
		return text;
	}

	const tag = regexResult[1];
	const closeTagIndex = text.indexOf(`</${tag}>`, regexResult.index);
	if (closeTagIndex === -1) {
		throw new Error(`unbalanced <${tag}> tags in ${text}`);
	}

	const beforeText = text.substring(0, regexResult.index);
	const insideText = text.substring(
		regexResult.index + regexResult[0].length,
		closeTagIndex
	);
	const afterText = text.substring(closeTagIndex + `</${tag}>`.length);

	switch (TAGS[tag]) {
		case "bold":
			return (
				<>
					{beforeText}
					<strong>{parseSection(insideText)}</strong>
					{parseSection(afterText)}
				</>
			);
		case "italics":
			return (
				<>
					{beforeText}
					<em>{parseSection(insideText)}</em>
					{parseSection(afterText)}
				</>
			);
		case "underline":
			return (
				<>
					{beforeText}
					<u>{parseSection(insideText)}</u>
					{parseSection(afterText)}
				</>
			);
	}
};

const parsePseudoTags = (
	text: string,
	typographyProps?: TypographyTypeMap
): ReactNode => {
	return (
		<Typography variant="body2" {...(typographyProps || {})}>
			{parseSection(text)}
		</Typography>
	);
};

export default parsePseudoTags;
