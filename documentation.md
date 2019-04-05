
# Boba Places

---

Name: Iris Hu

Date: 4/4/19

Project Topic: Places where you can get boba

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: Name                `Type: String`
- `Field 2`: City                `Type: String`
- `Field 3`: State               `Type: String`
- `Field 4`: Rating              `Type: Number`
- `Field 5`: Milk Tea Flavors    `Type: [String]`

Schema: 
```javascript
{
   name: String,
   city: String,
   state: String,
   rating: Number,
   flavors: [String]
}
```

### 2. Add New Data

HTML form route: `/AddNewBoba`

POST endpoint route: `/api/AddNewBoba`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/AddNewBoba',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       name: 'Kung Fu Tea',
       city: 'College Park',
       state: 'Maryland',
       rating: 3.5,
       flavors: ['Kung Fu', 'Green', 'Oolong', 'Taro', 'Rosehip']
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getBobaPlaces`

### 4. Search Data

Search Field: name

### 5. Navigation Pages

Navigation Filters
1. College Park Boba -> `/CollegeParkBoba`
2. Random Boba -> `/RandomBoba`
3. Best Boba -> `/BestBoba`
4. Alphabetical Boba -> `/AlphabeticalBoba`
5. Select A City -> `/SelectCity`

