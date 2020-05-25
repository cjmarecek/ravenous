import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';


class BusinessList extends React.Component{
    render(){
        if(this.props.businesses === undefined){
            return (
                <p className="BusinessList">No match in the database</p>
            );
        }else{
            return (
                <div className="BusinessList" >
                    {
                        this.props.businesses.map(business => {
                            return <Business business={business} key={business.id}/>;
                        })
                    }
                </div>
            );
        }
        
    }
}

export default BusinessList;