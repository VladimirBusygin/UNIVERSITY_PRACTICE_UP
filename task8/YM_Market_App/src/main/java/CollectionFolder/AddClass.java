package CollectionFolder;

import org.json.JSONArray;
import org.json.JSONObject;
import java.util.*;

public class AddClass {
    private int id;
    private String addName;
    private String photoLink;
    private String description;
    private String link;
    private String vendor;
    private List<String> hashtags;
    private int discountValue;
    private Calendar createdAt;
    private Calendar validUntil;
    private int rating;
    private List<String> reviews;
    
    public AddClass(int id){
        this.id = id;
        photoLink = "";
        addName = "";
        description = "";
        link = "";
        vendor = "";
        hashtags = new ArrayList<>();
        discountValue = 0;
        createdAt = new GregorianCalendar();
        validUntil = new GregorianCalendar();
        rating = 0;
        reviews = new ArrayList<>();
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public void setAddName(String addName){
        this.addName = addName;
    }
    
    public void setDescription(String description){
        this.description = description;
    }
    
    public void setLink(String link){
        this.link = link;
    }
    
    public void setVendor(String vendor){
        this.vendor = vendor;
    }
    
    public void addHashtag(String hashtag){
        this.hashtags.add(hashtag);
    }
    
    public void setDiscountValue(int discountValue){
        this.discountValue = discountValue;
    }

    public void setCreatedAt(int year, int month, int day){
        this.createdAt = new GregorianCalendar(year, month, day);
    }
    
    public void setValidUntil(int year, int month, int day){
        this.validUntil = new GregorianCalendar(year, month, day);
    }

    public void setRating(int rating){
        //пока что так, пока не будет отдельного класса отзывов польз, чтобы посчитать ср арифм
        this.rating = rating;
    }

    public void addReview(String review){
        //аналогично методу выше
        this.reviews.add(review);
    }


    public String getPhotoLink(){
        return photoLink;
    }

    public String getAddName(){return addName;}

    public String getDescription(){return description;}

    public String getLink(){return link;}

    public String getVendor(){return vendor;}

    public List<String> getHashtags(){return hashtags;}

    public int getDiscountValue(){return discountValue;}

    public Calendar getCreatedAt(){return createdAt;}

    public Calendar getValidUntil(){return validUntil;}

    public int getRating(){return rating;}

    public List<String> getReview(){return reviews;}

    public int getId(){return id;}

    @Override
    public String toString(){
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray;
        jsonObject.put("id", id);
        jsonObject.put("addName", addName);
        jsonObject.put("photoLink", photoLink);
        jsonObject.put("description", description);
        jsonObject.put("link", link);
        jsonObject.put("vendor", vendor);
        jsonArray = new JSONArray();
        for(String token : hashtags){
            jsonArray.put(token);
        }
        jsonObject.put("hashtags", jsonArray);
        jsonObject.put("discountValue", discountValue);
        jsonArray = new JSONArray();
        jsonArray.put(createdAt.get(Calendar.YEAR));
        jsonArray.put(createdAt.get(Calendar.MONTH));
        jsonArray.put(createdAt.get(Calendar.DAY_OF_MONTH));
        jsonObject.put("createdAt", jsonArray);
        jsonArray = new JSONArray();
        jsonArray.put(validUntil.get(Calendar.YEAR));
        jsonArray.put(validUntil.get(Calendar.MONTH));
        jsonArray.put(validUntil.get(Calendar.DAY_OF_MONTH));
        jsonObject.put("validUntil", jsonArray);
        jsonObject.put("rating", rating);
        jsonArray = new JSONArray();
        for(String token : reviews){
            jsonArray.put(token);
        }
        jsonObject.put("reviews", jsonArray);
        return jsonObject.toString();
    }
}
