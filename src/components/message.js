// //import elements
// import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//
// // grab value from input and append it as a div
// // const Message = () => (
// //   <div className="chat-input">
// //     <input type="text" placeholder="type message" id="message-input" />
// //   </div>
// // );
// import { Layout, Menu, Icon, Input, Button } from "antd";
//
// module.exports.allUsers = () => {
//   return this.props.usersList.map(e => {
//     return (
//       <Link to={`${match.url}/${e.username}`}>
//         <Menu.Item key={e.id}>
//           <Icon type="user" />
//           <span className="nav-text">{e.username}</span>
//         </Menu.Item>
//       </Link>
//     );
//   });
// };
//
// const Topics = ({ match }) => (
//   <div>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>Rendering with React</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>Components</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//       </li>
//     </ul>
//
//     <Route path={`${match.url}/:topicId`} component={Topic} />
//     <Route
//       exact
//       path={match.url}
//       render={() => <h3>Please select a topic.</h3>}
//     />
//   </div>
// );
//
// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// );
//
// //export
// // export default Message;
