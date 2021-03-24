(function(){

    var adList = [];

    function adItem(id, description, createdAt, link, vendor, photoLink, hashTags, discount, validUntil, rating, rewiews){
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.link = link;
        this.vendor = vendor;
        this.photoLink = photoLink;
        this.hashTags = hashTags;
        this.discount = discount;
        this.validUntil = validUntil;
        this.rating = rating;
        this.rewiews = rewiews;
    }

    //фильтр сравнивает содержит ли item те же поля что и object, фактически я отбираю посты по всем свойствам переданного объекта
    //единственный случай когда не работает так как хотелось бы - getAds(filtParam), распознает 1 аргумент как skip...
    function filterConfig(object, item){
        if(object == undefined){
            return true;
        }else{
            for(let property in object){
                if(object[property] != item[property]){
                    return false;
                }
            }
            return true;
        }
    }

    function getAds(skip = 0, top = 10, object = undefined){
        return adList.filter(item => filterConfig(object, item)).slice(skip, (skip + top)).sort( (a, b) => a.createdAt - b.createdAt);
    }

    function getAd(id){
        for(let item of adList){
            if(item.id == id){
                return item;            
            }
        }
        return null;
    }

    function validateAd(object){
        for(let property in object){
            switch(property){
                case 'id':
                    if(object[property] == undefined || object[property] == '' || (object[property] instanceof String == false) ){
                        return false;
                    }
                    for(let token of adList){
                        if(token.id == object[property]){
                            return false;
                        }
                    }
                break;
                
                case 'description':
                    if(object[property] == undefined || object[property] >= 200 || object[property] == '' || (object[property] instanceof String == false) ){
                        return false;
                    }
                break;

                case 'createdAt':
                    if(object[property] == undefined || object[property] == '' || isNaN(object[property]) == true || (object[property] instanceof String == true) ){
                        return false;
                    }
                break;

                case 'validUntil':
                    if(object[property] == undefined || object[property] == '' || isNaN(object[property]) == true || (object[property] instanceof String == true) ){
                        return false;
                    }
                break;
                //валидность на существование сайта/регулярное выраж ?
                case 'link':
                    if(object[property] == undefined || object[property] == '' || (object[property] instanceof String == false) ){
                        return false;
                    }
                break;
                
                case 'vendor':
                    if(object[property] == undefined || object[property] == '' || (object[property] instanceof String == false)){
                        return false;
                    }
                break;
                
                case 'photoLink':
                    if(object[property] != undefined && (object[property] instanceof String == false) ){
                        return false;
                    }
                break;
                
                case 'hashTags':
                    if(object[property] == undefined || Array.isArray(object[property]) == false || object[property].length == 0){
                        return false;
                    }
                    for(let token of object[property]){
                        if(token == ''){
                            return false;
                        }
                    }
                break;

                case 'discount':
                    if(object[property] == undefined || object[property] == '' || (object[property] instanceof String == false) ){
                        return false;
                    }
                break;

                case 'rating':
                    if(object[property] != undefined && (object[property] instanceof Number == false) ){
                        return false;
                    }
                break;
                
                case 'reviews':
                    if( object[property] != undefined && Array.isArray(object[property]) == false){
                        return false;
                    }
                break;
            }
        }
        return true;
    }
    
    function addAd(object){
        if(validateAd(object)){
            adList.push(object);
            return true;
        }else{
            return false;
        }
    }

    function editAd(id, object){
       let item;
       let index;
       for(let i = 0; i < adList.length; i++){
           if(adList[i].id == id){
               item = adList[i];
               index = i;
               break;
           }
       } 
       let copy_item = item;
       for(let property in object){
           if(property != 'id' && property != 'vendor' && property != 'createdAt' && object[property] != undefined){
               item[property] = object[property];
           }
       }
       adList.splice(index, 1);
       if(validateAd(item)){
           adList.splice(index, 0, item);
           return true;
       }else{
            adList.splice(index, 0, copy_item);
            return false;
       }
    }

    function removeAd(id){
        if(getAd(id) !== null){
            for(let i = 0; i < adList.length; i++){
                if(adList[i].id == id){
                    adList.splice(i, 1);
                    return true;
                }
            }
        }else{
            return false;
        }
    }

    
    var  item1 =  new adItem(
        new String('1'),
        new String('description1'),
        new Date('2021-08-19T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('DECH'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag1', 'hashtag2'),
        new String('10%'),
        new Date('2021-08-13T12:00:00'),
        new Number(5),
        new Array('comment-1-1','comment-1-2')
    );
    var  item2 =  new adItem(
        new String('2'),
        new String('description2'),
        new Date('2021-08-1T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('DECH'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-2-1', 'hashtag-2-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
    );
    var  item3 =  new adItem(
        new String('3'),
        new String('description2'),
        new Date('2021-07-17T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('vendor3'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-3-1', 'hashtag-3-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        new Number(5),
        undefined
    );
    var  item4 =  new adItem(
        new String('4'),
        new String('description4'),
        new Date('2021-05-10T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('vendor4'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-4-1', 'hashtag-4-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item5 =  new adItem(
        new String('5'),
        new String('description5'),
        new Date('2021-02-13T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('vendor5'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-5-1', 'hashtag-5-2'),
        new String('999%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item6 =  new adItem(
        new String('6'),
        new String('description6'),
        new Date('2021-09-15T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('vendor4'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-6-1', 'hashtag-6-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item7 =  new adItem(
        new String('7'),
        new String('description7'),
        new Date('2021-09-23T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('vendor7'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-7-1', 'hashtag-7-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );

    var  item8 =  new adItem(
        new String('8'),
        new String('description8'),
        new Date('2021-02-11T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('DECH'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-8-1', 'hashtag-8-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item9 =  new adItem(
        new String('9'),
        new String('description9'),
        new Date('2021-01-17T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('DECH'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-9-1', 'hashtag-9-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item10 =  new adItem(
        new String('10'),
        new String('description10'),
        new Date('2021-02-28T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('vendor10'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-10-1', 'hashtag-10-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item11 =  new adItem(
        new String('11'),
        new String('description11'),
        new Date('2021-04-27T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('vendor11'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-11-1', 'hashtag-11-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item12 =  new adItem(
        new String('12'),
        new String('description12'),
        new Date('2021-09-28T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('vendor12'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-12-1', 'hashtag-12-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item13 =  new adItem(
        new String('13'),
        new String('description13'),
        new Date('2021-10-15T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('vendor13'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-13-1', 'hashtag-13-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item14 =  new adItem(
        new String('14'),
        new String('description14'),
        new Date('2021-01-02T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('vendor14'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-14-1', 'hashtag-14-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item15 =  new adItem(
        new String('15'),
        new String('description15'),
        new Date('2021-01-09T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('vendor15'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-15-1', 'hashtag-15-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item16 =  new adItem(
        new String('16'),
        new String('description16'),
        new Date('2021-02-07T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('vendor16'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-16-1', 'hashtag-16-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item17 =  new adItem(
        new String('17'),
        new String('description17'),
        new Date('2021-05-30T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('DECH'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-17-1', 'hashtag-17-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item18 =  new adItem(
        new String('18'),
        new String('description18'),
        new Date('2021-05-21T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('DECH'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-18-1', 'hashtag-18-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item19 =  new adItem(
        new String('19'),
        new String('description19'),
        new Date('2021-04-14T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('DECH'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-19-1', 'hashtag-19-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );    
    var  item20 =  new adItem(
        new String('20'),
        new String('description20'),
        new Date('2021-04-12T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('DECH'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-20-1', 'hashtag-20-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    adList.push(item1,item2,item3,item4,item5,item6,item7,item8,item9, item10,item11, item12,item13,item14,item15,item16, item17, item18,item19,item20);

    
    var  item21 =  new adItem(
        //нету id
        undefined,
        new String('description21'),
        //нету 
        undefined,
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        //нету vendor
        undefined,
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-21-1', 'hashtag-21-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );

    var  item22 =  new adItem(
        new String('22'),
        new String('description22'),
        new Date('2021-03-17T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('vendor22'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        //пустой массив хэштэгов
        new Array(),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item23 =  new adItem(
        new String('23'),
        new String('description23'),
        new Date('2021-03-17T12:00:00'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new String('vendor23'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-23-1', 'hashtag-23-2'),
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    var  item24 =  new adItem(
        new String('24'),
        new String('description14'),
        new Date('2021-03-17T12:00:00'),
        new String(''),
        new String('vendor24'),
        new String(''),
        undefined,
        new String('10%'),
        new Date('2021-03-15T12:00:00'),
        undefined,
        undefined
    );
    
    // получение объявления 
    console.log(getAd('5')); // true
    console.log(getAd('21')) // null
    console.log(getAd('')) // null
    // валидность поста 
    console.log(validateAd(item21)); // false
    console.log(validateAd(item22)); // false
    console.log(validateAd(item23)); // true
    // редактирование поста ---
    console.log(editAd('5', item21)) // true
    console.log(editAd('6', item24)); // 24 пост ссылка на вендора отсутствует, false
    // добавление поста 
    console.log(addAd(item23)); // true
    console.log(addAd(item21)); // false
    // удаление поста 
    console.log(removeAd('1')); // true
    console.log(getAd('1')); // null - уже удалили
    console.log(removeAd('50')); // false - нету элемента чтоб удалить
    // сортировка с фильтром 
    getAds(0, 10, {id: '8'})
    console.log(getAds(0, 9,{vendor : 'DECH'})); // выведет сколько есть даже если не хватает
    console.log(getAds(2, 4, {vendor : 'DECH'})); // 4 штуки с [2, 6)
    console.log(getAds(0, 0,{vendor : 'DECH'})); // 0 постов
    console.log(getAds(0, 2)); // 2 поста [0,2)
}());