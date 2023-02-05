import type { NextPage } from 'next';
import React, { useState } from 'react';
import Image from 'next/image';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import DropDown, { LanguageType } from './components/Dropdown';
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import Head from 'next/head';
import { FiCopy, FiLoader } from 'react-icons/fi';
import { AiOutlineGithub } from 'react-icons/ai';
import { HiNoSymbol, HiOutlineNoSymbol } from 'react-icons/hi2';

const Home: NextPage = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState<LanguageType>('Python');
  const [generatedBios, setGeneratedBios] = useState<String>('');

  console.log('result ', result);


  const prompt = `convert this code  ${input} to ${language}`;
  input.slice(-1) === '.' ? '' : '.';

  const generateCode = async (e: any) => {
    e.preventDefault();
    setGeneratedBios('');
    setLoading(true);
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log('Edge function returned.');

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    // console.log(generatedBios.streamedResponse);

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Codegenie Generator</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='bg-gray-900 h-screen'>
        <header className='bg-gray-900 flex py-2 px-1 md:p-2 sticky top-0 z-50'>
          <h1 className='flex-grow font-bold flex items-center text-gray-300 md:mr-2'>
            <div className='mx-2'>
           
            </div>
            <span className='hidden md:flex'>CodeGenie</span>
          </h1>

          <section className='space-x-1 md:space-x-2 flex items-center'>
            <a
              className='flex items-center bg-gray-100 rounded-full px-2 py-1 w-full'
              href='https://github.com/Mamsheikh/codegenie'
              target='_blank'
              rel='noopener noreferrer'
            >
              <AiOutlineGithub className='h-5 w-5 ' />{' '}
              <span className='text-xs text-gray-900 ml-1'>Star on Github</span>
            </a>

            <DropDown
              language={language}
              setLanguage={(newLang) => setLanguage(newLang)}
            />
            {/* {!loading && ( */}
            <button
              className='flex items-center bg-blue-500 hover:bg-blue-600 rounded text-white px-2.5 py-2'
              onClick={(e) => generateCode(e)}
            >
             
              {!loading ? (
                'Convert'
              ) : (
                <FallingLines
                  color='#fff'
                  width='28px'
                  height='28px'
                  // width='100'
                  visible={true}
                  // ariaLabel='falling-lines-loading'
                />
              )}
           
            </button>

           
          </section>
        </header>

        <section className='flex flex-row  py-4 bg-gray-900   space-x-4 px-4'>
          <div className='bg-[#282A36] py-4 h-screen overflow-hidden overflow-y-auto flex-col rouded-md flex w-full rounded-md items-end'>
            <div className='flex space-x-3 justify-end text-white px-4 py-1'>
              <HiOutlineNoSymbol
                className='h-5 w-5 cursor-pointer hover:text-gray-200 text-white'
                onClick={() => {
                  setInput('');
                  toast.success('board cleard');
                }}
              />
            </div>
            <CodeMirror
              className='w-full h-full'
              //   value="console.log('hello world!');"
              // height='480px'
              placeholder='Type or paste some code...'
              spellCheck={false}
              theme={dracula}
              extensions={[javascript({ jsx: true }), python()]}
              //   readOnly
              value={input}
              onChange={(value) => setInput(value)}
            />
          </div>
          <div className='flex w-full py-4 bg-[#282A36] flex-col rounded-md items-end  px-4 '>
            <div className='flex justify-end px-4 py-1'>
              <FiCopy
                className='h-5 w-5 flex cursor-pointer text-white hover:text-gray-200'
                onClick={() => {
                  navigator.clipboard.writeText(generatedBios as string);
                  toast.success('Code copied to clipboard');
                }}
              />
            </div>
            <CodeMirror
              className='w-full h-full'
              theme={dracula}
              spellCheck={false}
              height='100%'
              extensions={[python(), javascript({ jsx: true })]}
              value={generatedBios as string}
              readOnly
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
