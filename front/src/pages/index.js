import { useContext, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserContext } from './../context/UserContext.js';
import Loader3 from '../components/common/spinners/Loader3.js';

// import Layout from '../components/common/Layout.js';
// import Home from './home.js';
// import About from './about.js';
// import Profile from './profile.js';
// import Signup from './signup.js';
// import SignupPage from './signupPage.js';
// import Login from './login.js';
// import FindId from './findid.js';
// import FindPassword from './findpassword.js';
// import ChangePassword from './changepassword.js';
// import ErrorPage from './error/ErrorPage.js';
// import StyleGuide from './guide/styleGuide.js';
// import Protected from './protected/protectedPage.js';
// import CreateMyProject from './project/CreateMyProject.js';
// import ProjectDetail from './project/ProjectDetail.js';
// import Write from './write/Write.js';
// import MyWritesList from './write/MyWritesList.js';
// import MyComments from './write/MyComments.js';
// import MyProject from './project/MyProject.js';
// import MyLikeProject from './project/MyLikeProject.js';
// import MyRequestProject from './project/MyRequestProject.js';
// import ProjectsSearchDetail from './search/ProjectsSearchDetail.js';
// import TagSearchDetail from './search/TagSearchDetail.js';

const Layout = lazy(() => import('../components/common/Layout.js'));
const Home = lazy(() => import('./home.js'));
const About = lazy(() => import('./about.js'));
const Profile = lazy(() => import('./profile.js'));
const Signup = lazy(() => import('./signup.js'));
const SignupPage = lazy(() => import('./signupPage.js'));
const Login = lazy(() => import('./login.js'));
const FindId = lazy(() => import('./findid.js'));
const FindPassword = lazy(() => import('./findpassword.js'));
const ChangePassword = lazy(() => import('./changepassword.js'));
const ErrorPage = lazy(() => import('./error/ErrorPage.js'));
const StyleGuide = lazy(() => import('./guide/styleGuide.js'));
const Protected = lazy(() => import('./protected/protectedPage.js'));
const CreateMyProject = lazy(() => import('./project/CreateMyProject.js'));
const ProjectDetail = lazy(() => import('./project/ProjectDetail.js'));
const Write = lazy(() => import('./write/Write.js'));
const MyWritesList = lazy(() => import('./write/MyWritesList.js'));
const MyComments = lazy(() => import('./write/MyComments.js'));
const MyProject = lazy(() => import('./project/MyProject.js'));
const MyLikeProject = lazy(() => import('./project/MyLikeProject.js'));
const MyRequestProject = lazy(() => import('./project/MyRequestProject.js'));
const ProjectsSearchDetail = lazy(() => import('./search/ProjectsSearchDetail.js'));
const TagSearchDetail = lazy(() => import('./search/TagSearchDetail.js'));



const RoutesPage = () => {

    const { state } = useContext(UserContext);
    return (
        <Layout>
            <Suspense fallback={<Loader3 full={true} scale='2' />}>
                <Routes>
                    <Route path='/' element={<Home page={'메인페이지'}/>}></Route>
                    <Route path='/project/list' element={!state.loadUserLoading && state.isLogged  ? <About page={'친구들 습관보기'} /> : <Protected page={'친구들 습관보기'}/>}></Route>
                    <Route path='/profile' element={!state.loadUserLoading && state.isLogged  ? <Profile page={'내 정보'} /> : <Protected page={'내 정보'} />}></Route>
                    <Route path='/login' element={ <Login page={'로그인'}/>}></Route>
                    <Route path='/signup' element={<Signup page={'회원가입'} />}></Route>
                    <Route path='/signuppage' element={<SignupPage page={'회원가입'} />}></Route>
                    <Route path='/findid' element={<FindId page={'아이디 찾기'} />}></Route>
                    <Route path='/findpassword' element={<FindPassword page={'비밀번호 찾기'} />}></Route>
                    <Route path='/changepassword' element={!state.loadUserLoading && state.isLogged ? <ChangePassword page={'비밀번호 변경'} /> : <Protected page={'비밀번호 변경'} />}></Route>

                    <Route path='/project/create' element={!state.loadUserLoading && state.isLogged  ? <CreateMyProject page={'새 습관 만들기'} /> : <Protected page={'새 습관 만들기'} />}></Route>
                    <Route path='/project/detail/:_id' element={!state.loadUserLoading && state.isLogged  ? <ProjectDetail page={'습관 상세보기'} /> : <Protected page={'습관 상세보기'} />}></Route>
                    
                    <Route path='/write/detail/:_id' element={!state.loadUserLoading && state.isLogged  ? <Write page={'글 상세보기'} /> : <Protected page={'글 상세보기'} />}></Route> 
                    <Route path='/write/mylist' element={!state.loadUserLoading && state.isLogged  ? <MyWritesList page={'내 글'} /> : <Protected page={'내 글'} />}></Route>
                    <Route path='/comments/mylist' element={!state.loadUserLoading && state.isLogged  ? <MyComments page={'내 댓글'} /> : <Protected page={'내 댓글'} />}></Route>
                    <Route path='/project/myproject' element={!state.loadUserLoading && state.isLogged  ? <MyProject page={'내 습관'} /> : <Protected page={'내 습관'} />}></Route>
                    <Route path='/project/mylike' element={!state.loadUserLoading && state.isLogged  ? <MyLikeProject page={'좋아하는 습관'} /> : <Protected page={'좋아하는 습관'} />}></Route>
                    <Route path='/project/myapply' element={!state.loadUserLoading && state.isLogged  ? <MyRequestProject page={'습관 신청/초대'} /> : <Protected page={'습관 신청/초대'} />}></Route>

                    <Route path='/search/result/total/:searchValue' element={<ProjectsSearchDetail page={'습관 검색 결과'} />}></Route>
                    <Route path='/search/tag/result/total/:tagValue' element={<TagSearchDetail page={'태그 검색 결과'} />}></Route>

                    <Route path='/page/error/404' element={<ErrorPage />}></Route>
                    <Route path="/*" element={<ErrorPage />} />
                    <Route path='/style/:id' element={<StyleGuide />}></Route>
                </Routes>
            </Suspense>

    

            {/* <Route path='/write/list/user/:_id' element={!state.loadUserLoading && state.isLogged  ? <WriteDetail page={'글 모음'} /> : <Protected page={'글 모음'} />}></Route> */}
        </Layout>
    );
};

export default RoutesPage;