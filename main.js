let check = document.querySelectorAll('input[type="checkbox"]');

check.forEach((ele) => {
    ele.style.display = 'none';
})
let mood = 'create';
let tmp;
//inputs
let text = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discounts');
let count = document.getElementById('count');
let category = document.getElementById('category');

//buttons
let search = document.getElementById('search');
let create = document.getElementById('create-btn');
let search1 = document.getElementById('search-1');
let search2 = document.getElementById('search-2');
let deleteAll = document.getElementById('delete-all');
let alert_2 = document.querySelector('.alert');

let total = document.querySelector('.total');
let all = document.querySelector('#all');
total.innerHTML = 'المجموع: '

function getTotal() {
    if (price.value != '') {
            let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
            if (result > 0) { 
                discount.onfocus = () => {
                    discount.style.boxShadow = '0px 0px 12px #444'
                } 
                discount.onblur = () => {
                    discount.style.boxShadow = 'none'
                }
                discount.style.boxShadow = 'none'
                total.innerHTML = `المجموع: ${result}`
                total.className = 'bg-green-700 total rounded-lg text-white';
                total.style.background = 'green'
                alert_2.classList.remove('open');       
            }else {
                if (price.value > 0) {
                    discount.style.boxShadow = '0px 0px 8px 0px red'
                    discount.onfocus = () => {
                        discount.style.boxShadow = '0px 0px 8px 0px red'
                    } 
                    discount.onblur = () => {
                        discount.style.boxShadow = 'none'
                    }
                    alert_2.classList.add('open');
                    setTimeout(() => {
                        alert_2.classList.remove('open');
                    }, 5000);
                }
            }    
    }else if (price.value == '') {
        total.innerHTML = 'المجموع: ';
        total.className = 'total rounded-lg dark:bg-red-500 dark:text-white'
        total.style.background = 'red'
    }
  }


price.oninput = getTotal
taxes.oninput = getTotal
ads.oninput = getTotal
discount.oninput = getTotal


//create Product and save in local storage

let arrProduct = [];

if (localStorage.getItem('product') != null) {
    arrProduct = JSON.parse(localStorage.getItem('product'));
}else {
    arrProduct = [];
}
create.onclick = function() {
    let objectProduct = {
        title: text.value,
        price: price.value,
        total: total.innerHTML,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value,
    }
    if (mood == 'create') {    
        if (objectProduct.count > 1) {
            for (let j = 0; j < count.value; j++) {
                arrProduct.push(objectProduct);
            }
        }else {
            arrProduct.push(objectProduct);
        }
    }else {
        arrProduct[tmp] = objectProduct;
        mood = 'create';
        create.innerHTML = 'انشاء';
        count.style.display = 'block';
    }
        localStorage.setItem('product', JSON.stringify(arrProduct));
    
        clearInputs();
    
        addProduct(arrProduct);
}

function clearInputs() {
    text.value = '';
    total.innerHTML = 'المجموع: ';
    total.className = 'total rounded-lg dark:bg-red-500 dark:text-white'
    total.style.background = 'red'
    ads.value = '';
    discount.value = '';
    price.value = '';
    count.value = '';
    category.value = '';
    taxes.value = '';
}

function addProduct(arr) {
    let tbody = document.querySelector('tbody');
    let table = '';
    for (let i = 0; i < arr.length; i++) {
            table += `
            <tr id="style-tr" class="border-b bg-gray-400 border-gray-200">
            <td class="px-6 py-4">
                    ${i+1}
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 ${arr[i].title}"
            </th>
            <td class="px-6 py-4">
                ${arr[i].price}
            </td>
            <td class="px-6 py-4">
                ${arr[i].taxes}
            </td>
            <td class="px-6 py-4">
                ${arr[i].ads}
            </td>
            <td class="px-6 py-4">
                ${arr[i].discount}
            </td>
            <td class="px-6 py-4">
                ${arr[i].total}
            </td>
            <td class="px-6 py-4">
                ${arr[i].category}
            </td>
            <td class="flex items-center px-6 py-4 space-x-3 justify-between">
            <button id="edit-btn" onclick=updateProduct(${i}) class="font-medium text-blue-600 dark:text-blue-500 hover:underline">تعديل</button>
            <button id="delete-btn" onclick=deleteProduct(${i}) class="font-medium text-red-600 hover:underline dark:text-red-500">حذف</button>
            </td>
            </tr>
        `
}
    tbody.innerHTML = table;

    if (arrProduct.length > 1) {
        deleteAll.onclick = deleteAllProducts
        deleteAll.classList.add('show');
        document.getElementById('all').innerHTML = arrProduct.length
    }else {
        deleteAll.classList.remove('show');
    }

}

