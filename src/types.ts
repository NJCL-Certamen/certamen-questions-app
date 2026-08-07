export interface Link {
	rel: string;
	href: string;
}

export interface QuestionAnswer {
	question: string;
	answer: string;
}

export interface Round {
	tournament: string;
	year: number;
	division: string;
	round: string;
	questions: {
		tossup: QuestionAnswer;
		boni: QuestionAnswer[];
	}[];
}
