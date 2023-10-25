# HOBBYIST 습관 만들기

## 1. 소개 
습관을 만들고 한눈에 보면서 관리하기 위한 웹앱.   
다른 습관 앱들을 사용해보니 너무 기능이 많아 복잡하거나 한눈에 확인 할 수 없는 등 사용성이 불편하여 개인적으로 사용하기 위해 제작했습니다.   

습관을 만들면 하루하루 간단하게 인증할 수 있고 인증한 것들을 달력, 잔디로 한눈에 확인 가능합니다.   
친구들을 초대해서 같이 진행할 수 있고 목표를 정해서 진행하거나 숙제를 진행하고 관리 할 수 있습니다.   
   
이 웹을 만들기 위해 React, Redux, NodeJS, MongoDB, Network, REST API 등을 학습했습니다.

&nbsp;
&nbsp;
****
&nbsp;
&nbsp;

## 2. 배포주소
[https://web-hobbyist-front-euegqv2bln64g6o5.sel5.cloudtype.app/](https://web-hobbyist-front-euegqv2bln64g6o5.sel5.cloudtype.app/)
   
&nbsp;
&nbsp;
****
&nbsp;
&nbsp;

## 3. 사용기술 
React, CSS, NodeJS, MongoDB

### 3-1. Front
Componenets와 pages 폴더를 분리하여 관리했습니다.
Components안에서는 각 파트별(users, projects, writes, comment, recomments, common 등..)로 큰 단위, 작은 단위별로 컴포넌트를 제작하여 사용했고 큰 단위의 컴포넌트를 pages에서 import 했습니다.

상태관리는 Context API와 useReducer을 활용하여 관리했습니다   
reducers 폴더에 Reducer와 Request 파일을 파트별로 만들어 관리했습니다.   
Reducer는 상태와 액션을 관리했고 Request파일에서는 API요청과 응답에 따라 액션을 실행합니다.   
필요에 따라 응답값을 컴포넌트에서 리턴값으로 활용하기도 했습니다.   
상태관리에 Redux와 Redux-saga를 사용할까 고민도 해봤지만 이 개발과정에서 데이터 흐름을 더 잘 이해하고 싶어서 Redux를 사용하지 않고 비슷한 구조로 작업하려면 어떻게 해야 할지 고민을 많이 했습니다. 마찬가지의 이유로 immer같은 불변 객체를 관리하는 모듈을 사용하지 않고 작업했습니다.   

> 데이터 흐름 
> 1. Component 파일에서 Request Dispatch, API 요청 함수 실행
> 2. Request 파일에서 API요청 후 성공/실패에 따라 Dispatch 실행
> 3. Reducer 파일에서 Data를 상태에 적용
> 4. Component 파일의 상태 변경

### 3-2. Back
Backend에서는 Express와 mongoose를 사용했습니다. 
API를 만들고 Postman으로 테스트하며 API 문서를 만들었습니다.  
<img src="https://github.com/ejonghwan/be/assets/53946298/65b79b13-8205-49c0-8181-5165ae610101" width="40%" height="auto"></img>
이미지 처리는 Multer모듈을 이용해서 작업했고 이미지파일은 Back서버의 uploads 폴더에 담아두는 것으로 일단 처리했습니다.    무료서버라서 프론트에서 1MB 제한을 걸어두었습니다.   

Router 분리를 users, write, search, recomment, project, imgage, email, comment로 작업하였고 인증과 이미지 처리, 이메일 인증, 인증번호 보내는 것들은 Middleware를 만들어 처리했습니다.   
작업하면서 가장 애를 먹은 부분 중 하나가 회원 인증처리였습니다.    
많이 학습하며 고민한 끝에 짧은 토큰 Access Token과 긴 토큰 Refresh Token을 발급하여 관리하는 방법을 선택했고 회원가입 시 Refresh Token을 암호화(bcrypt 사용)하여 DB에 저장하고 Front에는 HTTP Only Cookies로 보냈습니다.    
Access Token의 시간을 2시간으로 잡고 2시간 내에는 Access Token을 2시간이 지나면 Refresh Token토큰 을 보내 DB에 저장되어 있는 Refresh Token토큰과 비교했습니다.    

&nbsp;
&nbsp;
****
&nbsp;
&nbsp;

## 4. 기능
### 4-1. 회원가입
<video src="https://github.com/ejonghwan/be/assets/53946298/fd133f06-5953-45ac-a663-657a0cda9a57" width="500" muted  autoplay loop></video>
##### 기능 설명
* 메일로 1시간 동안만 유효한 토큰을 발송합니다. 발송된 토큰이 만료되면 해당 페이지로는 더 이상  이 토큰으로 가입이 불가합니다. 
* Front 화면에서는 15분 이상 지나면 화면이 닫히게 됩니다.
* 회원가입 완료 시 DB에 30일간 유효한 Refresh Token을 단방향 암호화(bcrypt 사용)하여 생성 후 저장합니다. 이후 정보를 로드할 때 발급한 토큰이 만료되면 30일 토큰을 재발급하여 DB에 저장된 토큰값 변경합니다.
* 비밀번호는 DB에 저장할 때 단방향 암호화(bcrypt 사용)하여 저장합니다.
* Input Validation (Front, Back, Model 세곳 모두에서 타입체크 및 검증)
  * Id는 4~12자 사이로 입력 받습니다.
  * Password는 8~16자 숫자+문자+특수문자 조합해야 합니다. 
  * Password는 같은 값을 다시 한번 체크합니다.
  * 모든 Input 값이 만족해야 회원가입 버튼 활성화 됩니다.
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-2. 로그인, 로그아웃, 새로고침
<video src="https://github.com/ejonghwan/be/assets/53946298/03d2b1a2-42a5-4f5e-bd8d-c138a2fab0d2" width="500" muted  autoplay loop></video>
##### 기능 설명
* Id가 없을 경우는 유저가 없다는 에러 메시지 출력합니다.
* Id는 존재하지만 Password가 일치하지 않을 경우 비밀번호 일치하지 않음 에러 메시지 출력합니다.
* 로그인 성공 시 2시간 동안 유효한 Access Token 발급. Acc토큰은 로컬저장소에 저장하고 동시에 암호화된 Refresh Token도 보내주는데 JS로 접근 불가능한 HTTP Only Cookies로 Front에 보냅니다.  
* 새로고침 시 Access Token을 확인 후 만료 되었다면 Refresh Token을 Back에 보내서 복호화 후 DB에 저장된 토큰과 동일하다면 2시간 유효한 Access Token을 다시 발급합니다.
* 로그아웃 시 Front 상태, 로컬 저장소에 저장된 토큰 값 제거. Back에서는 Clear Cookie 합니다.
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-3. 습관 생성
<video src="https://github.com/ejonghwan/be/assets/53946298/e9950eae-e911-435d-9b30-20ca0f943d91" width="500" muted  autoplay loop></video>
##### 기능 설명
* 습관은 간단한 아이콘이 메인 이미지로 제공되며 습관명은 5~20자까지만 가능하고 이후 수정 불가합니다. 
* 습관 내용에는 룰과 규칙 등 내용 입력합니다.
* 친구 검색은 debounce를 이용하여 사용자가 채팅을 멈추고 0.5초 이후 검색 요청을 보냅니다.
* 친구를 초대하면 친구에게는 수락/거절이 보여지게 됩니다.
* 카테고리는 #으로 구분되며 카테고리 검색 시 같은 카테고리끼리 검색 노출됩니다.
* 습관을 공개하면 다른 사람들에게 공개되고 비공개라면 보이지 않습니다.
* Input Validation (Front, Back, Model 세곳 모두에서 타입체크 및 검증)
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-4. 습관 수정
<video src="https://github.com/ejonghwan/be/assets/53946298/491ee13a-7dd8-4f73-bb26-cc9e2e3c6c67" width="500" muted  autoplay loop></video>
##### 기능 설명
* 습관 내용 중 수정되지 않은 부분은 Back으로 보내지 않습니다.
* Back에서도 수정된 부분만 DB에서 수정합니다.
* 기존 카테고리명이 겹치거나 입력창에서 같은 카테고리명을 여러개 적어도 하나만 등록하게 구현했습니다.
* Input Validation (Front, Back, Model 세곳 모두에서 타입체크 및 검증)
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-5. 습관에 친구 초대하기
<video src="https://github.com/ejonghwan/be/assets/53946298/89461335-3f11-40e8-ae49-4ecfe34c980d" width="500" muted  autoplay loop></video>
##### 기능 설명
* 친구 검색은 debounce를 이용하여 사용자가 채팅을 멈추고 0.5초 이후 검색 요청을 보냅니다.
* 검색결과가 자기자신 밖에 없거나 한명도 없다면 유저없음 UI출력합니다.
* 친구를 초대하면 친구에게는 해당 습관에 수락/거절이 보여지게 됩니다.
* 수락 시 습관 상세페이지로 이동하며 가입된 유저에게 보여지는 UI가 보여집니다.
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-6. 습관 좋아요/좋아요 취소
<video src="https://github.com/ejonghwan/be/assets/53946298/1b435756-40ce-4728-9854-52bb957ef51a" width="500" muted  autoplay loop></video>
##### 기능 설명
* 습관을 좋아요 누르게 되면 내가 좋아하는 습관 목록에 추가합니다.
* debounce를 이용하여 1초 후에 요청을 보내기 때문에 여러번 눌러도 한번만 요청이 갑니다. 
* 기존 상태와 같다면 요청을 보내지 않음 처리했습니다. 
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-7. 습관 인증
<video src="https://github.com/ejonghwan/be/assets/53946298/9bc6865c-6b5f-4290-93f1-9f0190962116" width="500" muted  autoplay loop></video>
##### 기능 설명
* 인증사진이 있다면 등록 가능. 용량제한 처리(현재는 무료서버라 1MB). 용량 초과 시 사용자에게는 현재 파일의 용량을 보여줍니다.
* 인증제목과 내용을 간략하게 등록하면 글 상세페이지로 이동합니다.
* 달력에 누가 인증했는지 표시되며 내 잔디밭에 컬러로 표시됩니다.
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-8. 달력 기능
<video src="https://github.com/ejonghwan/be/assets/53946298/cd98b9a0-93fa-41e8-b086-73781e60ed9d" width="500" muted  autoplay loop></video>
##### 기능 설명
* 달력헤드, 달력바디, 달력 리뷰 상세로 분리하여 제작했고 어디든 변경되었을 때 다른 곳도 변경됩니다.
* 사용자가 인증했을 때 달력에 프로필 사진과 이름 표시 됩니다.
* 인증된 날짜가 연결 된다면 붉은 라인이 연결되게 표시 됩니다.
* 처음 로드 시 초기값은 오늘로 설정 됩니다.
  
&nbsp;
&nbsp;
&nbsp;
   

### 4-9. 글 좋아요, 수정, 삭제, 댓글 작성, 댓글 좋아요 
<video src="https://github.com/ejonghwan/be/assets/53946298/d388a486-6ae8-42e7-8cf3-043c8e8afce4" width="500" muted  autoplay loop></video>
##### 기능 설명
* 글 좋아요/취소, 댓글 좋아요/취소는 debounce를 이용하여 이벤트가 발생하고 1초 후에 요청을 보내기 때문에 여러번 눌러도 한번만 요청이 갑니다. 이전 상태와 같다면 요청 보내지 않습니다.  
* 글 수정할 때 변경되지 않은 데이터는 요청보내지 않습니다. 
* 댓글을 작성하면 최근 순으로 작성이 됩니다. 
* 자신이 작성한 댓글 우측에는 수정과 삭제할 수 있는 더보기 아이콘이 있습니다.
* 인증글을 삭제하면 달력과 잔디에서 삭제됩니다.
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-10. 대댓글 생성, 수정, 삭제
<video src="https://github.com/ejonghwan/be/assets/53946298/5d6b4f29-de9f-4c54-bfbb-589d84eca9c2" width="500" muted  autoplay loop></video>
##### 기능 설명
* 대댓글은 생성된 순서대로 보여집니다.
* 대댓글에 답글을 달면 타겟 댓글 사용자의 이름이 앞에 적힙니다. (@사용자)
* 대댓글 좋아요/취소는 debounce를 이용하여 이벤트가 발생하고 1초 후에 요청을 보내기 때문에 여러번 눌러도 한번만 요청이 갑니다. 이전 상태와 같다면 요청 보내지 않습니다.  
* 본인이 작성한 대댓글에는 우측에 수정과 삭제가 가능한 더보기 아이콘이 있습니다.
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-11. 습관 탈퇴
<video src="https://github.com/ejonghwan/be/assets/53946298/a663c456-e8b9-43ae-bcc5-7ffa19f7ffb3" width="500" muted  autoplay loop></video>
##### 기능 설명
* 습관 탈퇴 시 작성했던 글들은 그대로 남아있습니다. (재가입 시 다시 가능)
* 내가 진행하던 습관 목록에서 삭제됩니다. 
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-12. 습관 삭제
<video src="https://github.com/ejonghwan/be/assets/53946298/b425c272-31c9-45ff-977f-b873642ce763" width="500" muted  autoplay loop></video>
##### 기능 설명
* 습관 삭제 시 습관에 있던 유저, 인증글, 댓글, 대댓글, 좋아요가 모두 삭제됩니다.
* 생성자와 참여유저들의 진행하던 습관에서 삭제됩니다.
* 습관을 삭제하기 위해서는 아이디/습관명을 동일하게 적어서 실수로 삭제하는 일을 방지합니다.
  
&nbsp;
&nbsp;
&nbsp;
   

### 4-13. 습관 검색
<video src="https://github.com/ejonghwan/be/assets/53946298/f3691e72-98b7-4c38-b069-5312acc2cd85" width="500" muted  autoplay loop></video>
##### 기능 설명
* 습관을 검색하면 하단에 검색값이 최대 10개까지 표시됩니다.
* 검색값이 뜨면 우측에 해당 내용을 검색창으로 보낼 수 있는 버튼이 있습니다.
* 검색값을 클릭하거나 검색을 했을 때 내가 검색한 목록에 추가됩니다.
* 내가 검색했던 목록은 최신 10개만 보이고 우측에 삭제할 수 있는 버튼과 전체삭제 버튼이 있습니다.
* debounce를 사용해서 사용자가 더 이상 입력을 안할 때 검색요청이 갑니다.
* 검색이 완료되면 검색 페이지로 이동하는데 최대 10개씩 표시되고 하단 페이지네이션은 최대 10개까지 표시됩니다. 10개가 넘어가면 우측 더보기 버튼이 활성화 됩니다.
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-14. 카테고리 검색
<video src="https://github.com/ejonghwan/be/assets/53946298/6d1230f2-0961-4f16-8c4b-7d0c33aeeb44" width="500" muted  autoplay loop></video>
##### 기능 설명
* 카테고리를 누르면 같은 카테고리를 가진 습관이 검색됩니다.
     
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-15. 다크모드
<video src="https://github.com/ejonghwan/be/assets/53946298/aec228bf-5c5b-4cc2-9ff6-9e40bd112343" width="500" muted  autoplay loop></video>
##### 기능 설명
* 사이트 접속 시 비로그인 사용자는 시스템에 설정된 모드로 설정됩니다. 
* 회원가입 시 시스템 컬러가 DB에 저장되고 모드 변경 시 DB에 정보값이 변경됩니다.
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-16. 습관 목록
<video src="https://github.com/ejonghwan/be/assets/53946298/0ca4e0df-d5ba-4ec8-ac2d-aa8e0f4f4a60" width="500" muted  autoplay loop></video>
##### 기능 설명
* 습관 목록은 20개씩 보여집니다.
* 좋아요/참여인원이 높은 순으로 볼 수 있습니다.
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-17. 내 정보수정
<video src="https://github.com/ejonghwan/be/assets/53946298/e60d9e2f-2ac1-4d54-8343-cead4ddabb6f" width="500" muted  autoplay loop></video>
##### 기능 설명
* 회원 가입 시 기본 프로필이 제공되고 내 정보에서 프로필사진을 수정할 수 있습니다.
* 이메일 수정은 새로운 이메일 인증 후 변경이 가능합니다.
* 개인정보는 변경된 것만 변경이 됩니다.
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-18. 아이디 찾기 (이메일 인증)
<video src="https://github.com/ejonghwan/be/assets/53946298/5470fb6c-6d22-4c22-a2eb-5e050fec1981" width="500" muted  autoplay loop></video>
##### 기능 설명
* 이름과 이메일을 입력하면 가입된 메일로 인증번호가 전송되며 인증번호를 입력하면 아이디가 표시됩니다.
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-19. 아이디 찾기 (질문/답)
<video src="https://github.com/ejonghwan/be/assets/53946298/5a53d135-439a-4b23-be9f-83e55c2753e1" width="500" muted  autoplay loop></video>
##### 기능 설명
* 회원가입할 때 작성했던 질문과 답을 입력하면 아이디가 표시됩니다.
  
&nbsp;
&nbsp;
&nbsp;
   

   
### 4-20. 비밀번호 찾기
<video src="https://github.com/ejonghwan/be/assets/53946298/035b4176-4b95-4bba-9e4f-a08f00ec066d" width="500" muted  autoplay loop></video>
##### 기능 설명
* 아이디와 이메일을 받으면 가입 당시 적었던 메일로 인증번호가 전송됩니다. 인증번호를 입력하면 새 비밀번호 입력창이 표시되고 새로운 비밀번호를 입력할 수 있습니다.
  
&nbsp;
&nbsp;
&nbsp;
   

### 4-21. 서브 메뉴
<video src="https://github.com/ejonghwan/be/assets/53946298/79429ecb-72ba-4e80-800b-dc8c44e7371f" width="500" muted  autoplay loop></video>
##### 기능 설명
* 메뉴 UI는 헤더에 로고(홈), 검색, 습관목록, 습관만들기, 프로필 더보기를 메인에 두고 프로필 더보기를 클릭 하면 추가로 표시됩니다.
* 프로필 더보기를 클릭하면 내정보, 내글, 내댓글, 이메일변경, 비밀번호 변경, 내습관, 좋아하는 습관, 신청/초대 현황, 다크모드, 로그아웃 등이 표시됩니다. 
  * 내 정보 - 사용자 개인정보와 회원탈퇴
  * 내 글 - 내가 쓴 인증글들
  * 내 댓글 - 내가 썼던 댓글들
  * 이메일 변경 - 내 정보 페이지로 이동
  * 비밀번호 변경 - 비밀번호를 변경페이지로 이동
  * 내 습관 - 내가 신청한 습관 / 내가 만든 습관들을 한눈에 볼 수 있는 페이지
  * 좋아하는 습관 - 내가 좋아요 누른 습관들
  * 신청/초대 현황 - 내가 신청한 습관과 내 습관에 신청한 현황 표시
  * 다크모드 - 토글 형태로 다크모드 활성화/비활성화
  * 로그아웃 - 로그아웃

&nbsp;
&nbsp;
&nbsp;
   
### 4-22. 모바일 대응, 반응형 웹
<video src="https://github.com/ejonghwan/be/assets/53946298/aada290e-e74b-4e1f-b3dc-9255f04099ea" width="500" muted  autoplay loop></video>
##### 기능 설명
* 모바일과 태블릿 사용자를 위한 UI 제공



