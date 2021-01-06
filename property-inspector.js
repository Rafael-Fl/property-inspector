const axios = require("axios");
const URL = 'https://rentalscape-sidekick.deckard.technology/membrane/stroracle/ca-placer/listings/str';
const AUTHTOKEN = 'eyJraWQiOiI4bGNrVHlUTlZTMHR6NnFjM09kQ0ZSb3M1WjNkekN2Y1wvblFjbUtpeVlIZz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4MjNjMWE0YS05ZDYyLTRjNGQtYTc2My03MTMxN2ZlZmI4YjgiLCJldmVudF9pZCI6ImY3N2Y4NTY1LTg0OGYtNDZkYi1iMjAxLWI5MGYzMjEyOWY0ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDk5MDE1NjcsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX3VQYnAwdTIxcSIsImV4cCI6MTYwOTkxMzI4NywiaWF0IjoxNjA5OTA5Njg3LCJqdGkiOiI0ZmM0MmQ0MC0zNDNkLTQyMDItYjdiNi1kMmFiNjNhYzI3YmUiLCJjbGllbnRfaWQiOiIzNTJxZWNzamY2OHJsMjhvcHA3aWYyZDZqNSIsInVzZXJuYW1lIjoicmFmYWVsLmZsb3Jlc0BkZWNrYXJkLmNvbSJ9.BrP07at0rnnBrK_ewntGJxoUJvyhd0Ai0W_H_E753Ypl-U1iBRmMxTdhokvpbUb7VH0qaYHx7kYr6sxCtpq68uw2r-FhMICkxTCbFa4fO2J4dK1-ZRQR6ILABih6j1zTsHcFGkHedZVtrPL4vB2oguox7bmQpvYG9cxsTXmCaJbCx4A9gaeaBWhv_OPfErV0rfVkp1EEl_YsCrCsbyRaMUPr8dLKuFRK4jQijXzO3p6k086a4D6kDHQBLww1Toy6ThfllmvSoFcAZc3-LchmwTsk_q4rHAMEXM187qld0rh5BZvPP0-EhGoRqqQQVHMbJobOxZ7MQI126YfJr1kjsA';
const IDTOKEN = 'Bearer eyJraWQiOiJOY1laRm5YUE1KMUhWcTlGNW1FM3B0d09DRVA5a1dIUWZTOUJOUEJib0NZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4MjNjMWE0YS05ZDYyLTRjNGQtYTc2My03MTMxN2ZlZmI4YjgiLCJhdWQiOiIzNTJxZWNzamY2OHJsMjhvcHA3aWYyZDZqNSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6ImY3N2Y4NTY1LTg0OGYtNDZkYi1iMjAxLWI5MGYzMjEyOWY0ZiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA5OTAxNTY3LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl91UGJwMHUyMXEiLCJjb2duaXRvOnVzZXJuYW1lIjoicmFmYWVsLmZsb3Jlc0BkZWNrYXJkLmNvbSIsImV4cCI6MTYwOTkxMzI4NywiaWF0IjoxNjA5OTA5Njg3LCJlbWFpbCI6InJhZmFlbC5mbG9yZXNAZGVja2FyZC5jb20ifQ.bHFoG0U9L41m8v4dltCMQFhcNR-R9FJaqGLc-SlFREz6YDAxxW_vh3g36VX22fr_AeshrV-7W5Tzsc7RD8B8-5h6W9FJaJTGsX6scKD8lqicSGTdyB3ghAbpBhhMpCUNfqlTXzkIXVvHbwXpAt2sXTDJ9M56fKVm1t3IN9TxhhXG-z5KUsZAo5orj2ggiPiB3HX0TikAOh2qUdQAe3JaZd9QMykrMO43BDdZkGKLR5jmb_0idmznsHAF5aj9ECQ1wxV1OAxmY6aYGxLpFOnr3UUmQaJ4aBifBTtW8SEcnn6o_vvntYOAv9xs8Wy3kUooF5S0Lzy713fUpONxq0BLLA';

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
  };

  //Traverse the listing 
  listings.forEach((listing) => {

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