addProduct(arrProduct);

function deleteProduct(i) {
    arrProduct.splice(i, 1);
    localStorage.product = JSON.stringify(arrProduct);
    addProduct(arrProduct);
}

function deleteAllProducts() {
        localStorage.removeItem('product');
        arrProduct.splice(0);
        addProduct(arrProduct);
}

function updateProduct(i) {
    text.value = arrProduct[i].title;
    price.value = arrProduct[i].price;
    taxes.value = arrProduct[i].taxes;
    ads.value = arrProduct[i].ads;
    discount.value = arrProduct[i].discount;
    category.value = arrProduct[i].category;
    getTotal();
    scroll({
        behavior: 'smooth',
        top: 0,
    })
    count.style.display = 'none';
    create.innerHTML = 'تعديل'
    mood = 'update'
    tmp = i;
    text.focus();
}

let searchMood = 'title';

function getSearch(id) {
    if (id == 'search-1') {
        searchMood = 'title';
        search.placeholder = 'البحث بواسطة العنوان'
    }else {
        searchMood = 'category';
        search.placeholder = 'البحث بواسطة التصنيف'
    }
    search.focus();
}

function search_2(value) {
    let table = '';
    let tbody = document.querySelector('tbody');
    if (searchMood == 'title') {
        for (let i = 0; i < arrProduct.length; i++) {
            if (arrProduct[i].title.includes(value.toLowerCase())) {
                table += `
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4">
                    ${i+1}
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     ${arrProduct[i].title}"
                </th>
                <td class="px-6 py-4">
                    ${arrProduct[i].price}
                </td>
                <td class="px-6 py-4">
                    ${arrProduct[i].taxes}
                </td>
                <td class="px-6 py-4">
                    ${arrProduct[i].ads}
                </td>
                <td class="px-6 py-4">
                    ${arrProduct[i].discount}
                </td>
                <td class="px-6 py-4">
                    ${arrProduct[i].total}
                </td>
                <td class="px-6 py-4">
                    ${arrProduct[i].category}
                </td>
                <td class="flex items-center px-6 py-4 space-x-3 justify-between">
                <button id="edit-btn" onclick=updateProduct(${i}) class="font-medium text-blue-600 dark:text-blue-500 hover:underline">تعديل</button>
                <button id="delete-btn" onclick=deleteProduct(${i}) class="font-medium text-red-600 hover:underline dark:text-red-500">حذف</button>
                </td>
                </tr>
            `
            }
        }
    }else {
        for (let i = 0; i < arrProduct.length; i++) {
            
            if (arrProduct[i].category.includes(value.toLowerCase())) {
                table += `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="px-6 py-4">
            ${i+1}
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${arrProduct[i].title}"
            </th>
            <td class="px-6 py-4">
            ${arrProduct[i].price}
            </td>
            <td class="px-6 py-4">
            ${arrProduct[i].taxes}
            </td>
            <td class="px-6 py-4">
                ${arrProduct[i].ads}
            </td>
            <td class="px-6 py-4">
                ${arrProduct[i].discount}
            </td>
            <td class="px-6 py-4">
            ${arrProduct[i].total}
            </td>
            <td class="px-6 py-4">
            ${arrProduct[i].category}
            </td>
            <td class="flex items-center px-6 py-4 space-x-3 justify-between">
            <button id="edit-btn" onclick=updateProduct(${i}) class="font-medium text-blue-600 dark:text-blue-500 hover:underline">تعديل</button>
            <button id="delete-btn" onclick=deleteProduct(${i}) class="font-medium text-red-600 hover:underline dark:text-red-500">حذف</button>
            </td>
            </tr>
            `
        }
    }
        
    }
    tbody.innerHTML = table;
}