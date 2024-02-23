import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import Routing from "./routing";


const root = document.getElementById("root")
const rootElem = ReactDOM.createRoot(root)

rootElem.render(
    <React.StrictMode>
        <Routing />
    </React.StrictMode>)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
