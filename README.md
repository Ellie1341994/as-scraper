# AS Scraper
## Description
The Scraper will take two row numbers from the command line using a simple hack and will use this input
to select two random seats on the rows at https://static.gordiansoftware.com/
then take a screenshot of how it looks right after

## Usage
```
npm install
```
Add the following code to cypress.json were "..." should be the page where the test will take place
```
{
  "env": {
    "page": ...
  }
}
```
then execute the test with the following command (you can also add "page=<urlString>" below instead of configuring the code above)

```
 npm run cypress:testSeats -- -e first_seat=<seatNumber>,second_seat=<seatNumber>
```
where seatNumber is a positive integer between 18-29 31-45 and 50-60

## Example
```
 npm run cypress:testSeats -- -e first_seat=31,second_seat=18,page=https://static.gordiansoftware.com/
```
