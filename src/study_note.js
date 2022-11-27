
/* <1. useState, useEffect, Props>

• 리액트를 사용하는 이유: 최소 단위의 렌더링을 위해
• useState(): 변수, 변수를 제어하는 함수로 구성되며 변하는 값을 제어, 해당 부분의 리렌더링을 위함
• props: 태그의 속성 값을 함수의 아규먼트 처럼 컴포넌트에 값을 전달해준다.
• useEffect(): 코드의 실행 시점을 관리할 수 있는 선택권을 얻는 방어막 같은 존재, 
디펜던시가 없을 경우 최초 1회 실행, 있을 경우 해당 값이 변할 경우 실행한다. 이 때 디펜던시는 여러개 입력이 가능하다.

🏴 부모 컴포넌트에서 리렌더링이 일어날 경우 모든 자식들이 리렌더링이 된다.(wa can use memo)
🏴 propType을 설치하고 props의 타입을 지정해 줄 수 있다. 이 때 isRequired로 필수값을 지정 가능

React.js는 새로운 정보를 자동적으로 refresh 해준 다는 점에서 편리하다.
하지만, 때로는 이러한 기능이 불필요할 때가 있다.
예를 들어, 검색창을 이용하는데 버튼 창이 리렌더링 되는 상황이 그렇다.
이렇게 불필요한 리렌더링을 피하기 위해 React.js가 따로 준비한 것이 바로 useEffect이다.
useEffect는 실행시키고자 하는 함수와 React.js가 이벤트를 주시하게끔 하는dependency로 이루어져있다. 
즉, 내가 원하는 부분을 지정하여 그 부분만을 변화시킬 수 있는 것이다.
버튼을 누르면 버튼만, 검색창을 이용할 때는 검색창만 리렌더링 되는 것처럼 말이다.

useEffect는 state의 상태를 감지 변경이 있을 때란 해당 컴포넌트를 랜더링한다.
useState(function(), []) [] 로 3가지 경우의 수 존재 ex) a, b 스테이트
1. 빈 배열을 넣는 경우, 최초 1회 랜더링 될 때만 실행한다.
2. [a] 하나의 state만 넣는 경우 a가 변경될 경우만 랜더링한다.
3. [a, b] a나 b중 하나가 값이 변경 될 때 랜더링한다.

useEffect 왜 써?
렌더링이 계속 된다면, 특히 특정 api를 불러오게 되는 경우 계속해서 불러오는 문제가 생길 수 있다.
state를 변경할 때, 계속해서 렌더링 되는 문제점이 존재한다. 많은 state가 존재한다면 성능 저하 문제가 발생할 수 있다. 
이런 문제를 해결하기 위해 사용한다.


import Button from "./Button";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
import userEvent from "@testing-library/user-event";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1); // 버튼 누를 때마다 count+1
  const onChange = (event) => setKeyword(event.target.value);
 
  console.log("I run all the time"); // 어떠한 state가 변경될 때 마다 계속 rendering
 
  useEffect(() => // state변경과 상관없이 첫 render만 시키고 싶을 때 useEffect 사용!
    {console.log("I run only once")},
    []); // [] 뜻은? [paramenter]내용이 변할 때 render 시키는 것, 이 경우 변경시킬 parameter가 없으므로 첫 한번만 rendering

  useEffect (() => 
    {if (keyword !== "" && keyword.length >5 ) {
      console.log("I run when 'keyword' changes", keyword)}}, // 동일 표현 = console.log (`I am searching for ${keyword}`)
      [keyword]); // keyword가 변화할 때, keyword 길이가 5가 넘을 때마다 rendering

  useEffect (()=>  
    {console.log("I run when 'counter' changes", counter)},
    [counter]); // counter가 변할 때만 rendering

  // //추가!! merged version 
  // useEffect (() => 
  //   {console.log("I run when counter & keyword changes")},
  //   [counter, keyword]); // counter나 keyword 중 하나가 변경될 때 rendering

  return (
    <div>
      <input 
        value={keyword}
        onChange={onChange} 
        type="text" 
        placeholder="Search here..." 
      />
      <h1> {counter} </h1>
      <button onClick={onClick}> Click me </button>
    </div>

    // <div>
    //   <h1 className={styles.title}> Welcome back to React! </h1>
    //   <Button text={"Continue"} />
    // </div>
  );
}

export default App;
*/


// ===========================================================================================================


