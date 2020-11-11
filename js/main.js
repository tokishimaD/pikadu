let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

menuToggle.addEventListener('click', function (event){
   event.preventDefault();
   menu.classList.toggle('visible');
})

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');


const listUsers = [
   {
      id: '01',
      email: 'svystuno.j@gmail.com',
      password: '12345',
      displayName: 'OxyJS'
   },
   {
      id: '02',
      email: '1Animeshnyk@gmail.com',
      password: '1234567',
      displayName: 'OksyJS'
   }
];

const setUsers = {
   user: null,
   logIn(email, password, handler) {
      const user = this.getUser(email);
      if(user && user.password === password){
         this.authorizedUser(user);
         handler();
      }
      else{
         alert('This user does not exist')
      }
   },
   logOut(){
      console.log('logOut')
   },
   signUp(email, password, handler) {
      if(!this.getUser(email)){
         const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
         listUsers.push(user);
         this.authorizedUser(user);
         handler();
      }
      else{
         alert('This email is already signed up')
      }
   },
   getUser(email){
      return listUsers.find((item) => {
         return item.email === email
      })
   },
   authorizedUser(user){
      this.user = user;
   }
};

const toggleAuthDom = () => {
   const user = setUsers.user;

   if(user) {
      loginElem.style.display = 'none';
      userElem.style.display = '';
      userNameElem.textContent = user.displayName;
   }
   else{
      loginElem.style.display = '';
      userElem.style.display = 'none';
   }
}

loginForm.addEventListener('submit', event => {
   event.preventDefault();

   const emailValue = emailInput.value;
   const passwordValue = passwordInput.value;

   setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
} );

loginSignup.addEventListener('click', event =>{
   event.preventDefault();

   const emailValue = emailInput.value;
   const passwordValue = passwordInput.value;

   setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
});

toggleAuthDom();

