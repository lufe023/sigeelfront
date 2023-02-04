import React from 'react'
import Aside from '../Aside'
import Footer from '../Footer'
import Header from '../Header'

const Me = () => {
  const first_name = localStorage.getItem('firstName')
  const last_name = localStorage.getItem('lastName')
  const picture = localStorage.getItem('picture')
  return (
    <div>
      <Header/>
      <Aside/>
    <div className="content-wrapper" >
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Profile</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">User Profile</li>
          </ol>
        </div>
      </div>
    </div>
  </section>
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="card card-primary card-outline">
            <div className="card-body box-profile">
              <div className="text-center">
                <img className="profile-user-img img-fluid img-circle" src="../../dist/img/user4-128x128.jpg" alt="User profile picture" />
              </div>
              <h3 className="profile-username text-center">{`${first_name} ${last_name}`}</h3>
              
              <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a>
            </div>
          </div>
         
        </div>
        <div className="col-md-9">
          <div className="card"> 
            <div className="card-header p-2">
              <ul className="nav nav-pills">
                <li className="nav-item"><a className="nav-link active" href="#activity" data-toggle="tab">Activity</a></li>
                <li className="nav-item"><a className="nav-link" href="#timeline" data-toggle="tab">Timeline</a></li>
                <li className="nav-item"><a className="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content">
                <div className="active tab-pane" id="activity">
                  <div className="post">
                    <div className="user-block">
                      <img className="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image" />
                      <span className="username">
                        <a href="#">Jonathan Burke Jr.</a>
                        <a href="#" className="float-right btn-tool"><i className="fas fa-times" /></a>
                      </span>
                      <span className="description">Shared publicly - 7:30 PM today</span>
                    </div>
                    <p>
                      Lorem ipsum represents a long-held tradition for designers,
                      typographers and the like. Some people hate it and argue for
                      its demise, but others ignore the hate as they create awesome
                      tools to help create filler text for everyone from bacon lovers
                      to Charlie Sheen fans.
                    </p>
                    <p>
                      <a href="#" className="link-black text-sm mr-2"><i className="fas fa-share mr-1" /> Share</a>
                      <a href="#" className="link-black text-sm"><i className="far fa-thumbs-up mr-1" /> Like</a>
                      <span className="float-right">
                        <a href="#" className="link-black text-sm">
                          <i className="far fa-comments mr-1" /> Comments (5)
                        </a>
                      </span>
                    </p>
                    <input className="form-control form-control-sm" type="text" placeholder="Type a comment" />
                  </div>
                  <div className="post clearfix">
                    <div className="user-block">
                      <img className="img-circle img-bordered-sm" src="../../dist/img/user7-128x128.jpg" alt="User Image" />
                      <span className="username">
                        <a href="#">Sarah Ross</a>
                        <a href="#" className="float-right btn-tool"><i className="fas fa-times" /></a>
                      </span>
                      <span className="description">Sent you a message - 3 days ago</span>
                    </div>
                    <p>
                      Lorem ipsum represents a long-held tradition for designers,
                      typographers and the like. Some people hate it and argue for
                      its demise, but others ignore the hate as they create awesome
                      tools to help create filler text for everyone from bacon lovers
                      to Charlie Sheen fans.
                    </p>
                    <form className="form-horizontal">
                      <div className="input-group input-group-sm mb-0">
                        <input className="form-control form-control-sm" placeholder="Response" />
                        <div className="input-group-append">
                          <button type="submit" className="btn btn-danger">Send</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="post">
                    <div className="user-block">
                      <img className="img-circle img-bordered-sm" src="../../dist/img/user6-128x128.jpg" alt="User Image" />
                      <span className="username">
                        <a href="#">Adam Jones</a>
                        <a href="#" className="float-right btn-tool"><i className="fas fa-times" /></a>
                      </span>
                      <span className="description">Posted 5 photos - 5 days ago</span>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-6">
                        <img className="img-fluid" src="../../dist/img/photo1.png" alt="Photo" />
                      </div>
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-6">
                            <img className="img-fluid mb-3" src="../../dist/img/photo2.png" alt="Photo" />
                            <img className="img-fluid" src="../../dist/img/photo3.jpg" alt="Photo" />
                          </div>
                          <div className="col-sm-6">
                            <img className="img-fluid mb-3" src="../../dist/img/photo4.jpg" alt="Photo" />
                            <img className="img-fluid" src="../../dist/img/photo1.png" alt="Photo" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>
                      <a href="#" className="link-black text-sm mr-2"><i className="fas fa-share mr-1" /> Share</a>
                      <a href="#" className="link-black text-sm"><i className="far fa-thumbs-up mr-1" /> Like</a>
                      <span className="float-right">
                        <a href="#" className="link-black text-sm">
                          <i className="far fa-comments mr-1" /> Comments (5)
                        </a>
                      </span>
                    </p>
                    <input className="form-control form-control-sm" type="text" placeholder="Type a comment" />
                  </div>
                </div>
                <div className="tab-pane" id="timeline">
                  <div className="timeline timeline-inverse">
                    <div className="time-label">
                      <span className="bg-danger">
                        10 Feb. 2014
                      </span>
                    </div>
                    <div>
                      <i className="fas fa-envelope bg-primary" />
                      <div className="timeline-item">
                        <span className="time"><i className="far fa-clock" /> 12:05</span>
                        <h3 className="timeline-header"><a href="#">Support Team</a> sent you an email</h3>
                        <div className="timeline-body">
                          Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                          weebly ning heekya handango imeem plugg dopplr jibjab, movity
                          jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                          quora plaxo ideeli hulu weebly balihoo...
                        </div>
                        <div className="timeline-footer">
                          <a href="#" className="btn btn-primary btn-sm">Read more</a>
                          <a href="#" className="btn btn-danger btn-sm">Delete</a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <i className="fas fa-user bg-info" />
                      <div className="timeline-item">
                        <span className="time"><i className="far fa-clock" /> 5 mins ago</span>
                        <h3 className="timeline-header border-0"><a href="#">Sarah Young</a> accepted your friend request
                        </h3>
                      </div>
                    </div>
                    <div>
                      <i className="fas fa-comments bg-warning" />
                      <div className="timeline-item">
                        <span className="time"><i className="far fa-clock" /> 27 mins ago</span>
                        <h3 className="timeline-header"><a href="#">Jay White</a> commented on your post</h3>
                        <div className="timeline-body">
                          Take me to your leader!
                          Switzerland is small and neutral!
                          We are more like Germany, ambitious and misunderstood!
                        </div>
                        <div className="timeline-footer">
                          <a href="#" className="btn btn-warning btn-flat btn-sm">View comment</a>
                        </div>
                      </div>
                    </div>
                    <div className="time-label">
                      <span className="bg-success">
                        3 Jan. 2014
                      </span>
                    </div>
                    <div>
                      <i className="fas fa-camera bg-purple" />
                      <div className="timeline-item">
                        <span className="time"><i className="far fa-clock" /> 2 days ago</span>
                        <h3 className="timeline-header"><a href="#">Mina Lee</a> uploaded new photos</h3>
                        <div className="timeline-body">
                          <img src="https://placehold.it/150x100" alt="..." />
                          <img src="https://placehold.it/150x100" alt="..." />
                          <img src="https://placehold.it/150x100" alt="..." />
                          <img src="https://placehold.it/150x100" alt="..." />
                        </div>
                      </div>
                    </div>
                    <div>
                      <i className="far fa-clock bg-gray" />
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="settings">
                  <form className="form-horizontal">
                    <div className="form-group row">
                      <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                      <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputName" placeholder="Name" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                      <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputName2" className="col-sm-2 col-form-label">Name</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputName2" placeholder="Name" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputExperience" className="col-sm-2 col-form-label">Experience</label>
                      <div className="col-sm-10">
                        <textarea className="form-control" id="inputExperience" placeholder="Experience" defaultValue={""} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Skills</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputSkills" placeholder="Skills" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="offset-sm-2 col-sm-10">
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" /> I agree to the <a href="#">terms and conditions</a>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="offset-sm-2 col-sm-10">
                        <button type="submit" className="btn btn-danger">Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  <Footer/>
</div>
  )
}

export default Me