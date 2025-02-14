import './dashboard.css';


export default function Dashboard() {
    console.log("logged in")
    return(
        <div id='db-dashboard-component'>
          <div id='db-content-container'>
            <h1 id='db-header'>Vans near me</h1>
            <div id='db-van-info-container'>
              <div id='db-van-list'>

              </div>
              <div id='db-map-container'>

              </div>
            </div>
          </div>
        </div>
    )   
}