/* <2. 정리(clean-up)를 이용하는 Effects>

위에서 정리(clean-up)가 필요하지 않은 side effect를 보았지만, 정리(clean-up)가 필요한 effect도 있습니다. 
외부 데이터에 구독(subscription)을 설정해야 하는 경우를 생각해보겠습니다. 
이런 경우에 메모리 누수가 발생하지 않도록 정리(clean-up)하는 것은 매우 중요합니다.

effect에서 함수를 반환하는 이유는 무엇일까요?
이는 effect를 위한 추가적인 정리(clean-up) 메커니즘입니다. 
모든 effect는 정리를 위한 함수를 반환할 수 있습니다.

React가 effect를 정리(clean-up)하는 시점은 정확히 언제일까요?
React는 컴포넌트가 마운트 해제되는 때에 정리(clean-up)를 실행합니다. 
하지만 위의 예시에서 보았듯이 effect는 한번이 아니라 렌더링이 실행되는 때마다 실행됩니다. 
React가 다음 차례의 effect를 실행하기 전에 이전의 렌더링에서 파생된 effect 또한 정리하는 이유가 바로 이 때문입니다.

https://ko.reactjs.org/docs/hooks-effect.html#effects-with-cleanup

버튼 클릭시, created :) , destroyed :(, created :) 메세지가 3개가 등장하였습니다.
이유는 index.js의 React.StricMode 가 활성화 되어 있어서네요.
급하게 강의를 따라하느라 끄라고 했었는지는 기억이 잘 나지 않지만 
혹시 저와 같이 함수가 두번 실행되는 경우 (double invoke)가 발생하면 위의 코드를 주석처리 하시면 될것 같습니다.

stricmode의 경우, 개발 과정중 안전을 위해 켜는 기능이며 배포시에 자동으로 해제된다고 합니다.


import { useEffect, useState } from "react";

function Hello() {
  //console.log("I am here 111")
  useEffect(() => {console.log("created"); 
  // component가 click event에 의해 create (hi tag가 생성) 될 때
  return () => console.log("destroyed");},[])
  return <h1> Hello </h1>;
  // component가 click event에 의해 destroy (hi tag가 사라질) 될 때
}

// 위와 동일한 함수 
// function Hello() {
//   function bye() {
//     console.log ("destroyed")}
//   function hi() {
//     console.log ("created")
//     return bye;}
//   useEffect(hiFn, []);
//   return <h1>Hello</h1>
//   }

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev)=>!prev);
  return(
    <div>
      {showing ? <Hello /> : null }
      <button onClick={onClick}> {showing ? "Hide" : "Show"} </button>
    </div>);
}

export default App;
*/

// ===========================================================================================================

/* <3. TO DO LIST by React>

import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const onChange = (event) => setToDo(event.target.value);
  const [toDos, setToDos] = useState([]);
  const deleteBtn = (event) => {
  const idx = parseInt(event.target.className);
    setToDos(toDos.filter((item, todoIndex) => idx !== todoIndex));
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDos((currnetArray) => [...currnetArray, toDo]); // toDos, toToDos 직접 수정하지 않고 List 수정 (element 추가)
    // function currentArray = { [] } 와 같은 함수
    setToDo("");
  };

  return (
    <div>
      <h1> My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          value={toDo}
          onChange={onChange}
          type="text"
          placeholder="Write your todo..."
        />
        <button> Add To Do </button>
      </form>

      <hr />
      {toDos.map((toDo, index) => (
        <li key={index}>
          {toDo}
          <button className={index} onClick={deleteBtn}>
            {" "}
            삭제{" "}
          </button>
        </li> // 유일하게 사용한 react 문법
      ))}
    </div>
  );
}
// map() 은 List 내 element 개수 만큼 함수를 실행하고, 그 List에 실행한 결과로 변경
// ['Hi', 'hello'].map((item) => item.toUpperCase())
// => ['HI', 'HELLO']
// React는 기본적으로 list에 있는 모든 item을 인식하기 때문에 key를 넣어 고유하게 만들어줘야함
// map의 첫 번째 argument는 값이고 두번째는 index 즉 숫자를 의미함

export default App;

*/

// ===========================================================================================================

/* <4. Coin tracker with API>

import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []); // []가 비었을 때 첫 한번만 render
  return (
    <div>
      <h1>The Coins - total : {loading ? "" : `(${coins.length})` </h1>
      {loading ? <strong>Loading...</strong> : null}
      <ul> 
        {coins.map((coin)=> <li>{coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD </li>)}
      </ul>// ul 대신 selector, li 대신 options 사용연습 해볼것 
    </div>
  );
}

export default App;
 
*/