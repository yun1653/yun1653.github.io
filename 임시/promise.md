# 프로미스 공부

## 프로미스 반드시 알아야할 2가지 개념

1. **상태(state)**: 프로미스가 현재 실행되고 있는 중인지? 아니면 완료되어 성공했는지, 실패했는지 상태확인 하는 것
   - State: pending -> fulfilled or rejected (성공했거나, 실패했거나)
2. **프로듀서와 컨슈머**의 차이점을 아는 것 (Producer vs Consumer)

---

## 1.Producer

프로듀서입장(데이터 제공자 입장)의 개념에 대해 알아 봅시다.  
프로미스는 클래스이므로 new를 사용해서 만든다.

```javascript
const promise = new Promise(){}
```

Promise는 만들어지는 순간 바로 실행된다 매우 중요함.  
그래서 어떤 버튼이 눌려질때만 실행되는 것을 만들려면 Promise 사용을 유의해야 한다.  
★ When new Promise is created, the executer runs automatically.

프라미스 블록 내부에는 어떤 할일을 코딩하게 됩니다.  
동기적으로 처리하기에는 시간이 많이 걸리는 작업들을 이곳에서 처리한다. 예를들면 Network 작업, read file 등입니다.

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ellie");
  }, 2000);
});
```

이 프로미스는 어떤일을 2초정도 하다가 결국에는 일을 잘 마무리해서 resolve라는 콜백함수를 호출하면서 'ellie'라는 값을 전달해주는 그런 프로미스를 만들어 봤습니다.

---

## 2. Consumers: then, catch, finally

이제 위에서 프로듀서가 제공한 정보를 소비하는 소비자의 입장에서 생각해 보죠.  
프로듀서가 성공적으로 일을해서 데이터를 제공해줬을때 이것을 받아 먹는 소비자는 then 입니다.  
프로듀서가 일하다가 사고나서 일을 실패한 경우에도 예약한 소비자는 환불받아야 하기 때문에 이때의 소비자는 catch 입니다.
프로듀서가 성공하든 실패하든 상관없이 돈을 지불해주는 맘씨 착한 소비자는 finally 입니다.

```javascript
promise.then((value) => {
  console.log(value);
});
```

위 코드는 위에서 만들어둔 변수 promise를 이용해서 프라미스가 성공적으로 처리했다면(then) 처리한 값을 value로 받아서 어떤 일을 수행하는 코드입니다. value값은 ellie가 되겠죠.

```javascript
// 1. Porducer
const promise = new Promise((resolve, reject) => {
  console.log("doing heavy work -- something like network or reading files...");

  setTimeout(() => {
    //resolve('ellie');
    reject(new Error("no network"));
  }, 2000);
});

//2. Consumers: then, catch, finally
promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("finnaly");
  });
```

위의 예시는 프로듀서가 일에 실패한 경우인 reject 콜백함수가 호출된 경우입니다. 그렇게 되면 아래에서는 소비자 catch가 이를 받아서 처리하는데 프로듀서가 전달한 'no network'라는 에러 데이타를 catch의 error이라는 파라미터가 받아서 다음 일을 처리해 주는 것입니다.  
마지막 finnaly는 결과에 관계없이 무조건 실행되는 것입니다.

```
결과값
doing heavy work -- something like network or reading files...
Error: no network
finnaly
```

---

## 3.promise chaining

```javascript
//3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000); // 1 이라는 숫자를 전달
});

fetchNumber
  .then((num) => num * 2)
  .then((num1) => num1 * 3)
  .then((num2) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(num2 - 1);
      }, 1000);
    });
  })
  .then((num3) => console.log(num3));
```

프로미스 체이닝에 대해 알아보죠. then이 연속으로 연결되는 상황을 이해하는 것입니다.

1초 뒤에 1이라는 숫자를 리턴하는 프라미스를 fetchNumber라는 변수에 담아보죠.  
프로듀서가 전달한 1이라는 숫자를 받은 처음의 then은 num이라는 파라미터에 저장하고 2를 곱하여 결과값 2를 리턴합니다. 이 2를 받은 다음 then은 이것을 num1 파라미터에 담아서 3을 곱하고 결과값 6을 리턴합니다. 이 리턴된 6을 다음 then이 받아서 num2에 담아서 일을 하는데 이번에는 비동기적으로 일을 합니다. 예를 들면 6이라는 숫자를 다른 네트워크로 보내서 결과값을 받는 형태이죠. 여기서는 1초뒤에 6에서 1을 빼는 일을 하는 프라미스 프로듀서가 되고 결과값으로 5를 리턴합니다. 최종적으로 마지막 then이 이를 받아서 console에 출력해주는 것입니다. 결과값은 5가 되겠죠.

---

## 4.Error Handling

```javascript
//4. Error Handling
const gethen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`닭`), 1000);
  });
const getegg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${hen}=>달걀`), 1000);
  });
const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg}=>계란후라이`), 1000);
  });

gethen()
  .then((hen) => getegg(hen)) //.then(getegg) 와 같다.
  .then((egg) => cook(egg)) //.then(cook) 와 같다.
  .then((meal) => console.log(meal)); //.then(console.log)와 같다.
```

프라미스를 반환하는 3개의 재미있는 함수를 만들었습니다.  
gethen함수는 1초뒤에 "닭"이라는 데이타를 리턴합니다.  
getegg함수는 hen이라는 파라미터에 데이터를 받아서 1초뒤에 "hen 변수 => 달걀" 이라는 데이타를 리턴합니다.  
cook함수는 egg라는 파라미터에 데이터를 받아서 1초뒤에 "egg 변수 => 계란후라이" 라는 데이터를 리턴합니다.

이제 체이닝을 이용해서 위와 같이 then을 이용해서 실행해 봅니다.  
결과값 : 닭=>달걀=>계란후라이

그런데 만약 중간에 있는 getegg 함수에서 reject가 난다면, 아마도 아래의 then은 실행되지 않을 것입니다.

```javascript
/* const getegg = (hen)=> new Promise((resolve,reject)=>{
    setTimeout(() => resolve(`${hen}=>달걀`),1000);
}); */

const getegg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`error! ${hen}=>달걀`)), 1000);
  });
```

결과값: Uncaught (in promise) Error: error! 닭=>달걀  
위와 같이 콘솔창에 <u>에러 메세지</u>가 뜨면서 실행이 멈춥니다.

```javascript
/* const getegg = (hen)=> new Promise((resolve,reject)=>{
    setTimeout(() => resolve(`${hen}=>달걀`),1000);
}); */

const getegg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`error! ${hen}=>달걀`)), 1000);
  });

  gethen()
  .then(getegg)
  .then(cook)
  .then(console.log);
  .catch(console.log);  // catch가 위의 에러메세지를 받는다.
```

결과값: Error: error! 닭=>달걀  
위와 같이 catch를 사용하면 콘솔에러가 나지 않고 그냥 에러 처리를 할 수 있습니다.
