import React, { useState, useEffect, useContext, useRef } from 'react';
import { BrowserRouter, useSearchParams  } from 'react-router-dom';
import RoutesPage from './pages/index.js'
import { getQueryString, getWithExpire } from './utils/utils.js'


// context & request
import { ImageProvider } from './context/ImageContext.js'
import { UserProvider, UserContext } from './context/UserContext.js'
import UserRequest from './reducers/UserRequest.js'
// import { getUser } from './reducers/UserRequest.js'


const App = () => {

  const { getUser } = UserRequest();
  const {state, dispatch} = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const valid = searchParams.get('valid');
  const accToken = searchParams.get('accToken');

  // 유저 새로고침
  const userLoad = async () => {
    try {
      const accToken = getWithExpire('X-access-token');
      if(!accToken) return;

      // 로그아웃/시간후로그아웃 제외 예상치못하게 로그아웃되어 있는 경우 무한로딩 뜨는 문제해결
       if(!state.isLogged) dispatch({ type: "LOADING_CLEAR" });

      dispatch({ type: "USER_LOAD_REQUEST" });
      await getUser(); 
      

    } catch(err) {
      console.error('catch?', err);
    } ;
  };

  const userEmailLoad = async () => { //메일로 유입되는 유저는 acc토큰 넘겨줌
    try {
      if(accToken && valid) {
          if(!accToken) throw new Error('is not acctoken');
          await getUser(accToken);
          window.location.href = '/';
      };
    } catch(err) {
      console.error(err)
    };
  };
  

  useEffect(() => {
    userLoad();
    userEmailLoad();
  }, []);

  useEffect(() => {
    const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initTheme = isBrowserDarkMode ? 'dark' : 'light';
    let html = document.querySelector('html');
    html.setAttribute('data-color', state.user?.darkMode || initTheme);
  }, [state.user])


 
  return (
      <div className="App"> 
        {state.loadUserLoading && <div>파이어베이스 로드 참고하기...........파이어베이스 로드 참고하기...........파이어베이스 로드 참고하기...........파이어베이스 로드 참고하기...........파이어베이스 로드 참고하기...........파이어베이스 로드 참고하기...........파이어베이스 로드 참고하기...........파이어베이스 로드 참고하기...........파이어베이스 로드 참고하기...........파이어베이스 로드 참고하기...........파이어베이스 로드 참고하기...........파이어베이스 로드 참고하기...........파이어베이스 로드 참고하기...........파이어베이스 로드 참고하기...........파이어베이스 로드 참고하기...........</div>}

        <RoutesPage />
      </div>
  );
}



export default App;

















  // static 파일 axios로 잘 붙는지 테스트
  // const [test, setTest] = useState(null) 
  // const html = useRef()
  // const aa = async () => {
  //   const hoho = await axios.get('http://localhost:3001/index2.html', {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  //       'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
  //     }
  //   })
  //   // console.log(hoho.data)
  //   setTest(hoho.data)
  // }
  // useEffect(() => {
  //   aa();
  //   console.dir(html.current)
  //   // html.current.innerHTML += `${test}`
  // }, [])