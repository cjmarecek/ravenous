const apiKey = '8DMSS9ULEIErYdIya9WPHb_8w8WpGxAYwRmHSgXhfF3k7hoH7ifuBhVHDFYuCeMxdh68NWP_P4ZJ-QU4JFRmBxeg2D5WXpZXNhXZ_cWTUBTuKTz7XSrOy2nJ7SaVXXYx';

const Yelp = {
    async search(term, location, sortBy){
        const path = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
        const response = await fetch(path, { headers: { Authorization: `Bearer ${apiKey}` } });
        const jsonResponse = await response.json();
        if (jsonResponse.businesses) {
            return jsonResponse.businesses.map(business => {
                const oneBusiness = {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1 + business.location.address2 + business.location.address3,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories.title,
                    rating: business.rating,
                    reviewCount: business.review_count,
                    url: business.url
                };
                return oneBusiness;
            });
        } else {
            return 
        }  
    }
};

export default Yelp;