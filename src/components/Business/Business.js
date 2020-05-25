import React from 'react';
import './Business.css';

class Business extends React.Component {
    constructor(props){
        super(props);
        this.handleAddressClick = this.handleAddressClick.bind(this);
        this.handleImageClick = this.handleImageClick.bind(this);
    }

    handleImageClick(){
        const {business} = this.props;
        window.open(business.url, "_blank");
    }

    handleAddressClick(){
        const {business} = this.props;
        const addressURL = `${business.address}+
                            ${business.city}+
                            ${business.state}+
                            ${business.zipCode}+
                            ${business.name}`;
        console.log(addressURL);
        const url = "https://www.google.com.sa/maps/search/"+addressURL;
        window.open(url, "_blank");
        
    }

    render(){
        const {business} = this.props;

        return (
            <div className="Business">
                <div className="image-container" onClick={this.handleImageClick}>
                    <img src= {business.imageSrc} alt=''/>
                </div>
                <h2>{business.name}</h2>
                <div className="Business-information">
                    <div className="Business-address" onClick={this.handleAddressClick}>
                    <p>{business.address}</p>
                    <p>{business.city}</p>
                    <p>{business.state} {business.zipCode}</p>
                    </div>
                    <div className="Business-reviews">
                    <h3>{business.category}</h3>
                    <h3 className="rating">{business.rating}</h3>
                    <p>{business.reviewCount}</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Business;