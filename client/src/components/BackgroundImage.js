import React from "react"
import court from "../assets/court.jpg";


class BackgroundImage extends Component {
  render(){
    return(
      <div className="background-container">
      <img alt="" className="background-image" src={court} />
      </div>
    )
  }
}
