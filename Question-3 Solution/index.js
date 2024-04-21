







const perPage = 7;
let currentPage = 1;
let filteredList = [];

let timer;
let FinalcafeList ;




function renderTable(pageNumber) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    const startIndex = (pageNumber - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currentPageData = filteredList.slice(startIndex, 1);
    console.log(currentPageData)
    currentPageData.forEach(cafe => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cafe.name}</td>
            <td>${cafe.location.street_no}</td>
            <td>${cafe.location.locality}</td>
        `;
        tableBody.appendChild(row);
    });
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(filteredList.length / perPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('span');
        pageLink.textContent = i;
        pageLink.addEventListener('click', () => {
            currentPage = i;
            renderTable(currentPage);
            renderPagination();
        });
        pagination.appendChild(pageLink);
    }
}




function filterList() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase(); 
    const filteredList = FinalcafeList.filter(cafe => {
        const nameMatch = cafe.name.toLowerCase().indexOf(searchValue) !== -1;
        const streetMatch = cafe.location.street_no.toLowerCase().indexOf(searchValue) !== -1;
        const localityMatch = cafe.location.locality.toLowerCase().indexOf(searchValue) !== -1;
   
        return nameMatch || streetMatch || localityMatch;
    });

    const table = document.getElementById("cafeTable");
    if (filteredList.length === 0) {
        table.style.display = "none";
        document.getElementById("noCafeMessage").style.display = "block";
    } else {
        table.style.display = "table";
        document.getElementById("noCafeMessage").style.display = "none";
    }




    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    filteredList.forEach(cafe => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cafe.name}</td>
            <td>${cafe.location.street_no}</td>
            <td style="flex:1">${cafe.location.locality}</td>
            <td class="icon-class"><a href="https://www.google.com/maps?q=${cafe.location.lat},${cafe.location.long}" target="_blank"><i class="fas fa-map-marker-alt"></i></a></td>
        `;
        tableBody.appendChild(row);
    });

   
}



document.addEventListener('DOMContentLoaded', async function() {
    await fetchCafeListData();
    filterList()
});


document.getElementById("searchInput").addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(function() {
        filterList();
    }, 1000);
});


async function fetchCafeListData() {
    

    const PlacesResponse = await fetch("https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json")
    const Placesdata  =await PlacesResponse.json();

    const PlaceMap = MappingPlaces(Placesdata.places);
    console.log(PlaceMap)

 const CafeResponse = await fetch("https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json")
 const Cafedata  =await CafeResponse.json();

    const cafeList = Cafedata.cafes.map((ele)=>{

        
        return {name:ele.name,location:PlaceMap[ele.location_id] }
    })
FinalcafeList = cafeList;
    console.log(FinalcafeList)
   
}



const MappingPlaces=(Placesdata)=>
{

    const PlaceMap={};


   Placesdata.forEach(element => {
    
            if(!PlaceMap[element?.id])
            {
                PlaceMap[element?.id]= element;
            }



   });


   return PlaceMap;


}




