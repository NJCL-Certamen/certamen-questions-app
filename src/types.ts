export interface Link {
	rel: string;
	href: string;
	tournament: string;
	year: string;
	division: string;
	round: string;
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
