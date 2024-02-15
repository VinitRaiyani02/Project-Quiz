import { Genders } from "src/app/shared/enums/gender.enum";
import { QuestionType } from "src/app/shared/enums/question-type";

export interface InputFieldProps{
    ControlName: string,
    Type:string,
    Label: string,
    IsDisabled: boolean,
    PlaceHolder: string,
    FormGroupName?:string,
    FormArrayName?:string,
    List?:string[],
    SelectOptions?: ISelectOptions[]
}
export interface ISelectOptions{
    disabled: boolean,
    selected: boolean,
    text: string,
    value: string | number
}

export const genderSelectOptions: ISelectOptions[] = Object.values(Genders).map(gender => ({
    disabled: false,
    selected: false, 
    text: gender,
    value: gender
}));
export const questionTypeSelectOptions: ISelectOptions[] = Object.values(QuestionType).map(type => ({
    disabled: false,
    selected: false, 
    text: type,
    value: type
}));

export const InitInputField : InputFieldProps = {
    ControlName: '',
    Type: '',
    Label: "",
    IsDisabled: false,
    PlaceHolder: "",
    FormGroupName:'',
    FormArrayName:''
}


