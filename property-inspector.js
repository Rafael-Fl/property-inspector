const axios = require("axios");
const URL = 'https://rentalscape-sidekick.dev.deckard.technology/membrane/stroracle/ca-riverside-city_of_la_quinta/listings/str';

const AUTHTOKEN = ''; // Access Token
const IDTOKEN = ''; // Id Token must start with `Bearer `. For example 'Bearer 13234 ...'

/**
 * For each Listing this funtion counts the following:
 * Number of properties that are listed as Airbnbs, VRBOs (platform)
 * Number of properties that have STR licenses (strLicence)
 * Number of properties that do not have licences (strLicence)
 * Number of properties that are Live Now (live)
 * Number of unidentified listings (no apn)
 * Number of properties that have a rental period of STR < 29 days. (shortTermRental)
 * 
 * @param {*} listings List of Listings
 * @returns freceuncies object with all the counts
 */
function listingsInspector(listings) {
  
  // object to store the counts
  const frequencies = {
    platforms: {},
    strLicenseCount: 0,
    noStrLicenseCount: 0,
    liveCount: 0,
    unidentified: 0,
    lessThan29: 0,
    uniqueApn: 0,
    totalListings: 0,
  };
  const apnSet = new Set();
  //Traverse the listing 
  listings.forEach((listing) => {

    //Add apn to the set
    apnSet.add(listing.apn);

    //Access the platform property
    const platform = listing.platform;

    // Check if the platform is already in the count add it or increment the count
    frequencies.platforms[platform] = frequencies.platforms[platform] ? 
      frequencies.platforms[platform]+1 : 1
    
    // Count str License or else count no str license
    if (listing.strLicense) {
      frequencies.strLicenseCount++;
    } else {
      frequencies.noStrLicenseCount++;
    }
    // Count live, unidentified and short term rentals
    if (listing.live) frequencies.liveCount++;
    if (!listing.apn) frequencies.unidentified++;
    if (listing.shortTermRental) frequencies.lessThan29++;
  });

  frequencies.uniqueApn = apnSet.size;
  frequencies.totalListings = listings.length;
  
  return frequencies;

}

// Set  the request 0
const req0 = axios.get(URL, {
  headers:{
    Authorization: AUTHTOKEN,
    'X-Amz-Security-Token': IDTOKEN,
  },
  
});

// Set the request 1
const req1 = axios.get(URL, {
  headers:{
    Authorization: AUTHTOKEN,
    'X-Amz-Security-Token': IDTOKEN,
  },
  params:{contToken:1}
});

// Set the request 2
const req2 = axios.get(URL, {
  headers:{
    Authorization: AUTHTOKEN,
    'X-Amz-Security-Token': IDTOKEN,
  },
  params:{contToken:2}
});
// Make all the requests
axios.all([
  req0,
  req1,
  req2,
])
// Wait for the responses
.then((responses) => {
  //Access the lsitings
  const l0 = responses[0].data.listings.listings;
  const l1 = responses[1].data.listings.listings;
  const l2 = responses[2].data.listings.listings;
  // Concatenate the lsitings
  const listings = [...l0, ...l1, ...l2];
  // Pritn to console the counts
  console.log(listingsInspector(listings));
}).catch((err) => {
    console.log('err', err.message);
});
