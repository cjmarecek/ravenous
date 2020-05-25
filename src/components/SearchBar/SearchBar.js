import React from 'react';
import './SearchBar.css';
import PlacesAutocomplete from 'react-places-autocomplete';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            term: '',
            address: '' ,
            sortBy: 'best_match',
            
        };
        
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };

        this.handleSortByChange = this.handleSortByChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }

    getSortByClass(sortByOption){
        return (this.state.sortBy === sortByOption) ? 'active' : '';
    }

    renderSortByOptions(){
        return Object.keys(this.sortByOptions).map(sortByOption =>{
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li  key={sortByOptionValue}
                        className={this.getSortByClass(sortByOptionValue)}
                        onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
                        >{sortByOption}</li>;
        });
    }

    handleSortByChange(sortByOption){
        this.setState({sortBy: sortByOption});
    }

    handleTermChange(event){
        this.setState({term: event.target.value});
    }

    handleLocationChange(event){
        this.setState({location: event.target.value});
    }

    handleSearch(event){
        this.props.searchYelp(
            this.state.term, 
            this.state.address, 
            this.state.sortBy
        );
        // event.preventDefault();
    }
    keyPressed(event) {
        if (event.key === "Enter") {
          this.handleSearch(event);
        }
    }
    handleChange = address => {
      this.setState({ address });
      console.log(address);
    };
   
    handleSelect = address => {
      this.setState({ address });
      console.log(address);
      this.handleSearch(address);
    };
    
    render(){
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options"  
                     onClick={this.handleSearch} >
                    <ul>
                        {
                            this.renderSortByOptions()
                        }
                    </ul>
                </div>

                <div className="SearchBar-fields">
                    <input  placeholder="Search Businesses"
                            onChange={this.handleTermChange}
                            onKeyPress={this.keyPressed} />
                    <PlacesAutocomplete
                      value={this.state.address}
                      onChange={this.handleChange}
                      onSelect={this.handleSelect}
                      onKeyPress={this.keyPressed}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                          <input 
                            
                            {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input',
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                              const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                              // inline style for demonstration purpose
                              const style = suggestion.active
                                ? { backgroundColor: '#F2F2CF', cursor: 'pointer' }
                                : { backgroundColor: '#fafafa', cursor: 'pointer' };
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                    
                </div>

                <div className="SearchBar-submit"
                     onClick={this.handleSearch}
                     onKeyPress={this.keyPressed} >
                    <a>Let's Go</a>
                </div>
            </div>
        );
    }
}
export default SearchBar;