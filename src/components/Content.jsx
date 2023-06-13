import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import TodoCard from './Todo/TodoCard'
import { useSelector } from 'react-redux'
import axios from 'axios'
import getConfig from '../utils/getConfig'
import PartiesGraph from './Dashboard/PartiesGraph'
import BarsChart from './ChartJS/BarsChart'
import Cargando from '../utils/Cargando'
import DonutChart from './Dashboard/DonutChart'
import VerticarBarChart from './Dashboard/VerticarBarChart'


const Content = () => {

const [dashboard, setDashboard] = useState()
const [preferedParties, setPreferedParties] = useState()


const {id} = useSelector(state=> state.userSlice)

    const getDashboard = ()=>{
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/dashboard/${id}`
      axios.get(URL, getConfig())
      .then(res => {
        setDashboard(res.data.dashboard[0])
        setPreferedParties(res.data.dashboard[0].preferedParty)
      })
      .catch()
  }

if(id !='Cargando'){
  useEffect(() => {
    getDashboard()
  }, [id])
}

  if(!dashboard)
  {
    return (
    <div className="content-wrapper" style={{minHeight: 536}}>
    <div className="content-header">
    <div className="container-fluid">
    <div className='loading' style={{height:"100px", marginBottom:"50px"}}>
  <Cargando escala='2'/>
  </div>
    </div>
    </div>
    </div>
    )
  }else {
  return (    
    <div className="content-wrapper" style={{minHeight: 536}}>
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">Panel Principal</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Panel</li>
            
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* /.content-header */}
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      {/* Small boxes (Stat box) */}
      <div className="row">
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-info">
            <div className="inner">
              <h3>{dashboard?.ciudadanos?.count}</h3>
              <p>Electores Asignados</p>
            </div>
            <div className="icon">
              <i className='ion'>
              <ion-icon name="people-outline"></ion-icon>
            </i>
            </div>
            <Link to='/mypeople' className="small-box-footer">Ver más <i className="fas fa-arrow-circle-right" /></Link>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-success">
            <div className="inner">
            
              <h3>{dashboard?.Encuestas?.percent_complete}<sup style={{fontSize: 20}}>%</sup></h3>
              <p>Completado</p>
            </div>
            <div className="icon">
              
              <i className="ion ion-stats-bars" />
            </div>
            <a href="#" className="small-box-footer">Ver más <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>{dashboard?.Activities}</h3>
              <p>Participación</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
            <a href="#" className="small-box-footer">Ver más <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>{dashboard?.Encuestas?.percent_incomplete}<sup style={{fontSize: 20}}>%</sup></h3>
              <p>Trabajo Pendiente</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph" />
            </div>
            <a href="#" className="small-box-footer">Ver más <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
      </div>
      {/* /.row */}
      {/* Main row */}
      <div className="row">
        {/* Left col */}
        <section className="col-lg-7 connectedSortable ui-sortable">
          {/* Custom tabs (Charts with tabs)*/}
         
          {/* /.card */}
          {/* DIRECT CHAT */}
          <div className="card direct-chat direct-chat-primary">
            <div className="card-header ui-sortable-handle" style={{cursor: 'move'}}>
              <h3 className="card-title">Direct Chat</h3>
              <div className="card-tools">
                <span title="3 New Messages" className="badge badge-primary">3</span>
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
                <button type="button" className="btn btn-tool" title="Contacts" data-widget="chat-pane-toggle">
                  <i className="fas fa-comments" />
                </button>
                <button type="button" className="btn btn-tool" data-card-widget="remove">
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              {/* Conversations are loaded here */}
              <div className="direct-chat-messages">
                {/* Message. Default to the left */}
                <div className="direct-chat-msg">
                  <div className="direct-chat-infos clearfix">
                    <span className="direct-chat-name float-left">Alexander Pierce</span>
                    <span className="direct-chat-timestamp float-right">23 Jan 2:00 pm</span>
                  </div>
                  {/* /.direct-chat-infos */}
                  <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user image" />
                  {/* /.direct-chat-img */}
                  <div className="direct-chat-text">
                    Is this template really for free? That's unbelievable!
                  </div>
                  {/* /.direct-chat-text */}
                </div>
                {/* /.direct-chat-msg */}
                {/* Message to the right */}
                <div className="direct-chat-msg right">
                  <div className="direct-chat-infos clearfix">
                    <span className="direct-chat-name float-right">Sarah Bullock</span>
                    <span className="direct-chat-timestamp float-left">23 Jan 2:05 pm</span>
                  </div>
                  {/* /.direct-chat-infos */}
                  <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user image" />
                  {/* /.direct-chat-img */}
                  <div className="direct-chat-text">
                    You better believe it!
                  </div>
                  {/* /.direct-chat-text */}
                </div>
                {/* /.direct-chat-msg */}
                {/* Message. Default to the left */}
                <div className="direct-chat-msg">
                  <div className="direct-chat-infos clearfix">
                    <span className="direct-chat-name float-left">Alexander Pierce</span>
                    <span className="direct-chat-timestamp float-right">23 Jan 5:37 pm</span>
                  </div>
                  {/* /.direct-chat-infos */}
                  <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user image" />
                  {/* /.direct-chat-img */}
                  <div className="direct-chat-text">
                    Working with AdminLTE on a great new app! Wanna join?
                  </div>
                  {/* /.direct-chat-text */}
                </div>
                {/* /.direct-chat-msg */}
                {/* Message to the right */}
                <div className="direct-chat-msg right">
                  <div className="direct-chat-infos clearfix">
                    <span className="direct-chat-name float-right">Sarah Bullock</span>
                    <span className="direct-chat-timestamp float-left">23 Jan 6:10 pm</span>
                  </div>
                  {/* /.direct-chat-infos */}
                  <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user image" />
                  {/* /.direct-chat-img */}
                  <div className="direct-chat-text">
                    I would love to.
                  </div>
                  {/* /.direct-chat-text */}
                </div>
                {/* /.direct-chat-msg */}
              </div>
              {/*/.direct-chat-messages*/}
              {/* Contacts are loaded here */}
              <div className="direct-chat-contacts">
                <ul className="contacts-list">
                  <li>
                    <a href="#">
                      <img className="contacts-list-img" src="dist/img/user1-128x128.jpg" alt="User Avatar" />
                      <div className="contacts-list-info">
                        <span className="contacts-list-name">
                          Count Dracula
                          <small className="contacts-list-date float-right">2/28/2015</small>
                        </span>
                        <span className="contacts-list-msg">How have you been? I was...</span>
                      </div>
                      {/* /.contacts-list-info */}
                    </a>
                  </li>
                  {/* End Contact Item */}
                  <li>
                    <a href="#">
                      <img className="contacts-list-img" src="dist/img/user7-128x128.jpg" alt="User Avatar" />
                      <div className="contacts-list-info">
                        <span className="contacts-list-name">
                          Sarah Doe
                          <small className="contacts-list-date float-right">2/23/2015</small>
                        </span>
                        <span className="contacts-list-msg">I will be waiting for...</span>
                      </div>
                      {/* /.contacts-list-info */}
                    </a>
                  </li>
                  {/* End Contact Item */}
                  <li>
                    <a href="#">
                      <img className="contacts-list-img" src="dist/img/user3-128x128.jpg" alt="User Avatar" />
                      <div className="contacts-list-info">
                        <span className="contacts-list-name">
                          Nadia Jolie
                          <small className="contacts-list-date float-right">2/20/2015</small>
                        </span>
                        <span className="contacts-list-msg">I'll call you back at...</span>
                      </div>
                      {/* /.contacts-list-info */}
                    </a>
                  </li>
                  {/* End Contact Item */}
                  <li>
                    <a href="#">
                      <img className="contacts-list-img" src="dist/img/user5-128x128.jpg" alt="User Avatar" />
                      <div className="contacts-list-info">
                        <span className="contacts-list-name">
                          Nora S. Vans
                          <small className="contacts-list-date float-right">2/10/2015</small>
                        </span>
                        <span className="contacts-list-msg">Where is your new...</span>
                      </div>
                      {/* /.contacts-list-info */}
                    </a>
                  </li>
                  {/* End Contact Item */}
                  <li>
                    <a href="#">
                      <img className="contacts-list-img" src="dist/img/user6-128x128.jpg" alt="User Avatar" />
                      <div className="contacts-list-info">
                        <span className="contacts-list-name">
                          John K.
                          <small className="contacts-list-date float-right">1/27/2015</small>
                        </span>
                        <span className="contacts-list-msg">Can I take a look at...</span>
                      </div>
                      {/* /.contacts-list-info */}
                    </a>
                  </li>
                  {/* End Contact Item */}
                  <li>
                    <a href="#">
                      <img className="contacts-list-img" src="dist/img/user8-128x128.jpg" alt="User Avatar" />
                      <div className="contacts-list-info">
                        <span className="contacts-list-name">
                          Kenneth M.
                          <small className="contacts-list-date float-right">1/4/2015</small>
                        </span>
                        <span className="contacts-list-msg">Never mind I found...</span>
                      </div>
                      {/* /.contacts-list-info */}
                    </a>
                  </li>
                  {/* End Contact Item */}
                </ul>
                {/* /.contacts-list */}
              </div>
              {/* /.direct-chat-pane */}
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <form action="#" method="post">
                <div className="input-group">
                  <input type="text" name="message" placeholder="Type Message ..." className="form-control" />
                  <span className="input-group-append">
                    <button type="button" className="btn btn-primary">Send</button>
                  </span>
                </div>
              </form>
            </div>
            {/* /.card-footer*/}
          </div>
          {/*/.direct-chat */}
          {/* TO DO List */}
          <div className="card" >
  <div className="card-header ui-sortable-handle">
<VerticarBarChart/>
  </div>
</div>

          <TodoCard/>
        
          {/* /.card */}
        </section>
        {/* /.Left col */}
        {/* right col (We are only adding the ID to make the widgets sortable)*/}
        <section className="col-lg-5 connectedSortable ui-sortable">
          <DonutChart preferedParties={preferedParties}/>
            {/* {preferedParties? <PartiesGraph preferedParties={preferedParties}/>: " "} */}
            <BarsChart/>
          <div className="card bg-gradient-success">
            <div className="card-header border-0 ui-sortable-handle" style={{cursor: 'move'}}>
              <h3 className="card-title">
                <i className="far fa-calendar-alt" />
                Calendar
              </h3>
              {/* tools card */}
              <div className="card-tools">
                {/* button with a dropdown */}
                <div className="btn-group">
                  <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" data-offset={-52}>
                    <i className="fas fa-bars" />
                  </button>
                  <div className="dropdown-menu" role="menu">
                    <a href="#" className="dropdown-item">Add new event</a>
                    <a href="#" className="dropdown-item">Clear events</a>
                    <div className="dropdown-divider" />
                    <a href="#" className="dropdown-item">View calendar</a>
                  </div>
                </div>
                <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
                <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
                  <i className="fas fa-times" />
                </button>
              </div>
              {/* /. tools */}
            </div>
            {/* /.card-header */}
            <div className="card-body pt-0">
              {/*The calendar */}
              <div id="calendar" style={{width: '100%'}}><div className="bootstrap-datetimepicker-widget usetwentyfour"><ul className="list-unstyled"><li className="show"><div className="datepicker"><div className="datepicker-days" style={{}}><table className="table table-sm"><thead><tr><th className="prev" data-action="previous"><span className="fa fa-chevron-left" title="Previous Month" /></th><th className="picker-switch" data-action="pickerSwitch" colSpan={5} title="Select Month">January 2023</th><th className="next" data-action="next"><span className="fa fa-chevron-right" title="Next Month" /></th></tr><tr><th className="dow">Su</th><th className="dow">Mo</th><th className="dow">Tu</th><th className="dow">We</th><th className="dow">Th</th><th className="dow">Fr</th><th className="dow">Sa</th></tr></thead><tbody><tr><td data-action="selectDay" data-day="01/01/2023" className="day weekend">1</td><td data-action="selectDay" data-day="01/02/2023" className="day">2</td><td data-action="selectDay" data-day="01/03/2023" className="day">3</td><td data-action="selectDay" data-day="01/04/2023" className="day">4</td><td data-action="selectDay" data-day="01/05/2023" className="day">5</td><td data-action="selectDay" data-day="01/06/2023" className="day">6</td><td data-action="selectDay" data-day="01/07/2023" className="day weekend">7</td></tr><tr><td data-action="selectDay" data-day="01/08/2023" className="day weekend">8</td><td data-action="selectDay" data-day="01/09/2023" className="day">9</td><td data-action="selectDay" data-day="01/10/2023" className="day">10</td><td data-action="selectDay" data-day="01/11/2023" className="day">11</td><td data-action="selectDay" data-day="01/12/2023" className="day">12</td><td data-action="selectDay" data-day="01/13/2023" className="day">13</td><td data-action="selectDay" data-day="01/14/2023" className="day weekend">14</td></tr><tr><td data-action="selectDay" data-day="01/15/2023" className="day weekend">15</td><td data-action="selectDay" data-day="01/16/2023" className="day">16</td><td data-action="selectDay" data-day="01/17/2023" className="day">17</td><td data-action="selectDay" data-day="01/18/2023" className="day">18</td><td data-action="selectDay" data-day="01/19/2023" className="day">19</td><td data-action="selectDay" data-day="01/20/2023" className="day">20</td><td data-action="selectDay" data-day="01/21/2023" className="day weekend">21</td></tr><tr><td data-action="selectDay" data-day="01/22/2023" className="day weekend">22</td><td data-action="selectDay" data-day="01/23/2023" className="day">23</td><td data-action="selectDay" data-day="01/24/2023" className="day">24</td><td data-action="selectDay" data-day="01/25/2023" className="day">25</td><td data-action="selectDay" data-day="01/26/2023" className="day active today">26</td><td data-action="selectDay" data-day="01/27/2023" className="day">27</td><td data-action="selectDay" data-day="01/28/2023" className="day weekend">28</td></tr><tr><td data-action="selectDay" data-day="01/29/2023" className="day weekend">29</td><td data-action="selectDay" data-day="01/30/2023" className="day">30</td><td data-action="selectDay" data-day="01/31/2023" className="day">31</td><td data-action="selectDay" data-day="02/01/2023" className="day new">1</td><td data-action="selectDay" data-day="02/02/2023" className="day new">2</td><td data-action="selectDay" data-day="02/03/2023" className="day new">3</td><td data-action="selectDay" data-day="02/04/2023" className="day new weekend">4</td></tr><tr><td data-action="selectDay" data-day="02/05/2023" className="day new weekend">5</td><td data-action="selectDay" data-day="02/06/2023" className="day new">6</td><td data-action="selectDay" data-day="02/07/2023" className="day new">7</td><td data-action="selectDay" data-day="02/08/2023" className="day new">8</td><td data-action="selectDay" data-day="02/09/2023" className="day new">9</td><td data-action="selectDay" data-day="02/10/2023" className="day new">10</td><td data-action="selectDay" data-day="02/11/2023" className="day new weekend">11</td></tr></tbody></table></div><div className="datepicker-months" style={{display: 'none'}}><table className="table-condensed"><thead><tr><th className="prev" data-action="previous"><span className="fa fa-chevron-left" title="Previous Year" /></th><th className="picker-switch" data-action="pickerSwitch" colSpan={5} title="Select Year">2023</th><th className="next" data-action="next"><span className="fa fa-chevron-right" title="Next Year" /></th></tr></thead><tbody><tr><td colSpan={7}><span data-action="selectMonth" className="month active">Jan</span><span data-action="selectMonth" className="month">Feb</span><span data-action="selectMonth" className="month">Mar</span><span data-action="selectMonth" className="month">Apr</span><span data-action="selectMonth" className="month">May</span><span data-action="selectMonth" className="month">Jun</span><span data-action="selectMonth" className="month">Jul</span><span data-action="selectMonth" className="month">Aug</span><span data-action="selectMonth" className="month">Sep</span><span data-action="selectMonth" className="month">Oct</span><span data-action="selectMonth" className="month">Nov</span><span data-action="selectMonth" className="month">Dec</span></td></tr></tbody></table></div><div className="datepicker-years" style={{display: 'none'}}><table className="table-condensed"><thead><tr><th className="prev" data-action="previous"><span className="fa fa-chevron-left" title="Previous Decade" /></th><th className="picker-switch" data-action="pickerSwitch" colSpan={5} title="Select Decade">2020-2029</th><th className="next" data-action="next"><span className="fa fa-chevron-right" title="Next Decade" /></th></tr></thead><tbody><tr><td colSpan={7}><span data-action="selectYear" className="year old">2019</span><span data-action="selectYear" className="year">2020</span><span data-action="selectYear" className="year">2021</span><span data-action="selectYear" className="year">2022</span><span data-action="selectYear" className="year active">2023</span><span data-action="selectYear" className="year">2024</span><span data-action="selectYear" className="year">2025</span><span data-action="selectYear" className="year">2026</span><span data-action="selectYear" className="year">2027</span><span data-action="selectYear" className="year">2028</span><span data-action="selectYear" className="year">2029</span><span data-action="selectYear" className="year old">2030</span></td></tr></tbody></table></div><div className="datepicker-decades" style={{display: 'none'}}><table className="table-condensed"><thead><tr><th className="prev" data-action="previous"><span className="fa fa-chevron-left" title="Previous Century" /></th><th className="picker-switch" data-action="pickerSwitch" colSpan={5}>2000-2090</th><th className="next" data-action="next"><span className="fa fa-chevron-right" title="Next Century" /></th></tr></thead><tbody><tr><td colSpan={7}><span data-action="selectDecade" className="decade old" data-selection={2006}>1990</span><span data-action="selectDecade" className="decade" data-selection={2006}>2000</span><span data-action="selectDecade" className="decade" data-selection={2016}>2010</span><span data-action="selectDecade" className="decade active" data-selection={2026}>2020</span><span data-action="selectDecade" className="decade" data-selection={2036}>2030</span><span data-action="selectDecade" className="decade" data-selection={2046}>2040</span><span data-action="selectDecade" className="decade" data-selection={2056}>2050</span><span data-action="selectDecade" className="decade" data-selection={2066}>2060</span><span data-action="selectDecade" className="decade" data-selection={2076}>2070</span><span data-action="selectDecade" className="decade" data-selection={2086}>2080</span><span data-action="selectDecade" className="decade" data-selection={2096}>2090</span><span data-action="selectDecade" className="decade old" data-selection={2106}>2100</span></td></tr></tbody></table></div></div></li><li className="picker-switch accordion-toggle" /></ul></div></div>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </section>
        {/* right col */}
      </div>
      {/* /.row (main row) */}
    </div>{/* /.container-fluid */}
  </section>
  {/* /.content */}
</div>

  )
}
}

export default Content