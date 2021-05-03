package CollectionFolder;
import CollectionFolder.AddClass;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class AddCollection {
    private static List<AddClass> collection;

    public AddCollection(){
        if(collection == null) {
            collection = new ArrayList<>();
        }
    }

    private static AddClass toAddClass(String object){
        JSONObject jsonObject = new JSONObject(object);
        JSONArray jsonArray;
        AddClass element = new AddClass(collection.size() + 1);
        if(!jsonObject.isNull("addName")) {
            element.setAddName(jsonObject.getString("addName"));
        }
        if(!jsonObject.isNull("photoLink")) {
            element.setPhotoLink(jsonObject.getString("photoLink"));
        }
        if(!jsonObject.isNull("description")) {
            element.setDescription(jsonObject.getString("description"));
        }
        if(!jsonObject.isNull("link")) {
            element.setLink(jsonObject.getString("link"));
        }
        if(!jsonObject.isNull("vendor")) {
            element.setVendor(jsonObject.getString("vendor"));
        }
        if(!jsonObject.isNull("hashtags")) {
            jsonArray = jsonObject.getJSONArray("hashtags");
            for (int i = 0; i < jsonArray.length(); i++) {
                element.addHashtag(jsonArray.getString(i));
            }
        }
        if(!jsonObject.isNull("discountValue")) {
            element.setDiscountValue(jsonObject.getInt("discountValue"));
        }
        if(!jsonObject.isNull("createdAt") && jsonObject.getJSONArray("createdAt").length() == 3) {
            jsonArray = jsonObject.getJSONArray("createdAt");
            element.setCreatedAt(jsonArray.getInt(0), jsonArray.getInt(1), jsonArray.getInt(2));
        }
        if(!jsonObject.isNull("validUntil") && jsonObject.getJSONArray("validUntil").length() == 3) {
            jsonArray = jsonObject.getJSONArray("validUntil");
            element.setValidUntil(jsonArray.getInt(0), jsonArray.getInt(1), jsonArray.getInt(2));
        }
        if(!jsonObject.isNull("rating")) {
            element.setRating(jsonObject.getInt("rating"));
        }
        if(!jsonObject.isNull("reviews")) {
            jsonArray = jsonObject.getJSONArray("reviews");
            for (int i = 0; i < jsonArray.length(); i++) {
                element.addReview(jsonArray.getString(i));
            }
        }
       // collection.add(element);
        return element;
    }

    public static void pushAdd(String object){
        collection.add(toAddClass(object));
    }

    public static String popAdd(String id){
        try {
            int requiredID = Integer.parseInt(id);
            for (AddClass token : collection) {
                if (token.getId() == requiredID) {
                    return token.toString();
                }
            }
        }catch (NumberFormatException exception){}
        return "{}";
    }

    public static void delete(String id){
        int requiredID = Integer.parseInt(id);
        for(int i = 0; i < collection.size(); i++){
            if(collection.get(i).getId() == requiredID){
                collection.remove(i);
                return;
            }
        }
    }

    public static List<AddClass> search(){
        return collection;
    }

}
