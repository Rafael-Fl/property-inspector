const axios = require("axios");
const URL = 'https://rentalscape-sidekick.dev.deckard.technology/membrane/stroracle/ca-riverside-city_of_la_quinta/listings/str';
<<<<<<< Updated upstream

const AUTHTOKEN = ''; // Access Token
const IDTOKEN = ''; // Id Token must start with `Bearer `. For example 'Bearer 13234 ...'
=======
const AUTHTOKEN = 'eyJraWQiOiI4bGNrVHlUTlZTMHR6NnFjM09kQ0ZSb3M1WjNkekN2Y1wvblFjbUtpeVlIZz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4MjNjMWE0YS05ZDYyLTRjNGQtYTc2My03MTMxN2ZlZmI4YjgiLCJldmVudF9pZCI6IjU2MzIzMGQ2LTM4OGItNDkwZi05MjlmLTE2ZDIyNGRmYTc5YSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDk4OTEwOTEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX3VQYnAwdTIxcSIsImV4cCI6MTYxMDA1MTExNSwiaWF0IjoxNjEwMDQ3NTE1LCJqdGkiOiIwZjI4OGFjMy02YWViLTQ2MDMtODJlOS01OWUwY2JkNzg5MTQiLCJjbGllbnRfaWQiOiIzNTJxZWNzamY2OHJsMjhvcHA3aWYyZDZqNSIsInVzZXJuYW1lIjoicmFmYWVsLmZsb3Jlc0BkZWNrYXJkLmNvbSJ9.BdlatsEwqGt-m28Rl-9KIWihDres2KkhLz-lapqVMpUQ55SoHDNc9CpQVEpapKocgvDo71HPbmcC3Y3LsxL_6pVRlXNi0klalScQg03PL09gBmMNiitKUKLKS51o61NkrwuoNc81UdtgYOeCrEvXQNhdDFV7NPVIMZPzINHO3GjlKOggcyjoSPcclherrcsJGrv9HKXQbMjWV61c0pgL5RuvPMwMSaILGNLYQYtrn6iTCc5R4EbS8vfpc2d8XvP8ij3UxW3VMolOdWaKA3ErRSzGyROtC7PXQP89oUMOuyHgUU0VQ4e-7IVDrXegWiYJl7T6vzc4kZX6QjthRZSc2g';
const IDTOKEN = 'Bearer eyJraWQiOiJOY1laRm5YUE1KMUhWcTlGNW1FM3B0d09DRVA5a1dIUWZTOUJOUEJib0NZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4MjNjMWE0YS05ZDYyLTRjNGQtYTc2My03MTMxN2ZlZmI4YjgiLCJhdWQiOiIzNTJxZWNzamY2OHJsMjhvcHA3aWYyZDZqNSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjU2MzIzMGQ2LTM4OGItNDkwZi05MjlmLTE2ZDIyNGRmYTc5YSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA5ODkxMDkxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl91UGJwMHUyMXEiLCJjb2duaXRvOnVzZXJuYW1lIjoicmFmYWVsLmZsb3Jlc0BkZWNrYXJkLmNvbSIsImV4cCI6MTYxMDA1MTExNSwiaWF0IjoxNjEwMDQ3NTE1LCJlbWFpbCI6InJhZmFlbC5mbG9yZXNAZGVja2FyZC5jb20ifQ.f_1wepvKBPasR_Bh9oh2-UTxRGCvUor66K569idWQzjR5oyR0Jb6HdFz10A8kD31M8inBq3K3-RTtc9YaZ-61WHIGyxJwuhjjWC-FkchkalJQD1mr32AD8B7jRxjxM8cDrurZrdqywAt0NTmsmivnPJHtzxns7cM2auKodtANxC7r4ShzprgZriz9YLJC0nDP79i36MIeZmZwW2HKRazhxH58RZyd70X-qlUwULjlgUzZsxXrIPPOHczLKVaNqQHnNciVXVU47lliKdUOiT0_fMAbjMFaWs9geHUvmrHoMdNWbOiinL_fE3vh4rbomVIpSZxKd3-4JttIvAFLwstDw';
>>>>>>> Stashed changes

/**
 * For each Listing this funtion counts the following:
 * Number of Listings that have STR licenses (strLicence)
 * Number of Listings that have STR licenses (strLicence)
 * Number of Listings that are listed as Airbnbs, VRBOs (platform)
 * Number of Listings that do not have licences (strLicence)
 * Number of Listings that are Live Now (live)
 * Number of unidentified listings (no apn)
 * Number of Listings that have a rental period of STR < 29 days. (shortTermRental)
 * 
 * @param {*} listings List of Listings
 * @returns freceuncies object with all the listings counts
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
/**
 * For each Listing this funtion counts the following:
 * Number of Properties that have STR licenses (strLicence)
 * Number of Properties that have STR licenses (strLicence)
 * Number of Properties that are listed as Airbnbs, VRBOs (platform)
 * Number of Properties that do not have licences (strLicence)
 * Number of Properties that are Live Now (live)
 * Number of unidentified Properties (no apn)
 * Number of Properties that have a rental period of STR < 29 days. (shortTermRental)
 * 
 * @param {*} listings List of Listings
 * @returns freceuncies object with all the counts
 */
function PropertiesCounting(listings) {
  // Object to store the counts
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
  const platformSets = {};
  const uniqueApnSet = new Set();
  

//Traverse on the listings
listings.forEach((listing) => {
  // Access the platform property
  const platform = listing.platform;

  // If a new platform is encountered create a new set else add the apn to the set
  platformSets[platform] = platformSets[platform] ? 
  platformSets[platform].add(listing.apn) : new Set().add(listing.apn);

  // if a new apn is encountered add it to the uniqueApnSet and run the filters
  // else do nothing
  if (!uniqueApnSet.has(listing.apn)) {
    uniqueApnSet.add(listing.apn)
    if (listing.strLicense) {
      frequencies.strLicenseCount++;
    } else {
      frequencies.noStrLicenseCount++;
    }
    // Count live, unidentified and short term rentals
    if (listing.live) frequencies.liveCount++;
    if (!listing.apn) frequencies.unidentified++;
    if (listing.shortTermRental) frequencies.lessThan29++;
  }

});
// find each platforms set size
for (const platform in platformSets) {
  frequencies.platforms[platform] = platformSets[platform].size;
}

frequencies.uniqueApn = uniqueApnSet.size;
frequencies.totalListings = listings.length;
return frequencies;
}


  if (process.argv.length != 3){
    console.log("Please use 'Node property-inspector listings' or 'Node property-inspector properties'");
    process.exit(0);
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


if (process.argv[2] == 'listings') {
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
    // Concatenate the listings
    const listings = [...l0, ...l1, ...l2];
    // Pritn to console the counts
    
    
    console.log(listingsInspector(listings));
  }).catch((err) => {
      console.log('err', err.message);
  });
}

if (process.argv[2] == 'properties') {
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
  // Concatenate the listings
  const listings = [...l0, ...l1, ...l2];
  // Pritn to console the counts
  
  
  console.log(PropertiesCounting(listings));
}).catch((err) => {
    console.log('err', err.message);
});
<<<<<<< Updated upstream
=======
}
>>>>>>> Stashed changes
