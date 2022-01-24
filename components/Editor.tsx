import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

import oddNumber from '../algorithms/easy/odd_number' 
import diffArrays from '../algorithms/medium/diff_arrays'
import listCompleter from '../algorithms/hard/listCompleter'

import submitCode from '../scripts/submitCode'

import editor_styles from "../styles/components/Components.editor.module.css"
import styles from "../styles/Home.module.css"

type questionType = {
  text: Function,
  question: Function,
  placeholder: Function,
  questionName: Function,
  variableInjection: Function
}
 
export default function CodeEditor({ difficulty }: { difficulty: string; }): JSX.Element {
  const [ code, setCode ] = useState(``)

  const [ result, setResult ] = useState("")
  const [ isResultHidden, setHidden ] = useState(true)
  const [ expectedResult, setExpected ] = useState("")
  const [ testCase, setTestCase ] = useState("")
  const [ questionIndex, setQuestionIndex ] = useState(0)
  const [ questionText, setText ] = useState("")

  const [ isTestAble, setTestStatus ] = useState(false)

  const [ rightQuestions, setRightQuestions ] = useState(0)
  const [ rightPercentage, setPercentage ] = useState(0)
  const [ totalTested, setTested ] = useState(0)

  const [ finalSumbitHidden, setFinalHidden ] = useState(true)
  const [ submitButtonStatus, setSubStatus ] = useState(false)

  var easyFuncs: questionType[] = [ oddNumber ]
  var midFuncs: questionType[] = [ diffArrays ]
  var hardFuncs: questionType[] = [ listCompleter ]

  useEffect(() => {
    if(difficulty === "easy") {
      var index = Math.floor(Math.random() * easyFuncs.length);

      setQuestionIndex(index);
      setText(easyFuncs[index].text());
      setCode(easyFuncs[index].placeholder());
    } else if(difficulty === "medium") {
      var index = Math.floor(Math.random() * midFuncs.length);

      setQuestionIndex(index);
      setText(midFuncs[index].text());
      setCode(midFuncs[index].placeholder());
    } else if(difficulty === "hard") {
      var index = Math.floor(Math.random() * hardFuncs.length);

      setQuestionIndex(index);
      setText(hardFuncs[index].text());
      setCode(hardFuncs[index].placeholder());
    }
  }, [difficulty]);

  function tester(arr: any[], code: string) {
    console.log(code)

    var userFun = new Function(code);
    var index = questionIndex;

    var question = arr[index].question();
    var userResponse = userFun(question.testCase);

    console.log(userResponse);
    console.log(question.response);

    setResult(JSON.stringify(userResponse));
    setTestCase(JSON.stringify(question.testCase));
    setExpected(JSON.stringify(question.response));
  }

  function testCode(code: string) {
    setHidden(false);

    if(difficulty === "easy") {
      tester(easyFuncs, easyFuncs[questionIndex].variableInjection(code, testCase));
    } else if(difficulty === "medium") {
      tester(midFuncs, midFuncs[questionIndex].variableInjection(code, testCase));
    } else if(difficulty === "hard") {
      tester(hardFuncs, hardFuncs[questionIndex].variableInjection(code, testCase));
    }
  }

  function resultText() {
    if(result == expectedResult) return (
      <h3 style={{color: "#62da62"}} >RESPOSTA CORRETA</h3>
    )
    else return ( <h3 style={{color: "#cf4e4e"}} >RESPOSTA ERRADA</h3> )
  }

  function codeSubmit(code: string) {
    setTestStatus(true)

    if(difficulty === "easy") {
      var submited = submitCode(code, easyFuncs[questionIndex]);
      setSubStatus(true);
      setRightQuestions(submited.right_questions);
      setPercentage(submited.percentage);
      setTested(submited.loopCount);
      setFinalHidden(false);
    } else if (difficulty === "medium") {
      var submited = submitCode(code, midFuncs[questionIndex]);
      setSubStatus(true);
      setRightQuestions(submited.right_questions);
      setTested(submited.loopCount);
      setPercentage(submited.percentage);
      setFinalHidden(false);
    } else if (difficulty === "hard") {
      var submited = submitCode(code, hardFuncs[questionIndex]);
      setSubStatus(true);
      setRightQuestions(submited.right_questions);
      setTested(submited.loopCount);
      setPercentage(submited.percentage);
      setFinalHidden(false);
    }
  }

  return (
    <div className={styles.main} style={{marginTop: -100}} >

      <p className={styles.description} id="questionText" style={{maxWidth: 600}} >{questionText}</p>

      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          backgroundColor: "#242424",
          borderRadius: 10,
          width: 600,
          height: 500
        }}
      />

      <div className={editor_styles.resultContainer} hidden={isResultHidden} >
        <h3>Caso de teste: {""} <code className={styles.code}>{testCase}</code></h3>
        <h3>Esperado: {""} <code className={styles.code}>{expectedResult}</code></h3>
        <h3>Recebido: {""} <code className={styles.code}>{result}</code></h3>
        {
          resultText()
        }
      </div>

      <div className={editor_styles.buttonWrapper} >
        <button 
          className={editor_styles.testButton}
          onClick={() => { testCode(code) }}
          type="button"
          disabled={isTestAble}
        >Rodar teste</button>
        <button 
          className={editor_styles.testButton}
          onClick={() => { codeSubmit(code) }}
          type="button"
          disabled={submitButtonStatus}
        >Submeter aplicação</button>
      </div>

      <div style={{marginTop: 30}} hidden={finalSumbitHidden} >
        <h2>QUESTÃO SUBMETIDA</h2>
        <h3>PORCENTAGEM DE ACERTO: {rightPercentage}%</h3>
        <h3>QUESTÕES ACERTADAS: {rightQuestions}/{totalTested}</h3>
      </div>
    </div>
  );
}