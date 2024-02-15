export interface QuestionsModel {
    id:number;
    questionText: string;
    questionType: string;
    optionAns: OptionAnsItem[];
}

export interface OptionAnsItem {
    id:number;
    option: string;
    isAns: boolean;
}