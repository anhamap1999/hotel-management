import React from 'react';
import './styles.css'
export default function Login() {
   return <div class="wrapper fadeInDown">
   <div id="formContent">
     
     <div class="fadeIn first">
       <i className="far fa-user"></i>
     </div>
 
 
     <form>
       <input type="text" id="login" class="fadeIn second" name="login" placeholder="login" />
       <input type="text" id="password" class="fadeIn third" name="login" placeholder="password" />
       <input type="submit" class="fadeIn fourth" value="Log In" />
     </form>
 
     
     <div id="formFooter">
       <a class="underlineHover" href="#">Forgot Password?</a>
     </div>
 
   </div>
 </div>
}