import { QuestionsModel } from "./questions.model";

export interface QuestionListModel{
    list?: QuestionsModel[];
    totalCount: number;
}