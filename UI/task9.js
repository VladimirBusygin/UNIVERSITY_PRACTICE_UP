(function(){
    class AdCollection{
        #adList;

        constructor(){
            this.#adList = new Array();
        }

        validate(object){
            for(let property in object){
                switch(property){
                    case 'id':
                        if(object[property] == undefined || object[property] == '' || (object[property] instanceof String == false) ){
                            return false;
                        }
                        if(this.#adList != undefined){
                            for(let token of this.#adList){
                                if(token.id == object[property]){
                                    return false;
                                }
                            }
                        }
                    break;

                    case 'adName':
                        if(object[property] == undefined || object[property] >= 200 || object[property] == '' || (object[property] instanceof String == false) ){
                            return false;
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

                    //price
    
                    case 'discount':
                        if(object[property] != undefined && (object[property] instanceof Number == false) ){
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

        add(object){
            if(this.validate(object)){
                this.#adList.push(object);
                return true;
            }else{
                return false;
            }
        }

        addAll(object){
            let result = [];
            for(let item of object){
                if(this.validate(item)){
                    this.add(item);
                }else{
                    result.push(item);
                }
            }
            return result;
        }
        
        get(id){
            for(let item of this.#adList){
                if(item.id == id){
                    return item;            
                }
            }
            return null;
        }

        edit(id, object){
            let item;
            let index = -1;
            for(let i = 0; i < this.#adList.length; i++){
                if(this.#adList[i].id == id){
                    item = this.#adList[i];
                    index = i;
                    break;
                }
            }
            if(index == -1){
                return false;
            } 
            let copy_item = item;
            for(let property in object){
                if(property != 'id' && property != 'vendor' && property != 'createdAt' && object[property] != undefined){
                    item[property] = object[property];
                }
            }
            this.#adList.splice(index, 1);
            if(this.validate(item)){
                this.#adList.splice(index, 0, item);
                return true;
            }else{
                this.#adList.splice(index, 0, copy_item);
                return false;
            }
        }

        remove(id){
            if(this.get(id) !== null){
                for(let i = 0; i < this.#adList.length; i++){
                    if(this.#adList[i].id == id){
                        this.#adList.splice(i, 1);
                        return true;
                    }
                }
            }else{
                return false;
            }
        }

        #filterConfiguration(object, item){
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

        getPage(skip = 0, top = 10, object = undefined){
            return this.#adList.filter(item => this.#filterConfiguration(object, item)).slice(skip, (skip + top)).sort( (a, b) => a.createdAt - b.createdAt);
        }

        clear(){
            this.#adList.splice(0, this.#adList.length);
        }
    }

    class AdItem{
        id;
        adName;
        vendor;
        link;
        hashTags;
        description;
        price;
        discount;
        createdAt;
        validUntil;
        photoLinks;
        rewiews;
        rating;

        constructor(id = undefined, adName = undefined, vendor = undefined,  link = undefined, hashTags = undefined, 
            description = undefined, price = undefined, discount = undefined, createdAt = undefined, 
            validUntil = undefined, photoLinks = undefined,rewiews = undefined, rating = undefined){
            this.id = id;
            this.adName = adName;
            this.vendor = vendor;
            this.link = link;
            this.hashTags = hashTags;
            this.description = description;
            this.price = price;
            this.discount = discount;
            this.createdAt = createdAt;
            this.validUntil = validUntil;
            this.photoLinks = photoLinks;
            this.rewiews = rewiews;
            this.rating = rating;
        }
    }

    class View{
        collection;
        userID // admin user client (vendor - next time)

        constructor(userID){
            this.collection = new AdCollection();
            this.userID = userID;
            if(userID == 'user' || userID == 'client'){
               document.getElementById('add_post_button').style.visibility = 'hidden'
            }
            if(userID != 'user'){
                document.getElementById('sign_in_button').disabled = 'disabled'
                document.getElementById('sign_in_button').innerText = userID
            }else{
                document.getElementById('exit_button').style.visibility = 'hidden'
            }
        }

        drawAd(object){
            if(this.collection.add(object)){
                var post = document.createElement('div')
                post.className = 'post'
                for(let property in object){
                    switch(property){
                        case 'id':
                            post.id = object[property]
                        break;

                        case 'photoLinks':
                            let photoArea = document.createElement('div')
                            photoArea.className = 'post_photo_area'
                            for(let token of object[property]){
                                let adPhoto = document.createElement('img')
                                adPhoto.className = 'adPhoto'
                                adPhoto.src = token
                                photoArea.appendChild(adPhoto)
                            }
                            post.appendChild(photoArea)
                        break;

                        case 'hashTags':
                            let hashTags = document.createElement('div')
                            hashTags.className = property
                            let line = ''
                            for(let token of object[property]){
                                line += '#' + token
                            }
                            hashTags.innerText = line
                            post.appendChild(hashTags)
                        break;
                        
                        case 'link':
                            let link = document.createElement('a')
                            link.className = property
                            link.href = object[property]
                            link.innerText = 'SITE'
                            post.appendChild(link)
                        break;
                        
                        //rewiews case 
                        case 'rewiews':
                        break;

                        default:
                            let node = document.createElement('div')
                            node.className = property
                            node.innerText = '----' /// изменить дату
                            post.appendChild(node)
                        break;
                    }
                }

                let button_commet = document.createElement('button')
                button_commet.className = 'addRewiew' /// нужно чет придумать куда их всунуть
                button_commet.innerText = 'Add comment'
                if(this.userID === 'user'){
                    button_commet.disabled = 'disabled'
                }
                post.appendChild(button_commet)

                let button_rate = document.createElement('button')
                button_rate.className = 'addRating'
                button_rate.innerText = 'Add rate'
                if(this.userID === 'user'){
                    button_rate.disabled = 'disabled'
                }
                post.appendChild(button_rate)

                let button_editAd= document.createElement('button')
                button_editAd.className = 'editAd'
                button_editAd.innerText = 'edit'
                if(this.userID  === 'user'){
                    button_editAd.disabled = 'disabled'
                }
                post.appendChild(button_editAd)

                document.getElementsByClassName('scroll_area_popular')[0].appendChild(post)
            }
        }
        
        removeAd(id){
            if(this.collection.remove(id)){             
                document.getElementsByClassName('scroll_area_popular')[0].removeChild(document.getElementById(id))
            }
        }
        
        editAd(id, object){
            if(this.collection.edit(id, object)){
                let editNode = this.collection.get(id)
                this.removeAd(id)
                this.drawAd(editNode)
            }
        }
        
    }


    var  item1 =  new AdItem(
        new String('1'),
        new String('vendor1'),
        new String('vendor'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-3-1', 'hashtag-3-2'),
        new String('des'),
        new Number(2),
        new Number(10),
        new Date('2021-03-15T12:00:00'),
        new Date('2021-07-17T12:00:00'),
        new Array('https://www.royal-canin.ru/upload/iblock/c41/ekst.jpg', 'https://кутята.рф/media/breed/Dogs_White_Chihuahua.jpg', 'https://www.royal-canin.ru/upload/iblock/c41/ekst.jpg','https://www.royal-canin.ru/upload/iblock/c41/ekst.jpg'),
        undefined,
        new Number(5)
    );
    var  item2 =  new AdItem(
        new String('2'),
        new String('vendor2'),
        new String('losharas'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-3-4', 'hashtag-3-4'),
        new String('des'),
        new Number(2),
        new Number(10),
        new Date('2021-03-15T12:00:00'),
        new Date('2021-07-17T12:00:00'),
        new Array('https://www.royal-canin.ru/upload/iblock/c41/ekst.jpg', 'https://кутята.рф/media/breed/Dogs_White_Chihuahua.jpg', 'https://www.royal-canin.ru/upload/iblock/c41/ekst.jpg','https://www.royal-canin.ru/upload/iblock/c41/ekst.jpg'),
        undefined,
        new Number(5)
    );
    var  item3 =  new AdItem(
        new String('3'),
        new String('edited1'),
        new String('vendor3'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-3-1', 'hashtag-3-2'),
        new String('des'),
        new Number(2),
        new Number(10),
        new Date('2021-03-15T12:00:00'),
        new Date('2021-07-17T12:00:00'),
        new Array('https://www.royal-canin.ru/upload/iblock/c41/ekst.jpg', 'https://кутята.рф/media/breed/Dogs_White_Chihuahua.jpg', 'https://www.royal-canin.ru/upload/iblock/c41/ekst.jpg','https://www.royal-canin.ru/upload/iblock/c41/ekst.jpg'),
        undefined,
        new Number(5)
    );
    var  item4 =  new AdItem(
        new String('4'),
        new String('edited2'),
        new String('vendor4'),
        new String('https://deal.by/Omyvajka-zimnyaya.html'),
        new Array('hashtag-3-1', 'hashtag-3-2'),
        new String('des'),
        new Number(2),
        new Number(10),
        new Date('2021-03-15T12:00:00'),
        new Date('2021-07-17T12:00:00'),
        new Array('https://www.royal-canin.ru/upload/iblock/c41/ekst.jpg', 'https://кутята.рф/media/breed/Dogs_White_Chihuahua.jpg', 'https://www.royal-canin.ru/upload/iblock/c41/ekst.jpg','https://www.royal-canin.ru/upload/iblock/c41/ekst.jpg'),
        undefined,
        new Number(5)
    );
    //итого
    //переделать дату отображение
    //придуамть че с комментами делать
    //немного верстку переделать
    //посмотреть другие теги под пост
    
    example = new View('admin');
    example.drawAd(item1)
    example.drawAd(item2)
    //example.removeAd(2)
    //example.editAd(1,item3)
    //example.editAd(2,item4)
   
}());