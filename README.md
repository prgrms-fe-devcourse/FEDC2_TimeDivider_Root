# 시간 분배기

## 커밋 컨벤션
prefix | 설명 | 추가 설명
-- | -- | --
feat | 기능추가/수정/삭제 | 제품 코드 수정 발생
refactor | 리팩토링 | 제품 코드 수정 발생
fix | 버그 수정 | 제품 코드 수정 발생
docs | 문서 추가, 수정, 삭제 | 코드 수정 없음
style | 스타일 수정 | 제품 코드 수정 발생
chore | 그 외 모든 수정 | 유형이 혼재된 경우, 되도록이면 커밋 분리. 분리가 어려울 경우 위 순서 상 상위 항목의 유형으로 작성
 
## 브랜치
### protected branch
- main : 기준이 되는 브랜치로 제품을 배포하는 브랜치 입니다.
- develop : 개발 브랜치로 개발자들이 이 브랜치를 기준으로 각자 작업한 기능들을 합(Merge)칩니다.
- release : 배포를 위해 master 브랜치로 보내기 전에 먼저 QA(품질검사)를 하기위한 브랜치 입니다.
### prefix branch
아래의 단어를 prefix로 사용합니다. 예시) feature-timer, hotfix-tokenRevealed
- feature : 단위 기능을 개발하는 브랜치로 기능 개발이 완료되면 develop 브랜치에 합칩니다.
- hotfix : master 브랜치로 배포를 했는데 버그가 생겼을 떄 긴급 수정하는 브랜치 입니다.
