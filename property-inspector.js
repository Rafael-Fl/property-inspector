const axios = require("axios");
const URL = 'https://rentalscape-sidekick.dev.deckard.technology/membrane/stroracle/ca-riverside-city_of_la_quinta/listings/str';
const AUTHTOKEN = 'eyJraWQiOiI4bGNrVHlUTlZTMHR6NnFjM09kQ0ZSb3M1WjNkekN2Y1wvblFjbUtpeVlIZz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4MjNjMWE0YS05ZDYyLTRjNGQtYTc2My03MTMxN2ZlZmI4YjgiLCJldmVudF9pZCI6IjU2MzIzMGQ2LTM4OGItNDkwZi05MjlmLTE2ZDIyNGRmYTc5YSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDk4OTEwOTEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX3VQYnAwdTIxcSIsImV4cCI6MTYwOTk2NDc5MywiaWF0IjoxNjA5OTYxMTkzLCJqdGkiOiJjNjFiZTZmYi1jZDZkLTQyMjgtOWUyNi1hNDE1MWEyN2E1YWUiLCJjbGllbnRfaWQiOiIzNTJxZWNzamY2OHJsMjhvcHA3aWYyZDZqNSIsInVzZXJuYW1lIjoicmFmYWVsLmZsb3Jlc0BkZWNrYXJkLmNvbSJ9.c104bsZT2Yj_0GmrQQP7BCydku5Y8cNDufrIGmKDgitH3mmx4-Hlq7NGKmgaDkXlicidCKXnU28jmKMWbHh5JwKD7ExE_T_ar2hkdLhTtfMdbfqMC6LgfIIEHMwZeaNAJMjERjTj__3BofwuT_9ZY-MKQHGhehsSEToivKX02Q0kZM_UZ8KpnzSBIUshCG_t3bEwbU20G2x7vNivWezZRS6rSA_uUB6lTK6aIKcGDXUqdZXcTgz4iuAXzwolAEOYbkUVQOzNyJfn5cpgl0aXDxfS2ohMmNKcXb5JyRRTvGF3hgg9gnKFbrOu7NSSHaoVQxm8QQp_6j1KuN1_BbeE-A';
const IDTOKEN = 'Bearer eyJraWQiOiJOY1laRm5YUE1KMUhWcTlGNW1FM3B0d09DRVA5a1dIUWZTOUJOUEJib0NZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4MjNjMWE0YS05ZDYyLTRjNGQtYTc2My03MTMxN2ZlZmI4YjgiLCJhdWQiOiIzNTJxZWNzamY2OHJsMjhvcHA3aWYyZDZqNSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjU2MzIzMGQ2LTM4OGItNDkwZi05MjlmLTE2ZDIyNGRmYTc5YSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA5ODkxMDkxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl91UGJwMHUyMXEiLCJjb2duaXRvOnVzZXJuYW1lIjoicmFmYWVsLmZsb3Jlc0BkZWNrYXJkLmNvbSIsImV4cCI6MTYwOTk2NDc5MywiaWF0IjoxNjA5OTYxMTkzLCJlbWFpbCI6InJhZmFlbC5mbG9yZXNAZGVja2FyZC5jb20ifQ.XIYDRPZ1skpXSzBomeL7eMIGaod2B6gGuk_5IPzWGX8dDE7ffHgxyPs4vroLN1x9ONpVv2mYoW3EUaSR6Z0LVBjinz33gKmv5D8R2hEB3Dix3i41RfLYzz8_Q3xOVsQicqbC_rPViKgINiRk7ULiEk8CXl4CVk2fQr-AjUzMBJE_XWotwSZU4Mt7RFRPR_0J2eq2pVmvnKK9it8p6IPJulbII7pCURNQflUzu2eP020dcG7t5tob5DsO1JdwB4JTLrmmAFiWVBOs6FiCg9eNIDsIXpAt5u1a5KStY-HzJWWkv8rBzRE1uaHrkzPBu5RF8g2ZFMuSWWJD7wQ_A6GLBQ';

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