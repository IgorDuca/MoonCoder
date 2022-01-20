import React, { useState } from 'react';
import type { NextPage } from 'next'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

import editor_styles from "../styles/components/Components.editor.module.css"
import styles from "../styles/Home.module.css"

const result = "";
 
const CodeEditor: NextPage = () => {
  const [ code, setCode ] = useState(`
  function solve(num) {
    // Ecreva seu código aqui
  }
  
  return solve();`)

  const [ result, setResult ] = useState("")
  const [ isResultHidden, setHidden ] = useState(true)
  const [ expectedResult, setExpected ] = useState("")
  const [ testNumber, setTestNumber ] = useState(0)

  function testCode(code: string) {
    var randomNumber = Math.floor(Math.random() * 101);
    setTestNumber(randomNumber)

    const test_function = new Function(code);

    setResult(JSON.stringify(test_function(randomNumber)))
    setExpected(JSON.stringify(getResult(randomNumber)))

    console.log({randomNumber, result, expectedResult})

    setHidden(false)
  }

  function getResult(num: number) {
    if(num % 2 == 0) return false
    else return true;
  }

  return (
    <div className={styles.main} style={{marginTop: -100}} >
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            backgroundColor: "#242424",
            color: "#fff",
            borderRadius: 10,
            width: 600,
            height: 500
          }}
        />

        <div className={editor_styles.resultContainer} hidden={isResultHidden} >
          <h3>Número de teste: {""} <code className={styles.code}>{testNumber}</code></h3>
          <h3>Esperado: {""} <code className={styles.code}>{expectedResult}</code></h3>
          <h3>Recebido: {""} <code className={styles.code}>{result}</code></h3>
        </div>

        <div className={editor_styles.buttonWrapper} >
          <button 
            className={editor_styles.testButton}
            onClick={() => { testCode(code) }}
          >Rodar teste</button>
          <button className={editor_styles.testButton}>Submeter aplicação</button>
        </div>
    </div>
  );
}

export default CodeEditor