/**
=========================================================
* Soft UI Dashboard React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import axios from "axios";
import { render } from "react-dom";

// Data

// function Emails() {
//   let i = 0;
//   const [menu, setMenu] = useState(null);

//   const openMenu = ({ currentTarget }) => setMenu(currentTarget);
//   const closeMenu = () => setMenu(null);

//   const arr = [];
//   function showEmails() {
//     axios
//       .get("http://localhost:5000/emails")
//       .then((response) => {
//         console.log(sessionStorage.getItem("gmailLoggedIn"));
//         for (i = 0; i < response.data.total; i += 1) {
//           arr.push(
//             <Card style={{ backgroundColor: "#F2F2F2", margin: "5px 10px 1px 10px" }}>
//               <p1>From Snippet Email Time</p1>
//             </Card>
//           );
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   function arrayShow() {
//     render(console.log(arr), { arr });
//   }

//   const renderMenu = (
//     <Menu
//       id="simple-menu"
//       anchorEl={menu}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "left",
//       }}
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={Boolean(menu)}
//       onClose={closeMenu}
//     >
//       <MenuItem onClick={closeMenu}>Action</MenuItem>
//       <MenuItem onClick={closeMenu}>Another action</MenuItem>
//       <MenuItem onClick={closeMenu}>Something else</MenuItem>
//     </Menu>
//   );
//   return (
//     <Card>
//       <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
//         <MDBox>
//           <MDTypography variant="h6" gutterBottom>
//             Emails
//           </MDTypography>
//         </MDBox>
//         <MDBox color="text" px={2}>
//           <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
//             more_vert
//           </Icon>
//         </MDBox>
//         {renderMenu}
//       </MDBox>
//       {arr}
//       <button type="button" onClick={showEmails}>
//         Show Emails
//       </button>
//       <button type="button" onClick={arrayShow}>
//         Show Emails
//       </button>
//     </Card>
//   );
// }

// export default Emails;


export default class Emails extends Component {
  constructor() {
    super();
    this.state = {
      news: "Not yet got"
    };
  }

  callAPI() {
    fetch("/newsAPI")
      .then(res => res.text())
      .then(res => this.setState({
        news: JSON.parse(res).allArticles
      }))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    var arr = [];
    for (var i = 0; i < this.state.news.length; i++) {
      var image = 'url("' + this.state.news[i].urlToImage + '")';
      var extLink = this.state.news[i].url;
      arr.push(
        <a href={extLink} style={{ textDecorationLine: 'none', color: "white" }}>
          <div className="row gradient-custom-boxes" style={{ height: '10vh', margin: '.5% 1% 1% 1%', borderRadius: '5px' }}>
            <div className="col-sm-2" style={{ paddingTop: '1%', paddingBottom: '1%' }}>
              <div className="card" style={{ height: '100%', backgroundSize: 'cover', backgroundImage: image }} />
            </div>
            <div className="col-sm-10" style={{ height: '100%' }}>
              <div className="row" style={{ height: '25%', marginTop: '10px', overflow: 'hidden' }}>
                <div className="col-sm-12 all-text">
                  <a target="_blank" rel="noopener noreferrer" href={extLink} style={{ textDecoration: "none", color: "white" }}><p1 style={{ fontWeight: 'bold' }}>{this.state.news[i].title}</p1></a>
                </div>
              </div>
              <div className="row" style={{ height: '65%', overflow: 'hidden' }}>
                <div className="col-sm-12">
                  <p className="max-lines all-text">{this.state.news[i].description}</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      );
    }
    return (
      <div id="newsContent" style={{ fontSize: '1.6vh' }}>
        {arr}
        <button type="submit" style={{ border: 'none', borderRadius: '5px', margin: '.5% 1% 1% 1%', backgroundColor: '#808085' }} onClick={() => listen(this.state)}>
          {/* <svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
</svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={30} fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16">
            <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
            <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z" />
          </svg> Listen
        </button>
        <button type="submit" style={{ border: 'none', borderRadius: '5px', margin: '.5% 1% 1% 1%', backgroundColor: '#808085' }} onClick={stop}>
          {/* <svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
</svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={30} fill="currentColor" class="bi bi-stop" viewBox="0 0 16 16">
            <path d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z" />
          </svg> Stop
        </button>
      </div>
    );
  }
}
