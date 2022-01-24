type questionType = {
    text: Function,
    question: Function,
    placeholder: Function,
    questionName: Function,
    variableInjection: Function
}

type submitedQuestionType = {
    expected: string,
    received: string,
    correct: boolean
}

export default function SubmitCode(code: string, question: questionType) {

    var questions: submitedQuestionType[] = [];
    var right_questions = 0;

    var loopCount = Math.floor(Math.random() * 101);

    for(var i = 0; i < loopCount; i++) {
        var quest = question.question();
        var newCode = question.variableInjection(code, quest.testCase);
        var userFun = new Function(newCode);
        var userResp = userFun();

        var correct = () => { 
            console.log(userResp, quest.response)
            if(userResp == quest.response) return true
            else return false; 
        };

        if(correct() == true) right_questions += 1;

        questions.push({
            expected: quest.response,
            received: userResp,
            correct: correct()
        });
    };

    var percentage = Math.round(right_questions * 100 / loopCount);

    console.log({ right_questions, percentage, loopCount })
    return { right_questions, percentage, loopCount }
}