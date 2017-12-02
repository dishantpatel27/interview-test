// // Framework
// import React, { PureComponent } from "react";

// // Components
// import Page from "../components/Page.jsx";
// import Button from "../components/Button.jsx";
// import {Orders} from "../../api/orders/collection";
// import {Users} from "../../api/users/collection";
// import { Template } from "meteor/templating";
// import { error } from "util";

// class User extends PureComponent {
//   constructor(props){
//       super(props);
//       this.state={
//           userID: null
//       }
//   }
  
//   render() {
    
//     return (
//       <Page>
//         <div className="home-page">
//           <h2 className="title">User Info</h2>
//           <form className="userInfo">
//             <label>First Name:<input type="text" name="text" placeholder="First Name" /></label><br/>
//             <label>Last Name:<input type="text" name="text" placeholder="Last Name" /></label><br/>
//             <label>Address:<input type="text" name="text" placeholder="User Address" /></label><br/>
//             <label>Email:<input type="text" name="email" placeholder="User Email" /></label><br/>
//             <label>Password:<input type="text" name="password" placeholder="User Password" /></label><br/>
//             <input type="submit" value="Submit"/>
//           </form>

         
//         </div>
        
//       </Page>
      
//     );
//   }
// }
// Template.body.events({
//     'submit .userInfo'(event) {
//       // Prevent default browser form submit
      
//       event.preventDefault();
   
//       // Get value from form element
//       const target = event.target;
      
//       // Insert a user into the collection
//      Users.insert({
//          first_name: target[0].value,
//          last_name: target[1].value,
//          address: target[2].value,
//          email: target[3].value,
//          password: target[4].value
//      })
//      let userId = Users.find({"email": target[3].value});
//      var event = new Event('PassingUserId');
//      userId.forEach(result =>{
//         Product.dispatchEvent(event,{user_id: result._id});
//      })
//      debugger;
//      //console.log("user",Users.find().fetch());
//       // Clear form
//      for(let i = 0 ;i < 5 ; i++){
//          target[i].value = '';
//      }
//     },
//   });

// export default User;
